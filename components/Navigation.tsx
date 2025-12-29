'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingBag } from 'lucide-react';
import styles from './Navigation.module.css';

export default function Navigation() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                <Link href="/">
                    <span className={styles.logo}>The Enchanted Oven</span>
                </Link>

                {/* Mobile Toggle */}
                <div className={styles.mobileToggle} onClick={() => setMobileOpen(!mobileOpen)}>
                    {mobileOpen ? <X size={28} /> : <Menu size={28} />}
                </div>

                {/* Desktop & Mobile Menu */}
                <div className={`${styles.menu} ${mobileOpen ? styles.open : ''}`}>
                    <Link href="/" className={styles.link} onClick={() => setMobileOpen(false)}>
                        Home
                    </Link>
                    <Link href="#story" className={styles.link} onClick={() => setMobileOpen(false)}>
                        Our Story
                    </Link>
                    <Link href="#menu" className={styles.link} onClick={() => setMobileOpen(false)}>
                        Signature Menu
                    </Link>
                    <Link href="#gallery" className={styles.link} onClick={() => setMobileOpen(false)}>
                        Gallery
                    </Link>

                    <Link href="#cake-builder">
                        <button className={styles.cta}>
                            Design Your Cake
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
