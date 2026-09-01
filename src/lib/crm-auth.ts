/**
 * Hardcoded CRM credentials for MVP (no server yet).
 * Replace with Docker/.NET auth later at c:\labhinitta thrissur
 */
export const CRM_USERS = [
  {
    email: "ashifzaheer423@gmail.com",
    password: "labhonitta@ashif",
    role: "superadmin" as const,
    name: "Ashif Zaheer",
  },
] as const;

export type CrmRole = "superadmin" | "editor";

export function verifyCrmLogin(email: string, password: string) {
  const user = CRM_USERS.find(
    (u) =>
      u.email.toLowerCase() === email.trim().toLowerCase() &&
      u.password === password
  );
  return user ?? null;
}
