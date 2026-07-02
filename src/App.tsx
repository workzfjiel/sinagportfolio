import { MotionConfig } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About';
import Stats from './components/Stats';
import Services from './components/Services';
import Process from './components/Process';
import Projects from './components/Projects/Projects';
import Credentials from './components/Credentials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import FloatingNav from './components/FloatingNav';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Cursor />
      <FloatingNav />
      <main className="bg-black min-h-screen">
        <Hero />
        <About />
        <Stats />
        <Services />
        <Process />
        <Projects />
        <Credentials />
        <Contact />
        <Footer />
      </main>
    </MotionConfig>
  );
}
