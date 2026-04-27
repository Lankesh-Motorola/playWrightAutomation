# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: CAT\User_Set\create_user_set_page.spec.ts >> One Portal CAT - Create User Set >> US-01 Create User Set
- Location: tests\CAT\User_Set\create_user_set_page.spec.ts:10:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('#menu-44-Usersets')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('#menu-44-Usersets')

```

# Page snapshot

```yaml
- generic [ref=e4]:
  - banner [ref=e7]:
    - generic [ref=e9]:
      - generic [ref=e12] [cursor=pointer]:
        - generic [ref=e14]:
          - img "emsignia light"
        - generic [ref=e16]: Web based Customer Service Representative Tool
      - generic [ref=e20] [cursor=pointer]:
        - generic [ref=e24]:
          - img "contact picture light"
        - generic [ref=e25]: mcx@msi.com
        - img [ref=e27]
  - generic [ref=e31]:
    - generic [ref=e32]:
      - generic [ref=e33]: Welcome to Customer Service Representative Tool!
      - generic [ref=e34]:
        - paragraph [ref=e35]: Customer Service Representative Tool provides a platform for care representative to manage the corporations as well as individual subscribers. The CSR can provision/de-provision subscribers and manage their profile using Subscriber Management. Also can manage corporations using Corporate Admin Tool, which is accessed from within CSR Tool. Following functions can be performed. Note that not all the functions are applicable to your system and may be grayed out or not available.
        - paragraph [ref=e36]: Click on ‘Subscriber Management’ to view and create subscribers.
        - paragraph [ref=e37]: Click on ‘Corporate Management’ and enter corporate ID to launch Corporate Admin Tool.
    - generic [ref=e39]:
      - generic [ref=e40] [cursor=pointer]:
        - img [ref=e43]
        - generic [ref=e46]: Subscriber Management
      - generic [ref=e47] [cursor=pointer]:
        - img [ref=e50]
        - generic [ref=e52]: Corporate Management
      - generic [ref=e53]:
        - generic [ref=e54]:
          - text: Launch Corporate Admin Tool
          - img [ref=e56]
        - generic [ref=e60]:
          - textbox "Enter Corporate ID" [ref=e61]: Multi-Site-2U
          - button "Launch" [active] [ref=e63] [cursor=pointer]:
            - img [ref=e65]
            - text: Launch
```

# Test source

```ts
  1649 |     await nameField.fill(talkgroupName);
  1650 |     await this.page.waitForTimeout(300);
  1651 | 
  1652 |     // Add user if provided
  1653 |     if (assignedUser) {
  1654 |       const assignBtn = this.page.locator('button:has-text("Assign"), button[id*="assign"]').first();
  1655 |       if (await assignBtn.isVisible().catch(() => false)) {
  1656 |         await assignBtn.click();
  1657 |         const userOption = this.page.locator('.mat-option, option').first();
  1658 |         if (await userOption.isVisible()) {
  1659 |           await userOption.click();
  1660 |         }
  1661 |       }
  1662 |     }
  1663 | 
  1664 |     const saveBtn = this.getSaveButton();
  1665 |     await saveBtn.click();
  1666 |     await this.page.waitForLoadState('networkidle');
  1667 |   }
  1668 | 
  1669 |   getEditNameBox(): Locator {
  1670 |     // Get edit name box for talkgroup
  1671 |     return this.page.locator('input[id*="name"], input[placeholder*="Name"]').first();
  1672 |   }
  1673 | 
  1674 |   getSupervisorsTab(): Locator {
  1675 |     // Get supervisors tab
  1676 |     return this.page.locator('.mat-tab-label:has-text("Supervisor"), [role="tab"]:has-text("Supervisor")').first();
  1677 |   }
  1678 | 
  1679 |   getAssignUsersIcon(): Locator {
  1680 |     // Get assign users icon/button
  1681 |     return this.page.locator('button:has-text("Assign"), button[id*="assign"], [class*="assign-icon"]').first();
  1682 |   }
  1683 | 
  1684 |   getAssignUserPopupSearch(): Locator {
  1685 |     // Get search input in assign user popup
  1686 |     return this.page.locator('input[id*="search"], input[placeholder*="Search"]').first();
  1687 |   }
  1688 | 
  1689 |   getAssinedCheckBox(): Locator {
  1690 |     // Get assigned checkbox element
  1691 |     return this.page.locator('input[type="checkbox"]');
  1692 |   }
  1693 | 
  1694 |   getAssignButton(): Locator {
  1695 |     // Get assign button (usually in popup/modal)
  1696 |     return this.page.locator('button:has-text("Assign")').last();
  1697 |   }
  1698 | 
  1699 |   getDispatcherTab(): Locator {
  1700 |     // Get dispatcher tab
  1701 |     return this.page.locator('.mat-tab-label:has-text("Dispatcher"), [role="tab"]:has-text("Dispatcher")').first();
  1702 |   }
  1703 | 
  1704 |   getUsersTab(): Locator {
  1705 |     // Get users tab
  1706 |     return this.page.locator('.mat-tab-label:has-text("User"), [role="tab"]:has-text("User")').first();
  1707 |   }
  1708 | 
  1709 |   getOkButton(): Locator {
  1710 |     // Get OK button
  1711 |     return this.page.locator('button:has-text("OK")').first();
  1712 |   }
  1713 | 
  1714 |   getBroadcastersTab(): Locator {
  1715 |     // Get broadcasters tab (for broadcast type talkgroups)
  1716 |     return this.page.locator('.mat-tab-label:has-text("Broadcaster"), [role="tab"]:has-text("Broadcaster")').first();
  1717 |   }
  1718 | 
  1719 |   getPage() {
  1720 |     // Get the page object for direct access
  1721 |     return this.page;
  1722 |   }
  1723 | 
  1724 |   async createTalkGroupPreconfigured(talkgroupType: string = 'Standard', talkgroupName: string = 'TalkGroup') {
  1725 |     // Create preconfigured talkgroup
  1726 |     const createBtn = this.getCreateTalkgrpBtn();
  1727 |     if (await createBtn.isVisible().catch(() => false)) {
  1728 |       await createBtn.click();
  1729 |       await this.page.waitForTimeout(500);
  1730 |     }
  1731 | 
  1732 |     // Select preconfigured option if available
  1733 |     const preconfigBtn = this.page.locator('button:has-text("Preconfigured"), [id*="preconfigured"]').first();
  1734 |     if (await preconfigBtn.isVisible().catch(() => false)) {
  1735 |       await preconfigBtn.click();
  1736 |       await this.page.waitForTimeout(500);
  1737 |     }
  1738 | 
  1739 |     const nameField = this.page.locator('input[id*="name"], input[placeholder*="Name"]').first();
  1740 |     await nameField.fill(talkgroupName);
  1741 |     await this.page.waitForTimeout(300);
  1742 | 
  1743 |     const saveBtn = this.getSaveButton();
  1744 |     await saveBtn.click();
  1745 |     await this.page.waitForLoadState('networkidle');
  1746 |   }
  1747 | 
  1748 |   async openUserSetPage() {
> 1749 |     await expect(this.getUserSetButton()).toBeVisible();
       |                                           ^ Error: expect(locator).toBeVisible() failed
  1750 |     await this.getUserSetButton().click();
  1751 |   }
  1752 | 
  1753 |   async assignUserToUserSet(){
  1754 |     await this.getAssignUserButton().click();
  1755 |     await this.getAssignUserCheckBox().check();
  1756 |     await this.getAssignButton().click();
  1757 | 
  1758 |   }
  1759 |    async assignSecondUserToUserSet(){
  1760 |     await this.getAssignUserButton().click();
  1761 |     await this.getAssignUserSecondCheckBox().check();
  1762 |     await this.getAssignButton().click();
  1763 |     await this.getOkButton().click();
  1764 |   }
  1765 | 
  1766 |   async modifyUserSetName() {
  1767 |     // Get the current userSetName from cat.json
  1768 |     const storedUserSetName = this.getStoredUserSetName();
  1769 |     
  1770 |     // Create locator using getByText with userSetName
  1771 |     const userSetNameLocator = this.page.getByText(storedUserSetName);
  1772 |     await expect(userSetNameLocator).toBeVisible();
  1773 |     await userSetNameLocator.click();
  1774 |     
  1775 |     // Wait for edit mode and clear the input field
  1776 |     const editNameInput = this.page.locator('input[id*="editName"]');
  1777 |     await expect(editNameInput).toBeVisible();
  1778 |     await editNameInput.clear();
  1779 |     
  1780 |     // Generate new name and store in cat.json as updatedUserSetName
  1781 |     const updatedUserSetName = `UpdatedUserSet_${Date.now()}`;
  1782 |     
  1783 |     // Update cat.json with the new name
  1784 |     const testDataDir = path.join(process.cwd(), 'pages', 'test-data');
  1785 |     const testDataPath = path.join(testDataDir, 'cat.json');
  1786 |     let testData: any = {};
  1787 |     
  1788 |     // Ensure directory exists
  1789 |     if (!fs.existsSync(testDataDir)) {
  1790 |       fs.mkdirSync(testDataDir, { recursive: true });
  1791 |     }
  1792 |     
  1793 |     // Read existing data if file exists and has content
  1794 |     if (fs.existsSync(testDataPath)) {
  1795 |       try {
  1796 |         const fileContent = fs.readFileSync(testDataPath, 'utf-8');
  1797 |         if (fileContent.trim()) {
  1798 |           testData = JSON.parse(fileContent);
  1799 |         }
  1800 |       } catch (error) {
  1801 |         console.log('Error reading test data file:', error);
  1802 |         testData = {};
  1803 |       }
  1804 |     }
  1805 |     
  1806 |     testData.updatedUserSetName = updatedUserSetName;
  1807 |     testData.lastUpdated = new Date().toISOString();
  1808 |     
  1809 |     fs.writeFileSync(testDataPath, JSON.stringify(testData, null, 2));
  1810 |     
  1811 |     // Fill the new name
  1812 |     await editNameInput.fill(updatedUserSetName);
  1813 |     
  1814 |     // Click the inline edit save icon (checkmark)
  1815 |     const inlineEditSaveIcon = this.page.locator('svg-icon.inlineEdit.inln-icn.ng-star-inserted');
  1816 |     await expect(inlineEditSaveIcon).toBeVisible();
  1817 |     await inlineEditSaveIcon.click();
  1818 |     
  1819 |     // Validate toaster message
  1820 |     const toasterMessage = this.page.locator('.toast-message, .toastr-message, [class*="toast"], [class*="notification"]');
  1821 |     await expect(toasterMessage).toBeVisible({ timeout: 10000 });
  1822 |     const messageText = await toasterMessage.textContent();
  1823 |     console.log('Toaster message:', messageText);
  1824 |     
  1825 |     return updatedUserSetName;
  1826 |   }
  1827 | 
  1828 |   async searchUserSet(){
  1829 |     const storedUserSetName = this.getStoredUserSetName();
  1830 |     const createdUserSetName = this.page.locator('tr').filter({ has: this.page.locator('p', { hasText: `${storedUserSetName}` }) });
  1831 |     const searchBox = this.getSearchBox();
  1832 |     await searchBox.fill(storedUserSetName);
  1833 |     await expect(createdUserSetName).toHaveText(storedUserSetName);
  1834 |   }
  1835 | 
  1836 |   // Helper method to read test data from cat.json
  1837 |   getStoredTestData(): any {
  1838 |     const testDataDir = path.join(process.cwd(), 'pages', 'test-data');
  1839 |     const testDataPath = path.join(testDataDir, 'cat.json');
  1840 |     
  1841 |     if (fs.existsSync(testDataPath)) {
  1842 |       try {
  1843 |         const fileContent = fs.readFileSync(testDataPath, 'utf-8');
  1844 |         if (fileContent.trim()) {
  1845 |           return JSON.parse(fileContent);
  1846 |         }
  1847 |       } catch (error) {
  1848 |         console.error('Error reading test data:', error);
  1849 |       }
```