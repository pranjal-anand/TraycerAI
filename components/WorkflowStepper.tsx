import { Stepper, Step, StepLabel } from "@mui/material";

const steps = ["Input Objective", "Edit Plan", "Generate Code", "Verify"];

interface WorkflowStepperProps {
  activeStep: number;
}

export default function WorkflowStepper({ activeStep }: WorkflowStepperProps) {
  return (
    <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}