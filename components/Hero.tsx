'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            requestAnimationFrame(() => {
                setOffset(window.scrollY);
            });
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className={styles.hero}>
            <div
                className={styles.videoContainer}
                style={{ transform: `translateY(${offset * 0.5}px)` }} // Parallax effect
            >
                <video autoPlay loop muted playsInline className={styles.video} style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
                    {/* Sample Video from Mixkit - Cinematic Flour Dusting */}
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-sprinkling-flour-on-dough-slow-motion-3243-large.mp4" type="video/mp4" />
                </video>
                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(212, 140, 158, 0.1)' }} /> {/* Rose Gold Tint */}
            </div>
            <div className={styles.overlay} />

            <div className={styles.content}>
                <h1 className={styles.title}>The Enchanted Oven</h1>
                <p className={styles.subtitle}>Where Every Bake Begins with a Little Magic ✨</p>
                <Link href="#menu">
                    <button className={`${styles.ctaButton} shimmer-hover`}>Explore the Magic</button>
                </Link>
            </div>
        </section>
    );
}
