import { motion } from 'framer-motion'

export default function GoldButton({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false,
}) {
  const base = 'relative overflow-hidden font-body font-medium tracking-wide px-6 py-3 rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-gold text-white hover:bg-gold-light',
    outline: 'border border-gold text-gold hover:bg-gold-tint bg-transparent',
    ghost: 'text-gold hover:bg-gold-tint bg-transparent',
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className={`${base} ${variants[variant]} ${className}`}
    >
      <motion.span
        className="absolute inset-0 bg-gold-shimmer bg-[length:200%_100%] pointer-events-none"
        initial={{ backgroundPosition: '-200% 0' }}
        whileHover={{ backgroundPosition: '200% 0' }}
        transition={{ duration: 0.6 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}
