import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import { PlanItem } from "../lib/types";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

interface PlanEditorProps {
  plan: PlanItem[];
  setPlan: (plan: PlanItem[]) => void;
  onExecute: () => void;
  isLoading: boolean;
}

export default function PlanEditor({
  plan,
  setPlan,
  onExecute,
  isLoading,
}: PlanEditorProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const renderPlanTree = (
    isLoading = false,
    items: PlanItem[],
    level: number = 0
  ) => {
    if (isLoading) {
      return (
        <div
          className="flex flex-col items-center justify-center p-8 bg-gray-900 border border-gray-700 rounded-xl mt-6 shadow-2xl"
          style={{ minHeight: "150px" }}
        >
          <CircularProgress size={40} style={{ color: "#14a098" }} />
          <p
            className="mt-4 text-xl font-bold"
            style={{ color: "white", textAlign: "center" }}
          >
            Generating Execution Plan...
          </p>
          <p
            className="text-sm"
            style={{ color: "#9ca3af", textAlign: "center" }}
          >
            The planning layer is breaking down your request into atomic steps.
          </p>
        </div>
      );
    }

    if (items.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center p-12 mt-6 text-gray-500 border-2 border-dashed border-gray-700 rounded-xl">
          <p className="text-sm">
            Enter a high-level goal above to generate the initial execution
            plan.
          </p>
        </div>
      );
    }

    return (
      <List sx={{ pl: level * 2 }}>
        {items.map((item) => (
          <Box key={item.id}>
            <ListItem
              onClick={() => toggleExpand(item.id)}
              sx={{
                cursor: "pointer",
                bgcolor: expandedItems.has(item.id)
                  ? "rgba(20, 160, 152, 0.2)"
                  : "transparent",
                borderRadius: 1,
                mb: 0.5,
                transition: "background-color 0.3s",
              }}
            >
              <ListItemText
                primary={
                  <Typography sx={{ color: "#cccccc", fontWeight: 600 }}>
                    {item.title}
                  </Typography>
                }
                secondary={
                  <Typography sx={{ color: "#14a098", fontSize: "0.9rem" }}>
                    {item.description}
                  </Typography>
                }
              />
              {item.children && (
                <Box>
                  {expandedItems.has(item.id) ? (
                    <ExpandLessIcon sx={{ color: "#cb2d6f" }} />
                  ) : (
                    <ExpandMoreIcon sx={{ color: "#cb2d6f" }} />
                  )}
                </Box>
              )}
            </ListItem>
            {item.children &&
              expandedItems.has(item.id) &&
              renderPlanTree(false, item.children, level + 1)}
          </Box>
        ))}
      </List>
    );
  };

  return (
    <Box className="glass-card" sx={{ p: 3, mt: 3, mb: 4 }}>
      <Typography
        variant="h5"
        className="text-white"
        sx={{ color: "#cccccc", mb: 2, fontWeight: "bold" }}
      >
        2. Plan Review & Modification
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{ mb: 1, color: "#9ca3af", fontWeight: 500 }}
      >
        Interactive Plan Editor:
      </Typography>
      <Typography
        variant="body2"
        className="text-gray-400"
        sx={{ color: "#14a098", mb: 1 }}
      >
        The core value: Review the plan, reorder steps (drag & drop), assign
        different agents, and refine descriptions before committing to code
        generation.
      </Typography>
      {renderPlanTree(isLoading, plan)}

      <Button
        variant="contained"
        onClick={onExecute}
        size="large"
        fullWidth
        sx={{ mt: 3 }}
      >
        Execute Plan
      </Button>
    </Box>
  );
}
