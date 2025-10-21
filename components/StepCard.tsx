import { Agent, PlanItem, Status } from "../lib/types";
import DeleteIcon from "@mui/icons-material/Delete";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import { Box, Button, TextField } from "@mui/material";

interface StepCardProps {
  step: PlanItem;
  index: number;
  isEditing: boolean;
  onUpdate: (id: string, newDescription: string) => void;
  onStatusChange: (id: string, newStatus: Status) => void;
  onAgentChange: (id: string, newAgent: Agent) => void;
  onDelete: (id: string) => void;
  // Native D&D props
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
  handleDragEnter: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
  handleDragEnd: () => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  isDragging: boolean;
  isOver: boolean;
  canDrag: boolean;
}

export default function StepCard({
  step,
  index,
  isEditing,
  onUpdate,
  onStatusChange,
  onAgentChange,
  onDelete,
  handleDragStart,
  handleDragEnter,
  handleDragEnd,
  handleDragOver,
  isDragging,
  isOver,
  canDrag,
}: StepCardProps) {
  const statusColors = {
    Pending: "border-blue-500 bg-blue-900/20 text-blue-300",
    "In Progress": "border-yellow-500 bg-yellow-900/20 text-yellow-300",
    Complete: "border-green-500 bg-green-900/20 text-green-300",
  };

  return (
    <Box
      className="glass-card"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        p: 3,
        mt: 3,
        mb: 4,
      }}
    >
      <div
        data-id={step.id}
        draggable={canDrag && isEditing}
        onDragStart={(e) => isEditing && handleDragStart(e, step.id)}
        onDragEnter={(e) => isEditing && handleDragEnter(e, step.id)}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDrop={handleDragEnd} // handleDrop logic is in parent, this resets dragging state
        className={`
        p-4 mb-3 border rounded-lg shadow-lg transition-all duration-200 cursor-default
        ${statusColors[step.status]}
        ${
          isDragging
            ? "opacity-50 border-dashed ring-4 ring-purple-500/50"
            : "opacity-100"
        }
        ${
          isOver && !isDragging
            ? "border-4 border-dashed border-pink-500/80 mt-6 mb-6"
            : ""
        }
      `}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center text-sm font-bold text-gray-200 w-full">
            <span className="w-6 mr-2 text-center text-lg">{index + 1}. </span>
            {isEditing ? (
              <TextField
                multiline
                value={step.description}
                onChange={(e) => onUpdate(step.id, e.target.value)}
                className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-lg transition duration-150 resize-none"
                rows={Math.max(1, Math.ceil(step.description.length / 50))} // Dynamic rows
              />
            ) : (
              <span className="text-base text-white">{step.description}</span>
            )}
            {isEditing && (
              <Button
                onClick={() => onDelete(step.id)}
                className="w-full mt-4 py-3 text-lg font-bold text-white transition duration-200 rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                title="Delete Step"
                style={{ marginLeft: "0.75rem" }} // Fallback gap
              >
                <DeleteIcon sx={{ width: 16, height: 16, mr: 1 }} />
              </Button>
            )}
          </div>

          <div className="flex items-center space-x-2 shrink-0 ml-4"></div>
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-800">
          {!isEditing && (
            <select
              value={step.status}
              onChange={(e) =>
                onStatusChange(step.id, e.target.value as Status)
              }
              className="bg-gray-700 border border-gray-600 rounded-md text-sm p-1 text-white"
            >
              {["Pending", "In Progress", "Complete"].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    </Box>
  );
}
