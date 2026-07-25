import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6">
      <AlertCircle size={32} className="text-rose-400" />
      <p className="text-rose-400 text-center max-w-md">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl font-semibold transition-colors"
        >
          Réessayer
        </button>
      )}
    </div>
  );
}
