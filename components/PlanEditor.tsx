import { useState } from "react";
import { UncontrolledTreeEnvironment, Tree, StaticTreeDataProvider } from "react-complex-tree";
import { Box, Button, Typography } from "@mui/material";
import { PlanItem } from "../lib/types";

interface PlanEditorProps {
  plan: PlanItem[];
  setPlan: (plan: PlanItem[]) => void;
  onExecute: () => void;
}

export default function PlanEditor({ plan, setPlan, onExecute }: PlanEditorProps) {
  const [data, setData] = useState<{ [key: string]: { data: PlanItem; children?: string[] } }>(
    plan.reduce((acc, item) => {
      acc[item.id] = { data: item, children: item.children?.map((c) => c.id) || [] };
      item.children?.forEach((child) => {
        acc[child.id] = { data: child };
      });
      return acc;
    }, {} as any)
  );

  // Simplified edit: For real edit, implement onRenameItem etc.
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6">Edit Plan</Typography>
      <UncontrolledTreeEnvironment
        dataProvider={new StaticTreeDataProvider(data)}
        getItemTitle={(item) => item.data.title}
        viewState={{}}
      >
        <Tree treeId="plan-tree" rootItem="root" treeLabel="Plan Tree" />
      </UncontrolledTreeEnvironment>
      <Button variant="contained" onClick={onExecute} sx={{ mt: 2 }}>
        Execute Plan
      </Button>
    </Box>
  );
}