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
          "&.Mui-active": { color: "#cb2d6f" },
          "&.Mui-completed": { color: "#14a098" },
          "& .MuiStepIcon-text": { fill: "#cccccc" },
        },
      },
    },
  },
});

const steps = ["🎯 Objective", "📋 Plan", "💻 Code", "✅ Verify"];

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
            <StepLabel
              sx={{
                "& .MuiStepLabel-label": { color: "#cccccc", fontWeight: 500 },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </ThemeProvider>
  );
}
