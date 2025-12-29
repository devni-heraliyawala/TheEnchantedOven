import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import StorySection from '../components/StorySection';
import MenuGrid from '../components/MenuGrid';
import CakeBuilder from '../components/CakeBuilder';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';
import TextureOverlay from '../components/TextureOverlay';
import FairyDust from '../components/FairyDust';
import SoftFog from '../components/SoftFog';
import DreamDustCursor from '../components/DreamDustCursor';

export default function Home() {
  return (
    <main>
      <DreamDustCursor />
      <FairyDust />
      <SoftFog />
      <TextureOverlay />
      <Navigation />
      <Hero />
      <StorySection />
      <MenuGrid />
      <CakeBuilder />
      <Gallery />
      <Footer />
    </main>
  )
}
