# Playwright Automation Architecture: Deep Dive

## System Design & Architecture Overview

### High-Level System Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        Test Execution Layer                      │
│  (55 .spec.ts files across 8 modules - 202 individual tests)    │
│                                                                   │
│  ├─ PTT-User/           (11 files, 52 tests)                     │
│  ├─ External-User/      (3 files, 13 tests)                      │
│  ├─ User_Set/           (4 files, 8 tests)                       │
│  ├─ Interop_User/       (1 file, 10 tests)                       │
│  ├─ OSM/                (2 files, 20 tests)                      │
│  ├─ Group_Profile/      (11 files, 57 tests)                     │
│  ├─ Talkgroup/          (21 files, 41 tests)                     │
│  └─ User_Profile/       (1 file, 1 test)                         │
└───────────┬──────────────────────────────────────────┬───────────┘
            │                                          │
            ▼                                          ▼
┌─────────────────────────────┐      ┌─────────────────────────────┐
│   Page Object Model Layer   │      │  Helper Functions Layer     │
│   (pages/CATPage.ts)        │      │  (helpers/common.ts)        │
│                              │      │                             │
│  ✓ 230+ Locator methods     │      │  ✓ wcsrLogin()              │
│  ✓ Full TypeScript typing   │      │  ✓ verifyExternalSearch()   │
│  ✓ Single source of truth   │      │  ✓ launchAndGetPageObject() │
│  ✓ Clear separation         │      │  ✓ Reusable async functions │
│  ✓ 5 method categories      │      │                             │
└────────────┬────────────────┘      └──────────────┬──────────────┘
             │                                      │
             └──────────┬─────────────────────────┬─┘
                        │                         │
                        ▼                         ▼
            ┌─────────────────────────┐
            │  Playwright Test API    │
            │                         │
            │  ✓ Page interactions    │
            │  ✓ Locator selections   │
            │  ✓ Assertions/expect()  │
            │  ✓ Wait strategies      │
            │  ✓ Multi-browser        │
            └────────┬────────────────┘
                     │
                     ▼
            ┌─────────────────────────┐
            │   Web Application       │
            │   (OnePortal CAT)       │
            │                         │
            │  ✓ WCSR Login           │
            │  ✓ User Management      │
            │  ✓ Talkgroup Management │
            │  ✓ Group Profiles       │
            │  ✓ OSM Configuration    │
            └─────────────────────────┘
```

---

## Multi-Layer Architecture

### Layer 1: Test Layer

**Location**: `tests/CAT/[Module]/[test_name].spec.ts`

**Responsibility**: Define test scenarios and assertions

**Characteristics**:
- 202 individual test cases
- Organized by module
- Test-focused logic only
- No page selectors embedded

**Example**:
```typescript
test('TG-002 Create Standard Talkgroup', async ({ page }) => {
  await wcsrLogin(page);                    // Use helper
  pageObj = new CATPage(page);               // Create page object
  
  await pageObj.visitTalkGroup();            // Navigate
  await pageObj.createStandardTalkGr('TalkGroup_Name');  // Action
  await pageObj.validateDisplayObj('TalkGroup_Name');    // Assert
});
```

**What it Doesn't Do**:
- ❌ Define CSS selectors
- ❌ Handle low-level page interactions
- ❌ Manage browser context
- ❌ Deal with element delays/waits

---

### Layer 2: Page Object Model (POM)

**Location**: `pages/CATPage.ts`

**Responsibility**: Encapsulate UI element interactions

**Architecture**:
```
CATPage Class
│
├─ Private Member
│  └─ page: Page  (Playwright page object)
│
├─ 5 Method Categories
│  ├─ Navigation Methods
│  │  ├─ visitTalkGroup()
│  │  ├─ visitPTTUserEditPage()
│  │  ├─ visitUserSet()
│  │  └─ [20+ navigation methods]
│  │
│  ├─ Locator Methods
│  │  ├─ getSearchBox(): Locator
│  │  ├─ getSaveButton(): Locator
│  │  ├─ getCreateTalkgrpBtn(): Locator
│  │  └─ [200+ locator methods]
│  │
│  ├─ Interaction Methods
│  │  ├─ createStandardTalkGr()
│  │  ├─ createTalkGroupAndAddUser()
│  │  ├─ deleteTalkGroup()
│  │  └─ [50+ interaction methods]
│  │
│  ├─ Validation Methods
│  │  ├─ validateDisplayObj()
│  │  ├─ validateCount()
│  │  ├─ validateDisplayedList()
│  │  └─ [20+ validation methods]
│  │
│  └─ Utility Methods
│     ├─ clickEvent()
│     ├─ checkVisibility()
│     ├─ getPage()
│     └─ [10+ utility methods]
```

**Key Principle**: Single Responsibility

Each method does ONE thing:
- Locator methods → SELECT elements
- Interaction methods → INTERACT with elements
- Validation methods → ASSERT expected state
- Navigation methods → CHANGE pages/sections
- Utility methods → SUPPORT operations

---

### Layer 3: Helper Functions

**Location**: `helpers/common.ts`

**Responsibility**: Shared, reusable async functions

**Functions**:
```typescript
// Authentication
export async function wcsrLogin(page: Page): Promise<void>
// ├─ Navigate to login URL
// ├─ Fill credentials
// └─ Wait for post-login navigation

// External User Validation
export async function verifyExternalUserSearch(page: Page, pageObj: CATPage, name: string)
// ├─ Clear search box
// ├─ Fill search term
// └─ Verify result visibility

// Page Object Creation
export async function launchAndGetNewPageObject(
  context: BrowserContext, 
  pageObj: CATPage, 
  corporateID: string
): Promise<CATPage>
// ├─ Click Corporate Management
// ├─ Enter Corporate ID
// ├─ Listen for new tab
// └─ Return new CATPage instance
```

**Usage Pattern**:
```typescript
// In test file
await wcsrLogin(page);  // Helper function
pageObj = new CATPage(page);  // Page object
await pageObj.visitTalkGroup();  // POM method
```

---

## Method Categorization System

### 1. Navigation Methods (30+)

**Purpose**: Navigate to different pages/sections

**Characteristics**:
- Async functions
- Return `Promise<void>`
- Wait for load state
- Change URL or section

**Examples**:
```typescript
async visitTalkGroup() {
  const btn = this.page.locator('text=Talk Group');
  await btn.click();
  await this.page.waitForLoadState('networkidle');
}

async visitGroupProfile() {
  const menu = this.page.locator('[id*="GroupProfile"]');
  await menu.click();
  await this.page.waitForTimeout(1000);
}

async visitUserSet() {
  const link = this.page.locator('a:has-text("User Set")');
  await link.click();
  await this.page.waitForLoadState('load');
}
```

**When to Use**:
- Need to change pages
- Click navigation buttons
- Enter new sections

---

### 2. Locator Methods (200+)

**Purpose**: Return elements (Locator) for selection

**Characteristics**:
- Synchronous (not async)
- Return `Locator` type
- No parameter required usually
- No action performed

**Examples**:
```typescript
// Simple selectors
getSearchBox(): Locator {
  return this.page.locator('.search_input.msi-searchbox');
}

getSaveButton(): Locator {
  return this.page.locator('button:has-text("Save")');
}

getCreateTalkgrpBtn(): Locator {
  return this.page.locator('button[id*="create"]');
}

// Complex selectors with waiting
getSupervisorsTab(): Locator {
  return this.page.locator(
    '.mat-tab-label:has-text("Supervisor"), [role="tab"]:has-text("Supervisor")'
  ).first();
}

// Method that reads parameter
getEditBtn(): Locator {
  return this.page.locator('button:has-text("Edit"), button[id*="edit"]').first();
}
```

**Key Point**: These methods are called BY other methods, not directly by tests (usually):

```typescript
// In Interaction Methods
async createTalkGroup(name: string) {
  const createBtn = this.getCreateTalkgrpBtn();  // Get locator
  await createBtn.click();  // Use it
}
```

---

### 3. Interaction Methods (50+)

**Purpose**: Perform user actions on elements

**Characteristics**:
- Async functions
- Return `Promise<void>`
- Take parameters for input
- May chain multiple actions

**Examples**:
```typescript
// Simple action
async clickEvent(locator: Locator) {
  await locator.click();
  await this.page.waitForTimeout(300);
}

// Form filling
async createStandardTalkGr(
  talkgroupName: string = 'Standard_TalkGroup',
  param2: boolean = false,
  param3: boolean = false,
  assignedUser: string = ''
) {
  const createBtn = this.getCreateTalkgrpBtn();
  if (await createBtn.isVisible().catch(() => false)) {
    await createBtn.click();
    await this.page.waitForTimeout(500);
  }

  const nameField = this.page.locator('input[id*="name"]');
  await nameField.fill(talkgroupName);
  
  if (param2) {
    const interopCheckbox = this.page.locator('input[id*="interop"]');
    await interopCheckbox.check();
  }

  await this.getSaveButton().click();
  await this.page.waitForLoadState('networkidle');
}

// Complex workflow
async createTalkGroupAndAddUser(
  talkgroupType: string = 'Standard',
  talkgroupName: string = 'TalkGroup',
  assignedUser: string = ''
) {
  // Step 1: Open creation dialog
  const createBtn = this.getCreateTalkgrpBtn();
  await createBtn.click();
  
  // Step 2: Select type
  const typeSelect = this.page.locator('select');
  await typeSelect.selectOption(talkgroupType);
  
  // Step 3: Fill name
  const nameField = this.page.locator('input[name="talkgroupName"]');
  await nameField.fill(talkgroupName);
  
  // Step 4: Assign user if provided
  if (assignedUser) {
    const userField = this.page.locator('input[id*="user"]');
    await userField.fill(assignedUser);
  }
  
  // Step 5: Save
  await this.getSaveButton().click();
  await this.page.waitForLoadState('networkidle');
}
```

**Usage Pattern**:
```typescript
// In test
await pageObj.createStandardTalkGr('My TalkGroup', false, true, 'user@email.com');
```

---

### 4. Validation Methods (20+)

**Purpose**: Assert that expected UI state exists

**Characteristics**:
- Async functions
- Return `Promise<void>`
- Use `expect()` assertions
- Check visibility/content

**Examples**:
```typescript
// Simple validation
async validateDisplayObj(itemName: string) {
  const item = this.page.locator(`text=${itemName}`);
  await expect(item).toBeVisible({ timeout: 10_000 });
}

// Count validation
async validateCount() {
  const countElement = this.page.locator('[id*="count"]');
  const count = await countElement.textContent();
  expect(parseInt(count || '0')).toBeGreaterThan(0);
}

// Complex validation
async validateDisplayedList(element: Locator) {
  await expect(element).toBeVisible();
  const text = await element.textContent();
  expect(text).toBeTruthy();
}

// Multiple assertions
async verifyTalkgrpZonePosPriorityForRadioUser(zone: string, position: string) {
  const zoneValue = this.page.locator(`[data-zone="${zone}"]`);
  const posValue = this.page.locator(`[data-position="${position}"]`);
  
  await expect(zoneValue).toBeVisible();
  await expect(posValue).toBeVisible();
}
```

**Usage Pattern**:
```typescript
// In test
await pageObj.validateDisplayObj('TalkGroup_Name');
await pageObj.validateCount();
```

---

### 5. Utility Methods (10+)

**Purpose**: Support operations

**Characteristics**:
- Mix of async/sync
- Return various types
- Helper operations

**Examples**:
```typescript
// Direct page access
getPage(): Page {
  return this.page;
}

// Visibility check
async checkVisibility(locator: Locator) {
  const isVisible = await locator.isVisible().catch(() => false);
  return isVisible;
}

// Generic click with wait
async clickEvent(locator: Locator) {
  await locator.click();
  await this.page.waitForTimeout(300);
}

// Force click (bypass visibility check)
async forceClickEvent(locator: Locator) {
  await locator.click({ force: true });
}

// Get text content
async getTextContent(locator: Locator): Promise<string | null> {
  return await locator.textContent();
}
```

---

## Data Flow Architecture

### Typical Test Execution Flow

```
┌──────────────────┐
│  Test Starts     │
└────────┬─────────┘
         │
         ▼
┌──────────────────────────────┐
│ Authentication Phase         │
│ await wcsrLogin(page)        │
│ ├─ Go to login URL           │
│ ├─ Fill credentials          │
│ └─ Wait for navigation       │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Initialize Page Object       │
│ pageObj = new CATPage(page)  │
│ (Receives page instance)     │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Navigation Phase             │
│ await pageObj.visitTalkGroup()
│ ├─ Get navigation button     │
│ ├─ Click button              │
│ └─ Wait for page load        │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Action Phase                 │
│ await pageObj.createXXX()    │
│ ├─ Get elements (locators)   │
│ ├─ Perform actions           │
│ │  ├─ Click                  │
│ │  ├─ Fill                   │
│ │  ├─ Select                 │
│ │  └─ Check                  │
│ └─ Wait for effects          │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Verification Phase           │
│ await pageObj.validateXXX()  │
│ ├─ Get element               │
│ ├─ Use expect()              │
│ └─ Assert state              │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────┐
│  Test Passes/Fails
│  Cleanup begins
└──────────────────┘
```

### Element Selection Strategy

```
Test Code
    ↓
Call POM Method: getSearchBox()
    ↓
Returns Locator: this.page.locator('.search_input')
    ↓
Test Uses Locator: await locator.fill('text')
    ↓
Locator Evaluates: Maps to actual DOM element
    ↓
Action Executed: Input filled
    ↓
Wait Applied: Network/timeout waits
    ↓
Result Verified: Element state confirmed
```

---

## Type Safety Architecture

### TypeScript Flow

```typescript
// 1. Test imports types
import { test, expect } from '@playwright/test';  // ← Types defined
import { CATPage } from '../pages/CATPage';        // ← Typed class

// 2. Page Object defines method signatures
export class CATPage {
  constructor(private page: Page) {}  // ← Page: Page type
  
  getSearchBox(): Locator {           // ← Return type: Locator
    return this.page.locator('...');
  }
  
  async createTalkGroup(name: string): Promise<void> {  // ← Input/output types
    // implementation
  }
}

// 3. Test uses typed methods
test('example', async ({ page }) => {
  const pageObj: CATPage = new CATPage(page);  // ← Type annotation
  const locator: Locator = pageObj.getSearchBox();  // ← Type inference
  await pageObj.createTalkGroup('name');  // ← Type checking
});

// 4. Compiler validates
// ✅ All types correct → npx tsc --noEmit → No errors
// ❌ Type mismatch → npx tsc --noEmit → Error messages
```

---

## Module Organization Strategy

### Module Structure

```
tests/CAT/Talkgroup/
│
├── Common Test Pattern Files
│   ├── visit_and_verify_talkgroup.spec.ts
│   │   └─ Tests: TG-001 (foundational)
│   │
│   ├── create_and_verify_standard_talkgroup.spec.ts
│   │   └─ Tests: TG-002-003 (creation pattern)
│   │
│   ├── assign_user_and_verify_standard_talkgroup.spec.ts
│   │   └─ Tests: TG-004-005 (user assignment)
│   │
│   └── [18 more files...]
│
├── Type Hierarchy
│   ├─ Standard
│   │  ├─ Regular
│   │  ├─ Preconfigured
│   │  ├─ InterOp
│   │  └─ with UserSet
│   │
│   ├─ Dispatch
│   │  ├─ Regular
│   │  ├─ Preconfigured
│   │  ├─ InterOp
│   │  └─ with UserSet
│   │
│   └─ Broadcast
│      ├─ Regular
│      ├─ Preconfigured
│      ├─ InterOp
│      └─ with UserSet
│
└── Operations
    ├─ Create (TG-002, TG-012, etc.)
    ├─ Assign (TG-004, TG-006, etc.)
    ├─ Modify (TG-016, TG-018)
    ├─ Preconfigure (TG-010, TG-012, etc.)
    ├─ Verify Permissions (TG-028, TG-030)
    └─ Cleanup (Delete)
```

---

## Configuration Architecture

### playwright.config.ts

```typescript
export default defineConfig({
  // Test discovery
  testDir: './tests',           // Where tests are
  
  // Execution
  fullyParallel: true,          // Run tests in parallel
  workers: process.env.CI ? 1 : undefined,  // Worker threads
  workers: 4,                   // Parallel workers
  
  // Retries
  retries: process.env.CI ? 2 : 0,  // Retry failures
  
  // Timeout
  timeout: 30_000,              // 30-second timeout per test
  
  // Reporting
  reporter: 'html',             // HTML report
  
  // Screenshot/Video
  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  
  // Multi-browser
  projects: [
    { name: 'chromium' },
    { name: 'firefox' },
    { name: 'webkit' },
  ],
});
```

---

## Error Handling Architecture

### Three-Layer Error Handling

```
Layer 1: Test Level
  try {
    await pageObj.validateDisplayObj('Item');
  } catch (error) {
    // Test fails, error reported
  }

Layer 2: POM Method Level
  async validateDisplayObj(name: string) {
    try {
      await expect(locator).toBeVisible();
    } catch {
      throw new Error(`Item "${name}" not found`);
    }
  }

Layer 3: Element Selection Level
  const isVisible = await locator.isVisible()
    .catch(() => false);  // Safe default
```

### Wait Strategy

```
Playwright Wait Types:
├─ Implicit: Built-in retries (4 seconds default)
├─ Explicit Element: await expect(locator).toBeVisible()
├─ Network: await page.waitForLoadState('networkidle')
├─ Arbitrary: await page.waitForTimeout(5000)
└─ Custom: await page.waitForFunction(condition)
```

---

## Best Practices Summary

### Architecture Principles

1. **Separation of Concerns**
   - Tests: Define scenarios
   - POM: Manage elements
   - Helpers: Reusable functions

2. **Single Responsibility**
   - Each method does one thing
   - Locators select only
   - Perform actions only
   - Validate only

3. **DRY (Don't Repeat Yourself)**
   - Share methods across tests
   - Centralize selectors
   - Reuse helper functions

4. **Maintainability**
   - Change selectors in one place
   - Add new methods as needed
   - Keep naming consistent
   - Document complex logic

5. **Type Safety**
   - Use TypeScript fully
   - Define all types
   - Compiler validates
   - Catches errors early

---

**Document Version**: 1.0  
**Status**: Complete Architecture Reference  
**Last Updated**: April 2026
