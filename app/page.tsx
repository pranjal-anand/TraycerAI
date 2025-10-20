"use client";

import { useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import TaskInput from "../components/TaskInput";
import PlanEditor from "../components/PlanEditor";
import WorkflowStepper from "../components/WorkflowStepper";
import CodeViewer from "../components/CodeViewer";
import VerificationPanel from "../components/VerificationPanel";
import { PlanItem } from "../lib/types";
import { generatePlan } from "../lib/mockLLM";

export default function Home() {
  const [objective, setObjective] = useState<string>("");
  const [plan, setPlan] = useState<PlanItem[]>([]);
  const [code, setCode] = useState<string>("");
  const [verification, setVerification] = useState<{ issues: string[]; strengths: string[] }>({ issues: [], strengths: [] });
  const [step, setStep] = useState<number>(0);

  const handleGeneratePlan = async () => {
    if (!objective) return;
    // Bonus: LLM integration (mocked; replace with real API call)
    const generatedPlan = await generatePlan(objective);
    setPlan(generatedPlan);
    setStep(1);
  };

  const handleExecute = () => {
    // Simulate hand-off to coding agent
    setCode(`// Simulated code for: ${objective}\nconsole.log("Executed plan");`);
    setStep(2);
  };

  const handleVerify = () => {
    // Simulate verification
    setVerification({
      issues: ["Minor: Missing import"],
      strengths: ["Clean structure", "Efficient logic"],
    });
    setStep(3);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          PlanFirstCoder: Simplified Planning Layer
        </Typography>
        <WorkflowStepper activeStep={step} />
        <TaskInput
          objective={objective}
          setObjective={setObjective}
          onGenerate={handleGeneratePlan}
        />
        {step >= 1 && (
          <PlanEditor plan={plan} setPlan={setPlan} onExecute={handleExecute} />
        )}
        {step >= 2 && <CodeViewer code={code} />}
        {step >= 3 && <VerificationPanel verification={verification} />}
      </Box>
    </Container>
  );
}