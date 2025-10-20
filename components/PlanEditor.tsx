import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { PlanItem } from "@/lib/types";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

interface PlanEditorProps {
  plan: PlanItem[];
  setPlan: (plan: PlanItem[]) => void;
  onExecute: () => void;
}

export default function PlanEditor({
  plan,
  setPlan,
  onExecute,
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

  const renderPlanTree = (items: PlanItem[], level: number = 0) => (
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
            renderPlanTree(item.children, level + 1)}
        </Box>
      ))}
    </List>
  );

  return (
    <Box className="glass-card" sx={{ p: 3, mt: 3, mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, color: "#cb2d6f" }}>
        📋 Interactive Plan Editor
      </Typography>

      {plan.length > 0 ? (
        renderPlanTree(plan)
      ) : (
        <Typography sx={{ color: "#cccccc", textAlign: "center", py: 2 }}>
          Generate a plan to see the tree here!
        </Typography>
      )}

      <Button
        variant="contained"
        onClick={onExecute}
        size="large"
        fullWidth
        sx={{ mt: 3 }}
      >
        💻 Execute Plan
      </Button>
    </Box>
  );
}
