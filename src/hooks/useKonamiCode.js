import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

const konamiCode = [
  'ArrowUp', 'ArrowUp', 
  'ArrowDown', 'ArrowDown', 
  'ArrowLeft', 'ArrowRight', 
  'ArrowLeft', 'ArrowRight', 
  'b', 'a'
];

export const useKonamiCode = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === konamiCode[index]) {
        const nextIndex = index + 1;
        if (nextIndex === konamiCode.length) {
          // Success!
          triggerSuccess();
          setIndex(0);
        } else {
          setIndex(nextIndex);
        }
      } else {
        setIndex(0); // Reset if wrong key
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [index]);

  const triggerSuccess = () => {
    // Massive Confetti Blast
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FCA311', '#1F4E56', '#ffffff']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FCA311', '#1F4E56', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());

    alert("🤓 YOU FOUND THE SECRET DEV MODE! 🤓");
  };
};