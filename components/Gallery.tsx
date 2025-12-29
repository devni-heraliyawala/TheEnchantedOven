'use client';

import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import Image from 'next/image';
import styles from './Gallery.module.css';

// Premium Bakery Images (Locally Generated Enchanted Collection)
const GALLERY_ITEMS = [
    { id: 1, src: '/images/fairy-croissant.png', alt: 'Fairy-Dust Croissants - Flaky & Golden', title: 'Fairy-Dust Croissants' },
    { id: 2, src: '/images/moonlight-eclair.png', alt: 'Moonlight Éclairs with Starry Chocolate', title: 'Moonlight Éclairs' },
    { id: 3, src: '/images/spellbound-cookies.png', alt: 'Spellbound Sugar Cookies - Enchanted Shapes', title: 'Spellbound Cookies' },
    { id: 4, src: '/images/boutique-cheesecake.png', alt: 'Mini Boutique Cheesecakes with Flowers', title: 'Garden Cheesecakes' },
    { id: 5, src: '/images/artisan-sourdough.png', alt: 'Rustic Artisan Sourdough Loaves', title: 'Artisan Sourdough' },
    { id: 6, src: '/images/magic-cocoa.png', alt: 'Magical Hot Chocolate with Marshmallows', title: 'Enchanted Cocoa' },
];

export default function Gallery() {
    const [selectedItem, setSelectedItem] = useState<number | null>(null);

    const selectedImage = GALLERY_ITEMS.find(i => i.id === selectedItem);

    return (
        <section id="gallery" className={styles.section}>
            <div className={styles.header}>
                <h2 className={styles.heading}>Our Magical Creations</h2>
                <p className={styles.subheading}>A glimpse into our world of sweet enchantment</p>
            </div>

            <div className={styles.grid}>
                {GALLERY_ITEMS.map((item) => (
                    <div
                        key={item.id}
                        className={`${styles.gridItem} shimmer-hover`}
                        onClick={() => setSelectedItem(item.id)}
                    >
                        <div className={styles.imageWrapper}>
                            <img
                                src={item.src}
                                alt={item.alt}
                                className={styles.image}
                                loading="lazy"
                            />
                        </div>
                        <div className={styles.overlay}>
                            <ZoomIn className={styles.zoomIcon} />
                            <span className={styles.itemTitle}>{item.title}</span>
                            <span className={styles.viewText}>Discover</span>
                        </div>
                    </div>
                ))}
            </div>

            {selectedItem && selectedImage && (
                <div className={styles.lightbox} onClick={() => setSelectedItem(null)}>
                    <button className={styles.closeButton} onClick={() => setSelectedItem(null)}>
                        <X size={32} />
                    </button>
                    <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
                        <img
                            src={selectedImage.src}
                            alt={selectedImage.alt}
                            className={styles.lightboxImage}
                        />
                    </div>
                </div>
            )}
        </section>
    );
}
