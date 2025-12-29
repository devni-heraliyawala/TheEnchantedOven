'use client';

import { useEffect, useRef } from 'react';
import styles from './MenuGrid.module.css';

const ITEMS = [
    { id: 1, name: 'Velvet Dream Cake', description: 'Rich red velvet with cream cheese frosting', tag: 'Best Seller', image: '/images/velvet-cake.png' },
    { id: 2, name: 'Golden Macarons', description: 'Assorted flavors with gold dust finish', tag: 'New', image: '/images/gold-macarons.png' },
    { id: 3, name: 'Fairy Dust Cupcakes', description: 'Vanilla sponge with pastel buttercream', tag: 'Kids Favorite', image: '/images/fairy-cupcakes.png' },
    { id: 4, name: 'Royal Wedding Tier', description: 'Elegant white tier cake with floral accents', tag: 'Premium', image: '/images/wedding-cake.png' },
];

export default function MenuGrid() {
    const gridRef = useRef<HTMLDivElement>(null);

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

        const cards = gridRef.current?.querySelectorAll(`.${styles.card}`);
        cards?.forEach((card) => observer.observe(card));

        return () => observer.disconnect();
    }, []);

    return (
        <section id="menu" className={styles.section}>
            <h2 className={styles.heading}>Signature Creations</h2>
            <div className={styles.grid} ref={gridRef}>
                {ITEMS.map((item, index) => (
                    <div key={item.id} className={`${styles.card} shimmer-hover`} style={{ transitionDelay: `${index * 100}ms` }}>
                        <div className={styles.imagePlaceholder}>
                            <img src={item.image} alt={item.name} className={styles.menuImage} />
                        </div>
                        <div className={styles.content}>
                            <span className={styles.tag}>{item.tag}</span>
                            <h3 className={styles.name}>{item.name}</h3>
                            <p className={styles.description}>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
