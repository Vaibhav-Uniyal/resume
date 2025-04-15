'use client';

import { DotSpinner } from 'ldrs/react';

interface LoaderProps {
  size?: string;
  color?: string;
  speed?: string;
  fullScreen?: boolean;
}

export default function Loader({ 
  size = "40", 
  color = "#7d59f9", // paris-m-500
  speed = "0.9",
  fullScreen = false 
}: LoaderProps) {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-paris-m-50/80 backdrop-blur-sm z-50">
        <DotSpinner
          size={size}
          speed={speed}
          color={color}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4">
      <DotSpinner
        size={size}
        speed={speed}
        color={color}
      />
    </div>
  );
} 