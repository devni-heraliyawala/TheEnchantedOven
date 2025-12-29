'use client';

import { useEffect, useState, useRef } from 'react';

export default function FlyingFairy() {
    const [position, setPosition] = useState({ x: -10, y: 50 });
    const [direction, setDirection] = useState(1); // 1 = right, -1 = left
    const requestRef = useRef<number>();
    const timeRef = useRef<number>(0);

    useEffect(() => {
        const animate = (time: number) => {
            timeRef.current = time * 0.0001; // Goldilocks speed: not too fast, not too slow

            // Lissajous curve for natural flight
            const x = (Math.sin(timeRef.current * 0.5) * 45) + 50;
            const y = (Math.cos(timeRef.current * 1.5) * 20) + 40 + (Math.sin(timeRef.current * 0.2) * 20);

            // Determine direction for sprite flipping
            const prevX = position.x;
            if (x > prevX) setDirection(1);
            if (x < prevX) setDirection(-1);

            setPosition({ x, y });
            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current!);
    }, []);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 50,
            overflow: 'hidden'
        }}>
            {/* The Fairy */}
            <div style={{
                position: 'absolute',
                left: `${position.x}%`,
                top: `${position.y}%`,
                width: '60px',
                height: '60px',
                transform: `translate(-50%, -50%) scaleX(${direction})`,
                transition: 'transform 0.2s',
                // CSS Masking to turn black pixels transparent
                WebkitMaskImage: 'url(/images/fairy-sprite.png)',
                maskImage: 'url(/images/fairy-sprite.png)',
                WebkitMaskMode: 'luminance',
                maskMode: 'luminance',
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                backgroundColor: '#FFD700', // Solid gold color for the fairy body
            }}>
                {/* Empty div because we are using background color + mask */}
            </div>

            {/* Trailing Fireflies (Simulated with CSS) */}
            <div style={{
                position: 'absolute',
                left: `${position.x - (direction * 2)}%`, // Trail behind
                top: `${position.y}%`,
                width: '10px',
                height: '10px',
                boxShadow: '0 0 20px 10px rgba(255, 215, 0, 0.6)',
                borderRadius: '50%',
                opacity: 0.6,
                transform: 'scale(1.5)',
                filter: 'blur(5px)',
                transition: 'all 0.1s linear'
            }} />
        </div>
    );
}
