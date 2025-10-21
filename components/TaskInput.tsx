import {
  TextField,
  Button,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import AutoAwesome from "@mui/icons-material/AutoAwesome";

interface TaskInputProps {
  objective: string;
  setObjective: (value: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
  isExecuting: boolean;
}

export default function TaskInput({
  objective,
  setObjective,
  onGenerate,
  isLoading,
  isExecuting,
}: TaskInputProps) {
  return (
    <>
      <Box className="glass-card" sx={{ p: 2 }}>
        <Typography
          variant="h5"
          className="text-white"
          sx={{ color: "#cccccc", mb: 2, fontWeight: "bold" }}
        >
          1. High-Level Goal
        </Typography>
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
          <TextField
            fullWidth
            multiline
            label="Enter your coding objective"
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            variant="outlined"
            placeholder="e.g., Build a todo app with React"
            InputLabelProps={{ style: { color: "#cccccc" } }}
            className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-lg transition duration-150 resize-none"
            disabled={isLoading || isExecuting}
          />
          <Button
            variant="contained"
            onClick={onGenerate}
            disabled={isLoading || isExecuting || !objective.trim()}
            className="w-full mt-4 py-3 text-lg font-bold text-white transition duration-200 rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading && (
              <CircularProgress size={20} color="inherit" className="mr-2" />
            )}
            Generate Initial Plan
          </Button>
        </Box>
      </Box>
    </>
  );
}
