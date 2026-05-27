import React from "react";

export type StepStatus = "completed" | "active" | "pending" | "error";

export interface StepperStep {
  /** Unique identifier for the step */
  id: string;
  /** Step label displayed below the step indicator */
  label: string;
  /** Optional secondary description shown below the label */
  description?: string;
  /** Explicit status override; derived from activeStep when omitted */
  status?: StepStatus;
}

export interface StepperProps {
  /** Ordered list of steps to render */
  steps: StepperStep[];
  /** Zero-based index of the currently active step (default: 0) */
  activeStep?: number;
  /** Layout direction of the step list (default: "horizontal") */
  orientation?: "horizontal" | "vertical";
  /** Additional CSS class applied to the ordered list */
  className?: string;
}

function deriveStatus(
  step: StepperStep,
  index: number,
  activeStep: number
): StepStatus {
  if (step.status) return step.status;
  if (index < activeStep) return "completed";
  if (index === activeStep) return "active";
  return "pending";
}

function StepIcon({ status }: { status: StepStatus; index: number }): React.ReactElement {
  if (status === "completed") return <span aria-hidden="true">✓</span>;
  if (status === "error") return <span aria-hidden="true">✕</span>;
  return <></>;
}

export const Stepper = React.forwardRef<HTMLOListElement, StepperProps>(
  ({ steps, activeStep = 0, orientation = "horizontal", className = "" }, ref) => {
    const classes: string = [
      "jowa-stepper",
      orientation === "vertical" ? "jowa-stepper--vertical" : "jowa-stepper--horizontal",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <ol ref={ref} className={classes} aria-label="Progress steps">
        {steps.map((step, index) => {
          const status: StepStatus = deriveStatus(step, index, activeStep);
          const isLast: boolean = index === steps.length - 1;

          const stepClasses: string = [
            "jowa-stepper-step",
            `jowa-stepper-step--${status}`,
          ].join(" ");

          return (
            <li key={step.id} className={stepClasses} aria-current={status === "active" ? "step" : undefined}>
              <div className="jowa-stepper-step-inner">
                <div className="jowa-stepper-circle" aria-label={`Step ${index + 1}: ${step.label} — ${status}`}>
                  <StepIcon status={status} index={index} />
                  {status !== "completed" && status !== "error" && (
                    <span aria-hidden="true">{index + 1}</span>
                  )}
                </div>
                {!isLast && (
                  <div
                    className={`jowa-stepper-connector${status === "completed" ? " jowa-stepper-connector--filled" : ""}`}
                    aria-hidden="true"
                  />
                )}
              </div>
              <div className="jowa-stepper-content">
                <span className="jowa-stepper-label">{step.label}</span>
                {step.description && (
                  <span className="jowa-stepper-description">{step.description}</span>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    );
  }
);

Stepper.displayName = "Stepper";
