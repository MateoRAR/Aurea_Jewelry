import { motion } from 'framer-motion'

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  duration = 0.7,
  viewportAmount = 0.15,
}) {
  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration, ease: [0.22, 1, 0.36, 1], delay },
      }}
      viewport={{ once: true, amount: viewportAmount }}
    >
      {children}
    </motion.section>
  )
}
