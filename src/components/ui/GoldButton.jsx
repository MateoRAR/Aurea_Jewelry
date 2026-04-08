export default function GoldButton({
  children,
  onClick,
  type = 'button',
  variant = 'dark', // kept for API compatibility, not used for styles
  className = '',
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      role="button"
      className={`button-glass font-body font-medium text-sm ${variant === 'clear' ? 'button-glass--clear' : ''} ${className}`}
    >
      {children}
    </button>
  )
}
