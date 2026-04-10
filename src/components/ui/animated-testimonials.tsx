import React from 'react';

import { cn } from '../../lib/utils';
import './animated-testimonial.css';

export interface Testimonial {
  id?: string | number;
  name: string;
  image: string;
  description: string;
  handle: string;
}

interface AnimatedCanopyProps extends React.HTMLAttributes<HTMLDivElement> {
  vertical?: boolean;
  repeat?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  applyMask?: boolean;
}

const AnimatedCanopy = ({
  children,
  vertical = false,
  repeat = 4,
  pauseOnHover = false,
  reverse = false,
  className,
  applyMask = true,
  ...props
}: AnimatedCanopyProps) => (
  <div
    {...props}
    className={cn(
      'group relative flex h-full w-full overflow-hidden p-2 [--duration:10s] [--gap:12px] [gap:var(--gap)]',
      vertical ? 'flex-col' : 'flex-row',
      className,
    )}
  >
    {Array.from({ length: repeat }).map((_, stripIdx) => (
      <div
        key={`strip-${stripIdx}`}
        className={cn('flex shrink-0 [gap:var(--gap)]', {
          'group-hover:paused': pauseOnHover,
          'direction-reverse': reverse,
          'animate-canopy-horizontal flex-row': !vertical,
          'animate-canopy-vertical flex-col': vertical,
        })}
      >
        {React.Children.map(children, (child, i) =>
          React.isValidElement(child)
            ? React.cloneElement(child, {
                key: `${stripIdx}-${String(child.key ?? i)}`,
              } as { key?: string })
            : child,
        )}
      </div>
    ))}
    {applyMask && (
      <div
        className={cn(
          'pointer-events-none absolute inset-0 z-10 h-full w-full from-cream-mid/70 from-5% via-transparent via-50% to-cream-mid/70 to-95%',
          vertical ? 'bg-gradient-to-b' : 'bg-gradient-to-r',
        )}
      />
    )}
  </div>
);

const TestimonialCard = ({
  testimonial,
  className,
}: {
  testimonial: Testimonial;
  className?: string;
}) => (
  <div
    className={cn(
      'group mx-2 flex h-32 w-80 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-gold-border/40 bg-white/50 p-3 shadow-glass backdrop-blur-sm transition-all hover:border-gold hover:shadow-glass-hover',
      className,
    )}
  >
    <div className="flex items-start gap-3">
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-gold-border">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="not-prose h-full w-full object-cover"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0">
          <span className="font-body text-sm font-semibold text-espresso">
            {testimonial.name}
          </span>
          <span className="font-body text-xs text-espresso-soft">{testimonial.handle}</span>
        </div>
        <p className="mt-1 line-clamp-3 font-body text-sm leading-snug text-espresso-soft">
          {testimonial.description}
        </p>
      </div>
    </div>
  </div>
);

export const AnimatedTestimonials = ({
  data,
  className,
  cardClassName,
}: {
  data: Testimonial[];
  className?: string;
  cardClassName?: string;
}) => (
  <div className={cn('w-full overflow-x-hidden py-4', className)}>
    {[false, true, false].map((reverse, index) => (
      <AnimatedCanopy
        key={`canopy-${index}`}
        reverse={reverse}
        className="[--duration:25s]"
        pauseOnHover
        applyMask={false}
        repeat={3}
      >
        {data.map((testimonial) => (
          <TestimonialCard
            key={String(testimonial.id ?? testimonial.name)}
            testimonial={testimonial}
            className={cardClassName}
          />
        ))}
      </AnimatedCanopy>
    ))}
  </div>
);
