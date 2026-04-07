export default function GlassCard({ children, className = '', onClick, hoverable = false }) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white/60 backdrop-blur-glass border border-gold-border rounded-2xl shadow-glass
        ${hoverable ? 'hover:bg-white/75 hover:shadow-glass-hover transition-all duration-300 cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
