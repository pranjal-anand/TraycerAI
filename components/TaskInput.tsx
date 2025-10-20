import { TextField, Button, Box } from "@mui/material";

interface TaskInputProps {
  objective: string;
  setObjective: (value: string) => void;
  onGenerate: () => void;
}

export default function TaskInput({ objective, setObjective, onGenerate }: TaskInputProps) {
  return (
    <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
      <TextField
        fullWidth
        label="Enter your coding objective"
        value={objective}
        onChange={(e) => setObjective(e.target.value)}
        variant="outlined"
      />
      <Button variant="contained" onClick={onGenerate}>
        Generate Plan
      </Button>
    </Box>
  );
}