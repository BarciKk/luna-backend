export const messages: { [key: string]: string } = {
  // Category-related messages
  minCategoryNameLength: "Category name must be at least 3 characters long.",
  maxCategoryNameLength: "Category name must be less than 64 characters.",
  minCategoryIconLength: "Icon must be at least 3 characters long.",
  maxCategoryIconLength: "Icon must be less than 24 characters.",
  categoryNameRequired: "Category name is required.",
  categoryIconRequired: "Icon is required.",
  categoryColorRequired: "Color is required.",
  categoryColorTransparent: "Color cannot be transparent!",
  categoryIdRequired: "Category ID is required.",

  userIdRequired: "User ID is required.",
  userIdPositive: "User ID must be a positive number.",

  minTaskNameLength: "Task name must be at least 3 characters long.",
  maxTaskNameLength: "Task name must be less than 64 characters.",
  taskNameRequired: "Task name is required.",
  invalidDateFormat:
    "Please provide a valid ISO date format (e.g., 2023-12-31T23:59:59Z).",
  taskDateRequired: "Task date is required.",
  minPriority: "Priority must be at least 1.",
  maxPriority: "Priority cannot exceed 5.",
  maxDescriptionLength: "Description cannot exceed 255 characters.",

  invalidField: "This field is invalid.",
  requiredField: "This field is required.",
};
