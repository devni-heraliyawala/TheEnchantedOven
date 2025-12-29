import { Instagram, MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.brand}>
                    <h3 className={styles.logo}>The Enchanted Oven</h3>
                    <p className={styles.tagline}>Where Every Bake Begins with a Little Magic ✨</p>
                    <div className={styles.socials}>
                        <a href="#" className={styles.iconLink}><Instagram /></a>
                    </div>
                </div>

                <div className={styles.links}>
                    <h4>Quick Links</h4>
                    <ul>
                        <li><Link href="#menu">Menu</Link></li>
                        <li><Link href="#cake-builder">Custom Cakes</Link></li>
                        <li><Link href="#gallery">Gallery</Link></li>
                        <li><Link href="#story">Our Story</Link></li>
                    </ul>
                </div>

                <div className={styles.contact}>
                    <h4>Visit Us</h4>
                    <p><MapPin size={16} style={{ display: 'inline' }} /> 123 Baker Street, Sweet City</p>
                    <p><Phone size={16} style={{ display: 'inline' }} /> +1 234 567 890</p>
                    <p><Mail size={16} style={{ display: 'inline' }} /> magic@enchantedoven.com</p>

                    <div className={styles.mapPlaceholder}>
                        Google Map Placeholder
                    </div>
                </div>
            </div>
            <div className={styles.copyright}>
                © {new Date().getFullYear()} The Enchanted Oven. All rights reserved.
            </div>
        </footer>
    );
}
