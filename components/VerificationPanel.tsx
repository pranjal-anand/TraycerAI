import { Box, Typography, List, ListItem, ListItemIcon } from "@mui/material";
import { CheckCircle, Warning } from "@mui/icons-material";

interface VerificationPanelProps {
  verification: { issues: string[]; strengths: string[] };
}

export default function VerificationPanel({
  verification,
}: VerificationPanelProps) {
  return (
    <Box className="glass-card" sx={{ p: 3, mt: 3, mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, color: "#cb2d6f" }}>
        ✅ Verification Results
      </Typography>
      <List>
        {verification.strengths.map((strength, i) => (
          <ListItem key={i}>
            <ListItemIcon>
              <CheckCircle sx={{ color: "#14a098" }} />
            </ListItemIcon>
            <Typography sx={{ color: "#cccccc" }}>{strength}</Typography>
          </ListItem>
        ))}
        {verification.issues.map((issue, i) => (
          <ListItem key={i}>
            <ListItemIcon>
              <Warning sx={{ color: "#cb2d6f" }} />
            </ListItemIcon>
            <Typography sx={{ color: "#cccccc" }}>{issue}</Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
