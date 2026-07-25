import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  label?: string;
}

export function LoadingSpinner({ label = "Chargement..." }: LoadingSpinnerProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3">
      <Loader2 className="animate-spin text-sky-400" size={32} />
      <p className="text-slate-400">{label}</p>
    </div>
  );
}
