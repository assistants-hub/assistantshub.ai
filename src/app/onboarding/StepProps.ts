export interface StepProps {
  currentStep: number;
  onStepReady: (step: number, isReady: boolean) => any;
}
