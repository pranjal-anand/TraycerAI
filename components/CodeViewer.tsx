import { Box, Typography, Paper } from "@mui/material";

interface CodeViewerProps {
  code: string;
}

export default function CodeViewer({ code }: CodeViewerProps) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6">Generated Code</Typography>
      <Paper elevation={3} sx={{ p: 2, bgcolor: "grey.100" }}>
        <pre>{code}</pre>
      </Paper>
    </Box>
  );
}