import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
// MUI Icons for Buttons
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Agent, PlanItem, Status } from "../lib/types";
import StepCard from "./StepCard";

interface PlanEditorProps {
  plan: PlanItem[];
  setPlan: Dispatch<SetStateAction<PlanItem[]>>;
  onExecute: () => void;
  isLoading: boolean;
  isEditing: boolean;
  isExecuting: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

/**
 * Utility function to reorder an array
 */
function reorder(
  plan: PlanItem[],
  sourceIndex: number,
  targetIndex: number
): PlanItem[] {
  const result = Array.from(plan);
  const [moved] = result.splice(sourceIndex, 1);
  result.splice(targetIndex, 0, moved);
  return result;
}

export default function PlanEditor({
  plan,
  setPlan,
  onExecute,
  isLoading,
  isEditing,
  isExecuting,
  setIsEditing,
}: PlanEditorProps) {
  // Native Drag and Drop State
  const [draggingStepId, setDraggingStepId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  // --- NATIVE DRAG AND DROP HANDLERS ---

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    setDraggingStepId(id);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", id);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Necessary to allow drop
  };

  const handleDragEnter = (
    e: React.DragEvent<HTMLDivElement>,
    targetId: string
  ) => {
    e.preventDefault();
    if (draggingStepId && draggingStepId !== targetId) {
      setDragOverId(targetId);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetId: string) => {
    e.preventDefault();
    const draggedId = draggingStepId; // Use state value as dataTransfer might be unreliable

    if (!draggedId || draggedId === targetId) {
      setDraggingStepId(null);
      setDragOverId(null);
      return;
    }

    const sourceIndex = plan.findIndex((s) => s.id === draggedId);
    const targetIndex = plan.findIndex((s) => s.id === targetId);

    if (sourceIndex !== -1 && targetIndex !== -1) {
      const reorderedList = reorder(plan, sourceIndex, targetIndex);
      setPlan(reorderedList);
    }

    setDraggingStepId(null);
    setDragOverId(null);
  };

  const handleDragEnd = () => {
    setDraggingStepId(null);
    setDragOverId(null);
  };
  // --- END NATIVE DRAG AND DROP HANDLERS ---

  // Handlers for step manipulation
  const handleUpdateDescription = useCallback(
    (id: string, newDescription: string) => {
      setPlan((prev) =>
        prev.map((step) =>
          step.id === id ? { ...step, description: newDescription } : step
        )
      );
    },
    []
  );

  const handleUpdateStatus = useCallback((id: string, newStatus: Status) => {
    setPlan((prev) =>
      prev.map((step) =>
        step.id === id ? { ...step, status: newStatus } : step
      )
    );
  }, []);

  const handleUpdateAgent = useCallback((id: string, newAgent: Agent) => {
    setPlan((prev) =>
      prev.map((step) => (step.id === id ? { ...step, agent: newAgent } : step))
    );
  }, []);

  const handleDeleteStep = useCallback((id: string) => {
    setPlan((prev) => prev.filter((step) => step.id !== id));
  }, []);

  const renderPlanTree = (
    planSteps: PlanItem[],
    isLoading: boolean = false,
    isEditing: boolean = false,
    isExecuting: boolean = false,
    setIsEditing: Dispatch<SetStateAction<boolean>>
  ) => {
    if (isLoading) {
      return (
        <div
          className="flex flex-col items-center justify-center p-8 bg-gray-900 border border-gray-700 rounded-xl mt-6 shadow-2xl"
          style={{ minHeight: "150px" }}
        >
          <CircularProgress
            size={40}
            style={{ color: "#14a098", margin: "0 auto" }}
          />
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

    if (planSteps.length === 0) {
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
      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <Typography
            variant="h6"
            className="text-white"
            sx={{ color: "#cccccc", mb: 2, fontWeight: "bold" }}
          >
            Execution Plan ({planSteps.length} Steps)
          </Typography>
          <div className="w-full mt-4 py-3 text-lg font-bold text-white transition duration-200 bg-purple-600 rounded-lg shadow-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed">
            <div className="flex justify-end p-2">
              <Button
                onClick={() => setIsEditing((prev: boolean) => !prev)}
                disabled={isExecuting}
                className="px-4 py-2 text-sm font-medium text-white transition duration-200 bg-teal-500 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50"
                style={{ marginRight: "0.75rem" }} // Fallback gap
              >
                {isEditing ? (
                  <>
                    <SaveIcon sx={{ width: 16, height: 16, mr: 1 }} />
                    Save Changes
                  </>
                ) : (
                  <>
                    <EditIcon sx={{ width: 16, height: 16, mr: 1 }} />
                    Edit Plan
                  </>
                )}
              </Button>
              <Button
                onClick={onExecute}
                disabled={isExecuting || isEditing}
                className="px-4 py-2 text-sm font-bold text-white transition duration-200 bg-teal-500 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {isExecuting ? (
                  <>
                    <CircularProgress sx={{ width: 16, height: 16, mr: 1 }} />
                    Executing...
                  </>
                ) : (
                  <>
                    <PlayArrowIcon sx={{ width: 16, height: 16, mr: 1 }} />
                    Execute Plan
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Plan Steps List */}
        <div
          onDragLeave={() => setDragOverId(null)}
          onDrop={(e) => isEditing && handleDrop(e, dragOverId || "")}
        >
          {planSteps.map((step, index) => (
            <StepCard
              key={step.id}
              step={step}
              index={index}
              isEditing={isEditing}
              onUpdate={handleUpdateDescription}
              onStatusChange={handleUpdateStatus}
              onAgentChange={handleUpdateAgent}
              onDelete={handleDeleteStep}
              // Native D&D Props
              handleDragStart={handleDragStart}
              handleDragEnter={handleDragEnter}
              handleDragEnd={handleDragEnd}
              handleDragOver={handleDragOver}
              isDragging={draggingStepId === step.id}
              isOver={dragOverId === step.id}
              canDrag={!isExecuting} // Only allow drag when not executing
            />
          ))}
        </div>

        {isEditing && (
          <Button
            onClick={() =>
              setPlan((prev: any) => [
                ...prev,
                {
                  id: crypto.randomUUID(),
                  description: "New step description...",
                  agent: "Frontend",
                  status: "Pending",
                },
              ])
            }
            className="w-full py-3 mt-4 text-purple-400 border-2 border-dashed border-purple-800 rounded-lg hover:bg-purple-900/20 transition duration-150"
          >
            + Add New Step
          </Button>
        )}
      </div>
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
      {renderPlanTree(plan, isLoading, isEditing, isExecuting, setIsEditing)}
    </Box>
  );
}
