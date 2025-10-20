export interface PlanItem {
  id: string;
  title: string;
  children?: PlanItem[];
  description?: string;
}