import { cn } from "@/lib/utils";

interface PageBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export function PageBackground({ children, className }: PageBackgroundProps) {
  return (
    <div className={cn(
      "min-h-screen bg-gradient-to-b from-blue-100 via-white to-purple-100",
      className
    )}>
      {children}
    </div>
  );
} 