"use client";

import { useState } from "react";
import { Container, Box, Fade, Typography, Button } from "@mui/material";
import TaskInput from "@/components/TaskInput";
import PlanEditor from "@/components/PlanEditor";
import WorkflowStepper from "@/components/WorkflowStepper";
import CodeViewer from "@/components/CodeViewer";
import VerificationPanel from "@/components/VerificationPanel";
import { PlanItem } from "@/lib/types";
import { generatePlan } from "@/lib/mockLLM";

export default function Home() {
  const [objective, setObjective] = useState<string>("");
  const [plan, setPlan] = useState<PlanItem[]>([]);
  const [code, setCode] = useState<string>("");
  const [verification, setVerification] = useState<{
    issues: string[];
    strengths: string[];
  }>({ issues: [], strengths: [] });
  const [step, setStep] = useState<number>(0);

  const handleGeneratePlan = async () => {
    if (!objective) return;
    const generatedPlan = await generatePlan(objective);
    setPlan(generatedPlan);
    setStep(1); // Move to Edit Plan
  };

  const handleExecute = () => {
    setCode(
      `// Generated for: ${objective}\nconsole.log("✅ Plan executed successfully!");`
    );
    setStep(2); // Move to Generate Code
  };

  const handleVerify = () => {
    setVerification({
      issues: ["🔧 Minor: Add error handling"],
      strengths: [
        "✅ Clean architecture",
        "✅ Modular design",
        "✅ Best practices",
      ],
    });
    setStep(3); // Move to Verify
  };

  return (
    <Box sx={{ minHeight: "100vh", py: 6, position: "relative" }}>
      <Box
        className="gradient-border"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          opacity: 0.15,
        }}
      />

      <Container maxWidth="lg">
        <Fade in timeout={1000}>
          <Box className="glass-card" sx={{ p: 4, mb: 4 }}>
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  background: "linear-gradient(45deg, #cb2d6f, #14a098)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                PlanFirstCoder
              </Typography>
              <Typography variant="subtitle1" sx={{ color: "#cccccc", mt: 1 }}>
                Simplified Traycer AI • Plan-Driven AI Coding
              </Typography>
            </Box>

            <WorkflowStepper activeStep={step} />

            <TaskInput
              objective={objective}
              setObjective={setObjective}
              onGenerate={handleGeneratePlan}
            />

            {step >= 1 && (
              <Fade in timeout={800}>
                <Box>
                  <PlanEditor
                    plan={plan}
                    setPlan={setPlan}
                    onExecute={handleExecute}
                  />
                </Box>
              </Fade>
            )}

            {step >= 2 && (
              <Fade in timeout={800}>
                <Box>
                  <CodeViewer code={code} />
                  <Button
                    variant="contained"
                    onClick={handleVerify}
                    size="large"
                    fullWidth
                    sx={{
                      mt: 2,
                      bgcolor: "#14a098",
                      "&:hover": { bgcolor: "#cb2d6f" },
                    }}
                  >
                    ✅ Verify
                  </Button>
                </Box>
              </Fade>
            )}

            {step >= 3 && (
              <Fade in timeout={800}>
                <Box>
                  <VerificationPanel verification={verification} />
                </Box>
              </Fade>
            )}
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}
