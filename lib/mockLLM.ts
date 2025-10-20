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
          id: "1",
          title: "Step 1: Analyze Requirements",
          children: [
            { id: "1.1", title: "Break down objective", description: objective },
          ],
        },
        { id: "2", title: "Step 2: Implement Logic" },
        { id: "3", title: "Step 3: Test" },
      ]);
    }, 1000);
  });
}