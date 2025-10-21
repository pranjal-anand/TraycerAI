import { Box, Typography } from "@mui/material";

interface CodeViewerProps {
  code: string;
}

export default function CodeViewer({ code }: CodeViewerProps) {
  return (
    <Box className="glass-card gradient-border" sx={{ p: 3, mt: 3, mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, color: "#cb2d6f" }}>
        Generated Code
      </Typography>
      <pre>{code}</pre>
    </Box>
  );
}
