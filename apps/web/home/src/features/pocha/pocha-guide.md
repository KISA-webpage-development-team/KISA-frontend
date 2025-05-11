## Pocha Project Naming Convention Guide

### 📌 General Principles

- **Consistency:** Follow a standardized naming pattern throughout the codebase.
- **Clarity:** Names should clearly convey the purpose of the component, variable, or function.
- **Predictability:** Team members should easily understand the structure and behavior based on the name alone.

---

### 📦 **Component Naming Rules**

#### ✅ Standard Naming

- **PascalCase** for all component names.
- Prefix components with `Pocha` only if they are **specific to a particular page** in the Pocha project and not reusable elsewhere.
- Avoid using the `Pocha` prefix for components where **folder structure already defines the domain clearly**.

#### ✅ When to Use the `Pocha` Prefix

- **Use `Pocha` Prefix:** For components specific to a single view or page.
  - ✅ `PochaHeading`, `PochaMainTabs` (Pocha main page specific)
- **Do Not Use `Pocha` Prefix:** When the folder structure defines the domain clearly.
  - ✅ `MenuList.tsx` (inside `menu` folder, clearly a menu component)
  - ✅ `OrderTab.tsx` (inside `order` folder, already specific to order domain)

---

### 📦 **Folder Structure Guidelines**

- **`shared/`** → Common UI components used across the project (e.g., `Button.tsx`, `Modal.tsx`).
- **Feature-Specific Folders:**
  - `menu/` → Contains components for menu functionality.
  - `order/` → Contains components for order management.
  - `dashboard/` → Dashboard-specific components.
- **Page-Specific Components:**
  - `PochaMainTabs.tsx` and `PochaHeading.tsx` belong in their respective feature folders, as they are specific to the Pocha main page.

---

### 🛠️ **Variable Naming Rules**

- Use **camelCase** for variables and function names.
- **Boolean Variables:** Use `is`, `has`, or `can` as a prefix.
  - ✅ `isLoading`, `hasError`, `canSubmit`

---

### 📡 **Hook Naming Rules**

- Prefix all custom React hooks with `use`.
  - ✅ `usePochaOrders`, `useFetchMenu`

---

### 📑 **File & Folder Naming Rules**

- **Folder Structure:** Group components by feature scope.
- **File Naming:** Use **PascalCase** for all file names.
- **File Scope Clarity:** Avoid redundant naming if the folder already clarifies the domain.

---

### 🔧 **Function Naming Rules**

- **Action-Oriented:** Use verbs for functions performing actions.
- ✅ `fetchPochaOrders`, `handleMenuClick`

---

### ✅ **Best Practices Summary:**

1. **Use the `Pocha` prefix only for page-specific components.**
2. **Avoid redundant naming when folder structure provides enough context.**
3. **Ensure consistency across the entire codebase.**

---

### 📌 **Review Process:**

- Ensure all PRs adhere to this naming convention.
- Use this guide during code reviews.

---

✅ **This guide ensures code clarity, consistency, and maintainability for the entire Pocha project.**
