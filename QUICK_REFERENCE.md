# Cypress to Playwright: Quick Reference Guide

## At a Glance

| Aspect | Cypress | Playwright |
|--------|---------|-----------|
| **File Extension** | `.cy.ts` | `.spec.ts` |
| **Framework** | Commands-based | API-based |
| **Async Pattern** | Implicit queueing | Explicit async/await |
| **Test Declaration** | `it()` | `test()` |
| **Setup Hook** | `beforeEach()` | `test.beforeEach()` |
| **Page Selection** | `cy.get()` | `page.locator()` |
| **Type Support** | Limited | Full TypeScript |
| **Element Index** | `.eq(n)` | `.nth(n)` |
| **Typewriter** | `.type()` | `.fill()` |
| **Wait** | `cy.wait()` | `page.waitForTimeout()` |
| **Navigation** | `cy.visit()` | `page.goto()` |

---

## Common Conversions

### 1. Login

```typescript
// ❌ CYPRESS
cy.login()

// ✅ PLAYWRIGHT
await wcsrLogin(page);
```

### 2. Navigation

```typescript
// ❌ CYPRESS
cy.visit(url)

// ✅ PLAYWRIGHT
await page.goto(url)
```

### 3. Element Selection

```typescript
// ❌ CYPRESS
cy.get('selector')
cy.get('selector').type('text')

// ✅ PLAYWRIGHT
page.locator('selector')
await page.locator('selector').fill('text')
```

### 4. Multiple Elements by Index

```typescript
// ❌ CYPRESS
const items = cy.get('[id*="item"]')
items.eq(4).click()  // ← eq()

// ✅ PLAYWRIGHT
const items = page.locator('[id*="item"]')
await items.nth(4).click()  // ← nth()
```

### 5. Waits

```typescript
// ❌ CYPRESS
cy.wait(5000)

// ✅ PLAYWRIGHT
await page.waitForTimeout(5000)
await page.waitForLoadState('networkidle')
```

### 6. Assertions

```typescript
// ❌ CYPRESS
cy.contains(text).should('be.visible')

// ✅ PLAYWRIGHT
await expect(page.locator(`text=${text}`)).toBeVisible()
```

### 7. Read Input Value

```typescript
// ❌ CYPRESS
cy.get('input').invoke('val')

// ✅ PLAYWRIGHT
await page.locator('input').inputValue()
```

### 8. Check Checkbox

```typescript
// ❌ CYPRESS
cy.get('input[type="checkbox"]').check()

// ✅ PLAYWRIGHT
await page.locator('input[type="checkbox"]').check()
```

### 9. Visibility Check

```typescript
// ❌ CYPRESS
cy.get(selector).should('be.visible')

// ✅ PLAYWRIGHT
await page.locator(selector).isVisible()
// or with error handling:
await page.locator(selector).isVisible().catch(() => false)
```

### 10. Clear Input

```typescript
// ❌ CYPRESS
cy.get('input').clear()

// ✅ PLAYWRIGHT
await page.locator('input').clear()
```

---

## Test Structure Template

```typescript
import { test, expect } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin } from '../../../helpers/common';

let pageObj: CATPage;

test.describe('Module Name - Feature Description', () => {
  test.beforeEach(async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
  });

  test('TEST-001 First test case', async ({ page }) => {
    // Step 1: Setup/Navigation
    await pageObj.navigateToPage();

    // Step 2: User Action
    await pageObj.performAction();

    // Step 3: Validation
    await pageObj.validateResult();
  });

  test('TEST-002 Second test case', async ({ page }) => {
    // Similar structure
  });
});
```

---

## Page Object Method Patterns

### Navigation Method
```typescript
async visitTalkGroup() {
  const talkgroupBtn = this.page.locator('text=Talk Group');
  await talkgroupBtn.click();
  await this.page.waitForLoadState('networkidle');
}
```

### Locator Method (Returns Locator)
```typescript
getSearchBox(): Locator {
  return this.page.locator('.search_input');
}
```

### Interaction Method (Performs Action)
```typescript
async createTalkGroup(name: string) {
  const createBtn = this.getCreateTalkgrpBtn();
  await createBtn.click();
  
  const nameField = this.page.locator('input[name="name"]');
  await nameField.fill(name);
  
  await this.getSaveButton().click();
  await this.page.waitForLoadState('networkidle');
}
```

### Validation Method (Asserts)
```typescript
async validateDisplayObj(itemName: string) {
  const item = this.page.locator(`text=${itemName}`);
  await expect(item).toBeVisible({ timeout: 10_000 });
}
```

### Utility Method
```typescript
async clickEvent(locator: Locator) {
  await locator.click();
  await this.page.waitForTimeout(300);
}

getPage() {
  return this.page;  // Public access to page
}
```

---

## Test Execution Commands

```bash
# All tests
npx playwright test

# Specific module
npx playwright test tests/CAT/Talkgroup/

# Specific file
npx playwright test tests/CAT/Talkgroup/assign_user_and_verify_standard_talkgroup.spec.ts

# Specific test
npx playwright test -g "TG-001"

# With UI
npx playwright test --ui

# Headed (see browser)
npx playwright test --headed

# Debug mode
npx playwright test --debug

# Slow motion
npx playwright test --headed --slow-mo=1000

# Generate report
npx playwright test --reporter=html
npx playwright show-report

# Specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npm playwright test --project=webkit
```

---

## Modules Quick Reference

| Module | Tests | Files | Focus |
|--------|-------|-------|-------|
| **PTT-User** | 52 | 11 | User management, zone/position/priority |
| **External-User** | 13 | 4 | External user creation/validation |
| **User_Set** | 8 | 4 | User set management |
| **Interop_User** | 10 | 1 | Interoperability users |
| **OSM** | 20 | 2 | Operation Status Messages |
| **Group_Profile** | 57 | 11 | Group profile management |
| **Talkgroup** | 41 | 21 | Talkgroup creation/assignment |
| **User_Profile** | 1 | 1 | Landing page verification |
| **TOTAL** | **202** | **55** | ✅ |

---

## Critical Import Paths

### From Test File
```typescript
import { CATPage } from '../../../pages/CATPage';        // 3 levels up
import { wcsrLogin } from '../../../helpers/common';      // 3 levels up

// From: tests/CAT/Talkgroup/your_test.spec.ts
// To:   pages/CATPage.ts         (3 levels: Talkgroup → CAT → tests → root)
//       helpers/common.ts        (3 levels: Talkgroup → CAT → tests → root)
```

### Within Playwright_Automation
```
Playwright_Automation/
├── tests/CAT/Talkgroup/your_test.spec.ts
├── pages/CATPage.ts
└── helpers/common.ts
```

---

## Locator Selectors Guide

### CSS Selectors
```typescript
page.locator('input[name="username"]')           // Attribute
page.locator('.search_input.msi-searchbox')      // Class
page.locator('#main-content')                     // ID
page.locator('button[id*="create"]')             // Partial attribute
```

### Text-Based Selectors
```typescript
page.locator('text=Sign On')                      // Exact text
page.locator('text=/Sign.+On/')                   // Regex
page.locator(':has-text("Save")')                 // Has text
```

### XPath (Last Resort)
```typescript
page.locator('xpath=//button[@id="submit"]')
```

### Combine Selectors
```typescript
page.locator('button:has-text("Create")').first()
page.locator('.mat-tab-label:has-text("Users")')
```

---

## Error Handling Patterns

### Visibility Check
```typescript
// Safe check (won't throw)
const isVisible = await locator.isVisible().catch(() => false);
if (isVisible) {
  // Element is visible
}

// With explicit check
if (await locator.isVisible({ timeout: 5000 }).catch(() => false)) {
  await locator.click();
}
```

### Existence Check
```typescript
try {
  await expect(locator).toBeVisible();
  console.log('Element exists and is visible');
} catch {
  console.log('Element not found or not visible');
}
```

### Safe Fill
```typescript
const inputField = page.locator('input[name="search"]');
if (await inputField.isVisible().catch(() => false)) {
  await inputField.clear();
  await inputField.fill('search term');
}
```

---

## TypeScript Type Hints

### Common Types
```typescript
import { Page, Locator, expect, BrowserContext } from '@playwright/test';

class MyPageObject {
  constructor(private page: Page) {}
  
  getButton(): Locator {
    return this.page.locator('button');
  }
  
  async clickButton(): Promise<void> {
    await this.getButton().click();
  }
  
  getPage(): Page {
    return this.page;
  }
}
```

### In Tests
```typescript
let page: any;        // or: Page (more specific)
let pageObj: CATPage; // Page object

test.beforeEach(async ({ page: p }) => {
  page = p;
  pageObj = new CATPage(page);
});
```

---

## Common Issues & Solutions

### Issue 1: `.eq()` doesn't exist
```typescript
// ❌ WRONG
checkboxes.eq(4).click()

// ✅ RIGHT
await checkboxes.nth(4).check()
```

### Issue 2: Missing `await`
```typescript
// ❌ WRONG
await pageObj.clickEvent(locator)  // Returns Promise, not awaited inside method
  
// ✅ RIGHT
async clickEvent(locator: Locator) {
  await locator.click();  // Await inside
}

await pageObj.clickEvent(locator)  // Then await the method call
```

### Issue 3: Private Property Access
```typescript
// ❌ WRONG
const btn = pageObj.page.locator('button')  // TS2341: 'page' is private

// ✅ RIGHT
const btn = pageObj.getPage().locator('button')  // Use public method
```

### Issue 4: Input vs Textarea
```typescript
// For <input type="text">
await page.locator('input[name="search"]').fill('text')

// For <textarea>
await page.locator('textarea[name="message"]').fill('text')

// For contenteditable divs
await page.locator('[contenteditable="true"]').fill('text')
```

### Issue 5: Dropdown Selection
```typescript
// Text selection
await page.locator('select').selectOption('Option Text');

// Value selection
await page.locator('select').selectOption('value-123');

// All selected
const values = await page.locator('select').allTextContents();
```

---

## Performance Tips

1. **Avoid Arbitrary Waits**: Use explicit waits instead
```typescript
// ❌ SLOW
await page.waitForTimeout(5000)

// ✅ FAST
await page.waitForLoadState('networkidle')
await expect(locator).toBeVisible()
```

2. **Parallel Execution**: Run tests in parallel
```bash
npx playwright test --workers=4
```

3. **Reuse Browser Context**: Within test.beforeEach()

4. **Select Specific Tests**: Don't run entire suite for small changes
```bash
npx playwright test -g "TG-001"
```

---

## Best Practices

✅ **DO**:
- Use descriptive test names: `TG-001 Create Standard Talkgroup`
- Keep tests independent and isolated
- Use Page Object Model extensively
- Add comments for complex steps
- Use meaningful variable names
- Handle errors gracefully

❌ **DON'T**:
- Mix test logic with page selectors
- Create dependencies between tests
- Use arbitrary `waitForTimeout()` extensively
- Ignore TypeScript warnings
- Hardcode selectors in tests
- Skip assertions

---

## Quick Checklist Before Running Tests

- [ ] All dependencies installed: `npm install`
- [ ] Browsers installed: `npx playwright install`
- [ ] TypeScript compiles: `npx tsc --noEmit` returns no output
- [ ] Credentials updated in `helpers/common.ts`
- [ ] Base URL configured in `playwright.config.ts`
- [ ] Node version: 16+ (`node --version`)

---

## File Locations

```
OnePortalAutomation/
├── CONVERSION_DOCUMENT.md          ← Full documentation
├── QUICK_REFERENCE.md               ← This file
├── Playwright_Automation/
│   ├── tests/CAT/                   ← Test files
│   ├── pages/CATPage.ts             ← Page objects
│   ├── helpers/common.ts            ← Utilities
│   ├── playwright.config.ts         ← Configuration
│   └── package.json
├── cypress/                         ← Original Cypress files (archived)
└── playwright-report/               ← Generated reports
```

---

**Created**: April 2026  
**Status**: Ready for team reference  
**Total Tests Converted**: 202 ✅
