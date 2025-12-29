'use client';

import { useEffect, useState, useRef } from 'react';

interface Particle {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    size: number;
    color: string;
}

export default function DreamDustCursor() {
    const [isMobile, setIsMobile] = useState(false);
    const cursorRef = useRef<{ x: number, y: number }>({ x: -100, y: -100 });
    const followerRef = useRef<{ x: number, y: number }>({ x: -100, y: -100 });
    const particlesRef = useRef<Particle[]>([]);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameRef = useRef<number>();

    useEffect(() => {
        if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
            setIsMobile(true);
            return;
        }

        const mouseMove = (e: MouseEvent) => {
            cursorRef.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('mousemove', mouseMove);

        // Initial follower pos
        followerRef.current = { x: -100, y: -100 };

        const colors = ['#FFFFFF', '#FFD700', '#FF8C00', '#FDF5E6']; // Sugar White, Golden Crust, Warm Amber, Cream

        const update = () => {
            if (!canvasRef.current) return;
            const ctx = canvasRef.current.getContext('2d');
            if (!ctx) return;

            // Resize canvas if needed
            if (canvasRef.current.width !== window.innerWidth || canvasRef.current.height !== window.innerHeight) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
            }

            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            // Smooth follower logic (Lag)
            const dx = cursorRef.current.x - followerRef.current.x;
            const dy = cursorRef.current.y - followerRef.current.y;

            // If cursor hasn't moved yet (initial state), snap to it
            if (followerRef.current.x === -100) {
                followerRef.current.x = cursorRef.current.x;
                followerRef.current.y = cursorRef.current.y;
            } else {
                followerRef.current.x += dx * 0.15; // Smooth factor
                followerRef.current.y += dy * 0.15;
            }

            // Draw Follower Glow
            const glowGradient = ctx.createRadialGradient(
                followerRef.current.x, followerRef.current.y, 0,
                followerRef.current.x, followerRef.current.y, 20
            );
            glowGradient.addColorStop(0, 'rgba(255, 215, 0, 0.4)');
            glowGradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
            ctx.fillStyle = glowGradient;
            ctx.beginPath();
            ctx.arc(followerRef.current.x, followerRef.current.y, 20, 0, Math.PI * 2);
            ctx.fill();


            // Add new particles based on movement
            const speed = Math.sqrt(dx * dx + dy * dy);
            if (speed > 1) {
                for (let i = 0; i < Math.min(speed * 0.2, 3); i++) { // Adaptive emission based on speed
                    const angle = Math.random() * Math.PI * 2;
                    const size = Math.random() * 2 + 1; // Finer particles (1-3px)
                    particlesRef.current.push({
                        id: Math.random(),
                        x: followerRef.current.x + (Math.random() - 0.5) * 10,
                        y: followerRef.current.y + (Math.random() - 0.5) * 10,
                        vx: (Math.cos(angle) * 0.5) + (Math.random() - 0.5) * 0.5,
                        vy: (Math.sin(angle) * 0.5) + (Math.random() - 0.5) * 0.5,
                        life: 1.0,
                        size: size,
                        color: colors[Math.floor(Math.random() * colors.length)]
                    });
                }
            }

            // Update and Draw Particles
            particlesRef.current.forEach((p, index) => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.02; // Gravity
                p.life -= 0.02; // Decay
                p.size *= 0.96; // Shrink

                if (p.life <= 0) {
                    particlesRef.current.splice(index, 1);
                    return;
                }

                ctx.fillStyle = `${p.color}${p.life})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameRef.current = requestAnimationFrame(update);
        };

        update();

        return () => {
            window.removeEventListener('mousemove', mouseMove);
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        };
    }, []);

    if (isMobile) return null;

    return (
        <>
            <canvas
                ref={canvasRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    pointerEvents: 'none',
                    zIndex: 9999,
                    mixBlendMode: 'screen'
                }}
            />
            <style jsx global>{`
        body {
          cursor: none; /* Hide default cursor */
        }
        /* Ensure cursor is visible on interactive elements if preferred, or keep hidden for total immersion */
        a, button, input, select, textarea {
          cursor: none; 
        }
      `}</style>
        </>
    );
}
