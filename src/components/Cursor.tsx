import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const INTERACTIVE = 'a, button, [data-hover], input, select, textarea, label';

function useFinePointer() {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    setFine(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setFine(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return fine;
}

export default function Cursor() {
  const finePointer = useFinePointer();
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const ringX = useSpring(dotX, { stiffness: 130, damping: 20, mass: 0.4 });
  const ringY = useSpring(dotY, { stiffness: 130, damping: 20, mass: 0.4 });

  useEffect(() => {
    if (!finePointer) return;

    const onMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      setVisible(true);
      // Delegated hover check — survives DOM changes without re-attaching listeners
      const target = e.target as Element | null;
      setHovering(!!target?.closest?.(INTERACTIVE));
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, [finePointer, dotX, dotY]);

  if (!finePointer) return null;

  return (
    <>
      {/* Dot — instant. mix-blend-difference inverts against any background,
          so it stays visible on both the black and light sections */}
      <motion.div
        aria-hidden
        className="fixed pointer-events-none z-[9999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: hovering ? 8 : 5,
          height: hovering ? 8 : 5,
          background: '#fff',
          mixBlendMode: 'difference',
          opacity: visible ? 1 : 0,
          transition: 'width 0.2s, height 0.2s, opacity 0.3s',
        }}
      />

      {/* Ring — spring lag */}
      <motion.div
        aria-hidden
        className="fixed pointer-events-none z-[9998] rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: hovering ? 44 : 26,
          height: hovering ? 44 : 26,
          border: `1px solid rgba(255, 255, 255, ${hovering ? 0.85 : 0.55})`,
          mixBlendMode: 'difference',
          opacity: visible ? 1 : 0,
          transition: 'width 0.25s cubic-bezier(0.22,1,0.36,1), height 0.25s cubic-bezier(0.22,1,0.36,1), border-color 0.2s, opacity 0.3s',
        }}
      />
    </>
  );
}
