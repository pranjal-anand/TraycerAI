import { PlanItem } from "./types";

// Mock LLM response; in production, replace with actual API call, e.g.:
// async function callGrokAPI(prompt: string) {
//   const response = await fetch('https://api.x.ai/v1/chat/completions', {
//     method: 'POST',
//     headers: { 'Authorization': 'Bearer YOUR_API_KEY', 'Content-Type': 'application/json' },
//     body: JSON.stringify({ model: 'grok', messages: [{ role: 'user', content: prompt }] })
//   });
//   const data = await response.json();
//   return parsePlanFromText(data.choices[0].message.content);
// }

export async function generatePlan(objective: string): Promise<PlanItem[]> {
  // Mock plan generation based on objective
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: crypto.randomUUID(),
          description:
            "Define application scope and core user stories (e.g., user can sign up, user can create a task).",
          agent: "UX/UI",
          status: "Pending",
        },
        {
          id: crypto.randomUUID(),
          description:
            "Set up the backend environment, including API routing and authentication scaffolding.",
          agent: "Backend",
          status: "Pending",
        },
        {
          id: crypto.randomUUID(),
          description:
            "Design the database schema for users and tasks (tables, relations, indexes).",
          agent: "Database",
          status: "Pending",
        },
        {
          id: crypto.randomUUID(),
          description:
            "Develop the main application UI components (layout, navigation, task list view).",
          agent: "Frontend",
          status: "Pending",
        },
        {
          id: crypto.randomUUID(),
          description:
            "Implement API endpoints for CRUD operations (Create, Read, Update, Delete tasks).",
          agent: "Backend",
          status: "Pending",
        },
        {
          id: crypto.randomUUID(),
          description:
            "Integrate frontend components with the backend API to ensure data flow.",
          agent: "Frontend",
          status: "Pending",
        },
      ]);
    }, 1000);
  });
}
