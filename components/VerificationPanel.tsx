import { Box, Typography, List, ListItem, ListItemIcon, CheckCircle, Warning } from "@mui/icons-material";
import { green, orange } from "@mui/material/colors";

interface VerificationPanelProps {
  verification: { issues: string[]; strengths: string[] };
}

export default function VerificationPanel({ verification }: VerificationPanelProps) {
  return (
    <Box>
      <Typography variant="h6">Verification Results</Typography>
      <List>
        {verification.strengths.map((strength, i) => (
          <ListItem key={i}>
            <ListItemIcon><CheckCircle sx={{ color: green[500] }} /></ListItemIcon>
            {strength}
          </ListItem>
        ))}
        {verification.issues.map((issue, i) => (
          <ListItem key={i}>
            <ListItemIcon><Warning sx={{ color: orange[500] }} /></ListItemIcon>
            {issue}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}