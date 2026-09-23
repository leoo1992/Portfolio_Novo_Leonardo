'use client';

import { useRef, type PointerEvent, type ReactNode } from 'react';

export function TiltSurface({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch' || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    ref.current.style.setProperty('--tilt-x', \`\${(-y * 10).toFixed(2)}deg\`);
    ref.current.style.setProperty('--tilt-y', \`\${(x * 12).toFixed(2)}deg\`);
    ref.current.style.setProperty('--glow-x', \`\${((x + 0.5) * 100).toFixed(1)}%\`);
    ref.current.style.setProperty('--glow-y', \`\${((y + 0.5) * 100).toFixed(1)}%\`);
  };

  const reset = () => {
    ref.current?.style.setProperty('--tilt-x', '0deg');
    ref.current?.style.setProperty('--tilt-y', '0deg');
    ref.current?.style.setProperty('--glow-x', '50%');
    ref.current?.style.setProperty('--glow-y', '50%');
  };

  return (
    <div
      ref={ref}
      className={\`tilt-surface \${className}\`.trim()}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      {children}
    </div>
  );
}
