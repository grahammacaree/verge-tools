import type { ReactNode } from 'react';

type ToggleOption = {
  className: string;
  label: ReactNode;
};

type Props = {
  label: string;
  value: string;
  options: ToggleOption[];
  onChange: (className: string) => void;
  /** Extra root class(es) for tool CSS (e.g. `images`, `colors`, `ratios`). */
  className?: string;
};

export function ToggleGroup({ label, value, options, onChange, className }: Props) {
  return (
    <div className={['toggle-group', className].filter(Boolean).join(' ')}>
      <span className="label">{label}</span>
      {options.map((option) => (
        <div
          key={option.className}
          className={`entry toggle${value === option.className ? ' selected' : ''}`}
          onClick={() => onChange(option.className)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onChange(option.className);
          }}
        >
          <div className={`inner${value === option.className ? ' selected' : ''}`}>{option.label}</div>
        </div>
      ))}
    </div>
  );
}
