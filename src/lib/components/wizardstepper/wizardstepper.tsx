import React, { useState, useCallback } from "react";

export interface WizardStep {
  /** Unique identifier for the step */
  id: string;
  /** Step title shown in the indicator nav */
  title: string;
  /** Optional description rendered above the step content */
  description?: string;
  /** Content rendered in the main content area when this step is active */
  content: React.ReactNode;
  /** Optional async validation function; returning false (or throwing) blocks advancement */
  validate?: () => boolean | Promise<boolean>;
}

export interface WizardStepperProps {
  /** Ordered list of wizard steps */
  steps: WizardStep[];
  /** Controlled active step index (0-based) */
  currentStep?: number;
  /** Initial active step index for uncontrolled usage (default: 0) */
  defaultStep?: number;
  /** Callback fired with the new step index when navigation occurs */
  onStepChange?: (step: number) => void;
  /** Callback fired when the last step is successfully completed */
  onComplete?: () => void;
  /** Additional CSS class applied to the wizard wrapper */
  className?: string;
}

export const WizardStepper = React.forwardRef<HTMLDivElement, WizardStepperProps>(
  (
    {
      steps,
      currentStep,
      defaultStep = 0,
      onStepChange,
      onComplete,
      className,
    },
    ref
  ) => {
    const isControlled: boolean = currentStep !== undefined;
    const [internalStep, setInternalStep] = useState<number>(defaultStep);
    const [validating, setValidating] = useState<boolean>(false);
    const [stepErrors, setStepErrors] = useState<Set<number>>(new Set());
    const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

    const activeStep: number = isControlled ? currentStep! : internalStep;

    const setStep = useCallback(
      (next: number): void => {
        if (!isControlled) setInternalStep(next);
        onStepChange?.(next);
      },
      [isControlled, onStepChange]
    );

    const handleNext = useCallback(async (): Promise<void> => {
      const step: WizardStep = steps[activeStep];
      if (step.validate) {
        setValidating(true);
        try {
          const valid: boolean = await step.validate();
          if (!valid) {
            setStepErrors((prev) => new Set([...prev, activeStep]));
            setValidating(false);
            return;
          }
        } catch {
          setStepErrors((prev) => new Set([...prev, activeStep]));
          setValidating(false);
          return;
        }
        setValidating(false);
      }

      // Clear error for this step on success
      setStepErrors((prev) => {
        const next = new Set(prev);
        next.delete(activeStep);
        return next;
      });
      setCompletedSteps((prev) => new Set([...prev, activeStep]));

      if (activeStep === steps.length - 1) {
        onComplete?.();
      } else {
        setStep(activeStep + 1);
      }
    }, [activeStep, steps, onComplete, setStep]);

    const handlePrev = useCallback((): void => {
      if (activeStep > 0) setStep(activeStep - 1);
    }, [activeStep, setStep]);

    const isLast: boolean = activeStep === steps.length - 1;

    return (
      <div
        ref={ref}
        className={["jowa-wizard", className].filter(Boolean).join(" ")}
        aria-label="Wizard"
      >
        {/* Step indicators */}
        <nav className="jowa-wizard__steps" aria-label="Wizard steps">
          {steps.map((step, index) => {
            const isActive: boolean = index === activeStep;
            const isCompleted: boolean = completedSteps.has(index);
            const isError: boolean = stepErrors.has(index);
            const indicatorClasses: string = [
              "jowa-wizard__step-indicator",
              isActive ? "jowa-wizard__step-indicator--active" : "",
              isCompleted ? "jowa-wizard__step-indicator--completed" : "",
              isError ? "jowa-wizard__step-indicator--error" : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <React.Fragment key={step.id}>
                <div
                  className={indicatorClasses}
                  aria-current={isActive ? "step" : undefined}
                >
                  <div
                    className="jowa-wizard__step-number"
                    aria-label={`Step ${index + 1}: ${step.title}${isCompleted ? " (completed)" : isActive ? " (current)" : ""}`}
                  >
                    {isCompleted && !isError ? (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M2 7l3.5 3.5L12 3"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : isError ? (
                      "!"
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className="jowa-wizard__step-title">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={[
                      "jowa-wizard__step-connector",
                      isCompleted ? "jowa-wizard__step-connector--filled" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    aria-hidden="true"
                  />
                )}
              </React.Fragment>
            );
          })}
        </nav>

        {/* Step content */}
        <div className="jowa-wizard__content" role="region" aria-label={steps[activeStep]?.title}>
          {steps[activeStep]?.description && (
            <p className="jowa-wizard__step-description">{steps[activeStep].description}</p>
          )}
          {steps[activeStep]?.content}
        </div>

        {/* Navigation */}
        <div className="jowa-wizard__actions">
          <button
            type="button"
            className="jowa-wizard__btn-prev"
            onClick={handlePrev}
            disabled={activeStep === 0 || validating}
            aria-label="Previous step"
          >
            ← Previous
          </button>
          <button
            type="button"
            className="jowa-wizard__btn-next"
            onClick={handleNext}
            disabled={validating}
            aria-label={isLast ? "Complete wizard" : "Next step"}
          >
            {validating ? "Validating…" : isLast ? "Complete ✓" : "Next →"}
          </button>
        </div>
      </div>
    );
  }
);

WizardStepper.displayName = "WizardStepper";
