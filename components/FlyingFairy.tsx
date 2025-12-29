'use client';

import { useEffect, useState, useRef } from 'react';

export default function FlyingFairy() {
    const [position, setPosition] = useState({ x: -10, y: 50 });
    const [direction, setDirection] = useState(1); // 1 = right, -1 = left
    const requestRef = useRef<number>();
    const timeRef = useRef<number>(0);

    useEffect(() => {
        const animate = (time: number) => {
            timeRef.current = time * 0.001; // Seconds

            // Lissajous curve for natural flight
            const x = (Math.sin(timeRef.current * 0.5) * 45) + 50; // 5% to 95% width
            const y = (Math.cos(timeRef.current * 1.5) * 20) + 40 + (Math.sin(timeRef.current * 0.2) * 20); // Varying height

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
                filter: 'drop-shadow(0 0 15px gold)',
                // In a real app we'd use Next/Image but for absolute positioning/animation div background is often smoother or simple img tag
            }}>
                <img src="/images/fairy-sprite.png" alt="Fairy" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
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
