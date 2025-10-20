import { TextField, Button, Box } from "@mui/material";

interface TaskInputProps {
  objective: string;
  setObjective: (value: string) => void;
  onGenerate: () => void;
}

export default function TaskInput({
  objective,
  setObjective,
  onGenerate,
}: TaskInputProps) {
  return (
    <Box
      className="glass-card"
      sx={{ display: "flex", gap: 2, p: 3, mt: 3, mb: 4 }}
    >
      <TextField
        fullWidth
        label="Enter your coding objective"
        value={objective}
        onChange={(e) => setObjective(e.target.value)}
        variant="outlined"
        placeholder="e.g., Build a todo app with React"
        InputLabelProps={{ style: { color: "#cccccc" } }}
      />
      <Button variant="contained" onClick={onGenerate} size="large">
        🎯 Generate Plan
      </Button>
    </Box>
  );
}
