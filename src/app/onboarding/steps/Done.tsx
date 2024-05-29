import { StepProps } from '@/app/onboarding/StepProps';
import { useEffect } from 'react';
import Confetti from 'react-confetti';

function drawStar(ctx: any) {
  const numPoints = 5;
  const outerRadius = 15;
  const innerRadius = outerRadius / 2;
  ctx.beginPath();
  ctx.moveTo(0, 0 - outerRadius);

  for (let n = 1; n < numPoints * 2; n++) {
    const radius = n % 2 === 0 ? outerRadius : innerRadius;
    const x = radius * Math.sin((n * Math.PI) / numPoints);
    const y = -1 * radius * Math.cos((n * Math.PI) / numPoints);
    ctx.lineTo(x, y);
  }
  ctx.fill();
  ctx.closePath();
}

export default function Done(props: StepProps) {
  useEffect(() => {
    setTimeout(() => {
      console.log('Legal');
      props.onStepReady(props.currentStep, true);
    }, 1000);
  });

  return (
    <div>
      <Confetti drawShape={drawStar} numberOfPieces={500} recycle={false} />
    </div>
  );
}
