export type Agent =
  | "Frontend"
  | "Backend"
  | "Database"
  | "CI/CD"
  | "UX/UI"
  | "Testing";

export type Status = "Pending" | "In Progress" | "Complete";

export interface PlanItem {
  id: string;
  description: string;
  agent: Agent;
  status: Status;
}
