import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  onClick: () => void;
  label?: string;
}

export function BackButton({ onClick, label = "Retour" }: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors mb-4"
    >
      <ArrowLeft size={20} />
      {label}
    </button>
  );
}
