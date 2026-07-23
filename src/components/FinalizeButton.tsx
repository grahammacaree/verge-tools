type Props = {
  state: 'ready' | 'capturing' | 'done';
  onClick: () => void;
  visible?: boolean;
  /** Extra class names (e.g. mosaic expects `button`). */
  className?: string;
};

/**
 * One-click capture + save.
 * Idle: "Download". Capturing: "Downloading …" (same span dance as legacy Finalize).
 */
export function FinalizeButton({
  state,
  onClick,
  visible = true,
  className = '',
}: Props) {
  if (!visible) return null;

  const capturing = state === 'capturing';
  const classes = ['download', 'active', 'visible', className, capturing ? 'downloading' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <a
      className={classes}
      onClick={(e) => {
        e.preventDefault();
        if (!capturing) onClick();
      }}
      href="#"
    >
      Downloa<span>d</span>
      <span>ding </span>
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </a>
  );
}
