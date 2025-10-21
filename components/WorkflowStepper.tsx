import { Stepper, Step, StepLabel, StepConnector } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const customTheme = createTheme({
  components: {
    MuiStepConnector: {
      styleOverrides: {
        line: {
          borderColor: "#14a098",
          borderTopWidth: 4,
          borderRadius: 2,
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          color: "#501f3a",
          // Controls the icon border/circle color when active
          "&.Mui-active": { color: "#cb2d6f" },
          "&.Mui-completed": { color: "#14a098" },
          // Existing rule for default/inactive text color
          "& .MuiStepIcon-text": { fill: "#cccccc" },
        },
      },
    },
    // Overrides for StepLabel
    MuiStepLabel: {
      styleOverrides: {
        // style the label slot and use class selectors for active/completed states
        label: {
          color: "#cccccc",
          fontWeight: 500,
          "&.Mui-active": {
            color: "#cb2d6f",
            fontWeight: 600,
          },
          "&.Mui-completed": {
            color: "#14a098",
          },
        },
      },
    },
  },
});

const steps = ["Objective", "Plan", "Code", "Verify"];

export default function WorkflowStepper({
  activeStep,
}: {
  activeStep: number;
}) {
  return (
    <ThemeProvider theme={customTheme}>
      <Stepper
        activeStep={activeStep}
        sx={{ mb: 4, bgcolor: "transparent" }}
        connector={<StepConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </ThemeProvider>
  );
}
