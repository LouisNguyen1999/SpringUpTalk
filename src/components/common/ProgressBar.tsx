interface ProgressBarProps { value: number; max?: number; label?: string }

export function ProgressBar({ value, max = 100, label }: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, max ? (value / max) * 100 : 0));
  return (
    <div className="progress-wrap">
      {label && <div className="progress-label"><span>{label}</span><b>{value} / {max}</b></div>}
      <div className="progress-track" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} aria-label={label}>
        <span style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
