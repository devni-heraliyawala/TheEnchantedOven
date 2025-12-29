'use client';

import { useEffect, useRef } from 'react';
import styles from './StorySection.module.css';

export default function StorySection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.visible);
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = sectionRef.current?.querySelectorAll(`.${styles.animate}`);
        elements?.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <section id="story" className={styles.section} ref={sectionRef}>
            <div className={styles.container}>
                <h2 className={`${styles.title} ${styles.animate}`}>Once Upon a Time...</h2>
                <div className={styles.content}>
                    <p className={`${styles.text} ${styles.animate}`}>
                        Once upon a time, there was a girl who didn’t just bake — she believed.
                    </p>
                    <p className={`${styles.text} ${styles.animate}`}>
                        She believed that warmth could heal, that sweetness could hold memories, and that an oven was more than a machine — it was a place where care, patience, and intention transformed into something meaningful.
                    </p>
                    <br />
                    <p className={`${styles.text} ${styles.animate}`}>
                        The Enchanted Oven was born from late nights, quiet mornings, flour-dusted hands, and a simple truth:
                        <br /><strong>the most beautiful things are made slowly, lovingly, and with heart.</strong>
                    </p>
                    <br />
                    <p className={`${styles.text} ${styles.animate}`}>
                        Every cake here tells a story.
                        <br />Every pastry carries a moment.
                        <br />Every order is treated as something personal — never just a product.
                    </p>
                    <br />
                    <p className={`${styles.text} ${styles.animate}`}>
                        This is where elegance meets emotion.
                        <br />Where imagination meets craft.
                        <br />Where every bake begins with a little magic ✨
                    </p>
                </div>
                <div className={`${styles.signature} ${styles.animate}`}>
                    With love & magic,<br />
                    The Enchanted Oven Team
                </div>
            </div>
        </section>
    );
}
