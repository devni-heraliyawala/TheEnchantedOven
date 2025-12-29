'use client';

import { useEffect, useState } from 'react';

export default function FairyDust() {
    const [particles, setParticles] = useState<Array<{ id: number, x: number, y: number, size: number, duration: number, delay: number }>>([]);

    useEffect(() => {
        // Generate static initial particles to avoid hydration mismatch, then animate them
        const newParticles = Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100, // vw
            y: Math.random() * 100, // vh
            size: Math.random() * 4 + 2, // 2-6px
            duration: Math.random() * 10 + 10, // 10-20s float
            delay: Math.random() * 5,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 40, overflow: 'hidden' }}>
            {particles.map((p) => (
                <div
                    key={p.id}
                    style={{
                        position: 'absolute',
                        left: `${p.x}vw`,
                        top: `${p.y}vh`,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        borderRadius: '50%',
                        background: 'white',
                        boxShadow: `0 0 ${p.size * 2}px ${p.id % 3 === 0 ? '#D4AF37' : p.id % 3 === 1 ? '#E1BEE7' : '#8FBC8F'}`, // Gold, Orchid, Sea Green glow
                        opacity: 0.7,
                        animation: `float ${p.duration}s linear infinite`,
                        animationDelay: `-${p.delay}s`,
                    }}
                />
            ))}
            <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
        }
      `}</style>
        </div>
    );
}
