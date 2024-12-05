import { messages } from "Constants/messages";

export const translateValidateMessage = (key: string): string => {
  return messages[key] || "Something went wrong !";
};
