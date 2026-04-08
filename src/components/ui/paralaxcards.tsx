import * as React from 'react';

interface ParallaxCard {
  content: React.ReactNode;
  className?: string;
}

interface ParallaxCardsProps {
  cards?: ParallaxCard[];
}

export default function ParallaxCards({ cards = [] }: ParallaxCardsProps) {
  const cardCount = cards.length;

  return (
    <section className='relative w-full'>
      <div className='relative' style={{ height: `${Math.max(cardCount, 1) * 100}vh` }}>
        {cards.map((card, index) => (
          <div key={index} className='sticky top-0 h-screen w-full'>
            <div className={`h-full w-full ${card.className ?? ''}`}>{card.content}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
