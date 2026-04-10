import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Info, X } from 'lucide-react';
import { cn } from '../../lib/utils';

function CardFlip({
  className,
  children,
  frontToolbarTitle,
  backToolbarTitle,
  ...props
}: React.ComponentProps<'div'> & {
  children: [React.ReactNode, React.ReactNode];
  frontToolbarTitle?: React.ReactNode;
  backToolbarTitle?: React.ReactNode;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [front, back] = React.Children.toArray(children);

  return (
    <div
      className={cn('relative w-full', className)}
      style={{ perspective: '1000px' }}
      {...props}
    >
      <motion.div
        className='relative w-full'
        initial={false}
        animate={{ rotateY: isFlipped ? -180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className='w-full'
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d',
          }}
        >
          <div className='flex w-full flex-col overflow-hidden rounded-2xl border border-gold-border bg-white/75 shadow-glass backdrop-blur-glass'>
            <div
              className={cn(
                'relative z-20 flex min-h-[2.75rem] shrink-0 items-center gap-2 border-b border-gold-border/50 px-3 py-2',
                frontToolbarTitle ? 'justify-between' : 'justify-end',
              )}
            >
              {frontToolbarTitle ? (
                <div className='min-w-0 flex-1 pr-1 text-left leading-tight'>
                  {frontToolbarTitle}
                </div>
              ) : null}
              <button
                type='button'
                onClick={() => setIsFlipped(true)}
                className='shrink-0 rounded-full p-2 text-espresso-soft transition-colors hover:bg-gold-tint hover:text-gold'
                aria-label='Show info'
                style={{
                  opacity: isFlipped ? 0 : 1,
                  pointerEvents: isFlipped ? 'none' : 'auto',
                  transition: 'opacity 0.3s',
                }}
              >
                <Info className='h-5 w-5' />
              </button>
            </div>
            <div className='relative min-h-0 w-full flex-1'>{front}</div>
          </div>
        </div>

        <div
          className='absolute inset-0 w-full'
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(-180deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          <div className='relative flex h-full min-h-0 w-full flex-col'>
            <div className='flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-gold-border bg-white/75 shadow-glass backdrop-blur-glass'>
              <div
                className={cn(
                  'relative z-20 flex min-h-[2.75rem] shrink-0 items-center gap-2 border-b border-gold-border/50 px-3 py-2',
                  backToolbarTitle ? 'justify-between' : 'justify-end',
                )}
              >
                {backToolbarTitle ? (
                  <div className='min-w-0 flex-1 pr-1 text-left leading-tight'>
                    {backToolbarTitle}
                  </div>
                ) : null}
                <button
                  type='button'
                  onClick={() => setIsFlipped(false)}
                  className='shrink-0 rounded-full p-2 text-espresso-soft transition-colors hover:bg-gold-tint hover:text-gold'
                  aria-label='Close'
                  style={{
                    opacity: isFlipped ? 1 : 0,
                    pointerEvents: isFlipped ? 'auto' : 'none',
                    transition: 'opacity 0.3s',
                  }}
                >
                  <X className='h-5 w-5' />
                </button>
              </div>
              <div className='relative min-h-0 flex-1 overflow-auto'>{back}</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function CardFlipFront({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card'
      className={cn(
        'flex flex-col gap-6 px-0 pb-6 pt-0 font-body text-espresso',
        className,
      )}
      {...props}
    />
  );
}

function CardFlipBack({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card'
      className={cn(
        'flex h-full min-h-0 flex-col gap-6 px-0 pb-6 pt-0 font-body text-espresso',
        className,
      )}
      {...props}
    />
  );
}

function CardFlipHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-header'
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
        className,
      )}
      {...props}
    />
  );
}

function CardFlipTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-title'
      className={cn('leading-none font-semibold', className)}
      {...props}
    />
  );
}

function CardFlipDescription({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-description'
      className={cn('text-sm text-espresso-soft', className)}
      {...props}
    />
  );
}

function CardFlipAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-action'
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className,
      )}
      {...props}
    />
  );
}

function CardFlipContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-content'
      className={cn('px-6', className)}
      {...props}
    />
  );
}

function CardFlipFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-footer'
      className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
      {...props}
    />
  );
}

export {
  CardFlip,
  CardFlipFront,
  CardFlipBack,
  CardFlipHeader,
  CardFlipFooter,
  CardFlipTitle,
  CardFlipAction,
  CardFlipDescription,
  CardFlipContent,
};
