'use client';

import { useState } from 'react';
import styles from './CakeBuilder.module.css';
import CakePreview from './CakePreview';
import { SHAPES, SIZES, FLAVORS, EXTRAS, FILLINGS } from '../../lib/cakeData';

export default function CakeBuilder() {
    const [shape, setShape] = useState(SHAPES[0].id);
    const [size, setSize] = useState(SIZES[0].id);
    const [flavor, setFlavor] = useState(FLAVORS[0].id);
    const [filling, setFilling] = useState(FILLINGS[0].id);
    const [extras, setExtras] = useState<string[]>([]);
    const [pickupDate, setPickupDate] = useState('');

    // Date Logic
    const getMinDate = () => {
        const date = new Date();
        date.setDate(date.getDate() + 3); // 3 days lead time
        return date.toISOString().split('T')[0];
    };

    // Calculation Logic
    const calculateTotal = () => {
        const selectedSize = SIZES.find(s => s.id === size);
        const selectedFlavor = FLAVORS.find(f => f.id === flavor);
        const selectedFilling = FILLINGS.find(f => f.id === filling);
        const selectedShape = SHAPES.find(s => s.id === shape);

        let total = selectedSize?.basePrice || 0;
        total += selectedFlavor?.price || 0;
        total += selectedFilling?.price || 0;

        // Extras
        extras.forEach(extraId => {
            const extra = EXTRAS.find(e => e.id === extraId);
            if (extra) total += extra.price;
        });

        // Shape Multiplier
        if (selectedShape) {
            total = Math.round(total * selectedShape.priceMultiplier);
        }

        return total;
    };

    const toggleExtra = (id: string) => {
        setExtras(prev =>
            prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
        );
    };

    const handleOrder = () => {
        if (!pickupDate) {
            alert('Please select a pickup date');
            return;
        }

        // WhatsApp Integration
        const phoneNumber = "1234567890"; // Replace with actual
        const message = `Hello! I'd like to order a Custom Cake for *${pickupDate}*:%0A
    - Shape: ${SHAPES.find(s => s.id === shape)?.label}%0A
    - Size: ${SIZES.find(s => s.id === size)?.label}%0A
    - Flavor: ${FLAVORS.find(s => s.id === flavor)?.label}%0A
    - Filling: ${FILLINGS.find(s => s.id === filling)?.label}%0A
    - Extras: ${extras.map(e => EXTRAS.find(ex => ex.id === e)?.label).join(', ') || 'None'}%0A
    %0AEstimated Price: $${calculateTotal()}`;

        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    };

    return (
        <section id="cake-builder" className={styles.section}>
            <h2 className={styles.heading}>Design Your Dream Cake</h2>
            <div className={styles.container}>
                {/* Controls */}
                <div className={styles.controls}>
                    {/* Shape */}
                    <div className={styles.fieldGroup}>
                        <label className={styles.label}>1. Select Shape</label>
                        <div className={styles.optionsGrid}>
                            {SHAPES.map(s => (
                                <button
                                    key={s.id}
                                    className={`${styles.optionButton} ${shape === s.id ? styles.selected : ''}`}
                                    onClick={() => setShape(s.id)}
                                >
                                    {s.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Size */}
                    <div className={styles.fieldGroup}>
                        <label className={styles.label}>2. Choose Size</label>
                        <div className={styles.optionsGrid}>
                            {SIZES.map(s => (
                                <button
                                    key={s.id}
                                    className={`${styles.optionButton} ${size === s.id ? styles.selected : ''}`}
                                    onClick={() => setSize(s.id)}
                                >
                                    <span>{s.label}</span>
                                    <span style={{ fontSize: '0.8em', color: '#888' }}>${s.basePrice}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Flavor */}
                    <div className={styles.fieldGroup}>
                        <label className={styles.label}>3. Pick Flavor</label>
                        <div className={styles.optionsGrid}>
                            {FLAVORS.map(f => (
                                <button
                                    key={f.id}
                                    className={`${styles.optionButton} ${flavor === f.id ? styles.selected : ''}`}
                                    onClick={() => setFlavor(f.id)}
                                >
                                    <span>{f.label}</span>
                                    {f.price > 0 && <span style={{ fontSize: '0.8em' }}>+${f.price}</span>}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Extras */}
                    <div className={styles.fieldGroup}>
                        <label className={styles.label}>4. Add Magic (Extras)</label>
                        <div className={styles.optionsGrid}>
                            {EXTRAS.map(e => (
                                <button
                                    key={e.id}
                                    className={`${styles.optionButton} ${extras.includes(e.id) ? styles.selected : ''}`}
                                    onClick={() => toggleExtra(e.id)}
                                >
                                    <span>{e.label}</span>
                                    <span style={{ fontSize: '0.8em' }}>+${e.price}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Date Picker */}
                    <div className={styles.fieldGroup}>
                        <label className={styles.label}>5. Pickup Date (Min 3 days notice)</label>
                        <input
                            type="date"
                            min={getMinDate()}
                            value={pickupDate}
                            onChange={(e) => setPickupDate(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                fontSize: '1rem',
                                fontFamily: 'var(--font-sans)',
                                border: '1px solid #eee',
                                borderRadius: '8px',
                                outline: 'none',
                                color: '#4A4A4A'
                            }}
                        />
                    </div>

                    {/* Price & Action */}
                    <div className={styles.priceDisplay}>
                        <span className={styles.totalLabel}>Estimated Price</span>
                        <div className={styles.totalPrice}>${calculateTotal()}</div>
                        <button className={styles.orderButton} onClick={handleOrder}>
                            Book on WhatsApp
                        </button>
                    </div>
                </div>

                {/* Live Preview */}
                <div className={styles.previewContainer}>
                    <CakePreview shape={shape} size={size} flavorId={flavor} extras={extras} />
                </div>
            </div>
        </section>
    );
}
