import React, { useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';

const ScratchCard = ({ coverColor, onScratchComplete, imageSrc }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Fill canvas with cover color
    ctx.fillStyle = coverColor || '#ccc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let isDrawing = false;

    const startDrawing = (e) => {
      isDrawing = true;
      scratch(e);
    };

    const stopDrawing = () => {
      isDrawing = false;
      if (onScratchComplete) checkCompletion();
    };

    const scratch = (e) => {
      if (!isDrawing) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.touches ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
      const y = e.touches ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fill();
    };

    const checkCompletion = () => {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let scratchedPixels = 0;

      for (let i = 0; i < pixels.length; i += 4) {
        if (pixels[i + 3] === 0) scratchedPixels++; // Count fully transparent pixels
      }

      const scratchedPercentage = (scratchedPixels / (canvas.width * canvas.height)) * 100;

      if (scratchedPercentage > 50) {
        // Trigger confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });

        onScratchComplete();
      }
    };

    // Add event listeners
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', scratch);
    canvas.addEventListener('mouseup', stopDrawing);

    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', scratch);
    canvas.addEventListener('touchend', stopDrawing);

    return () => {
      // Cleanup event listeners
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', scratch);
      canvas.removeEventListener('mouseup', stopDrawing);

      canvas.removeEventListener('touchstart', startDrawing);
      canvas.removeEventListener('touchmove', scratch);
      canvas.removeEventListener('touchend', stopDrawing);
    };
  }, [coverColor, onScratchComplete]);

  return (
    <>
        <div ref={containerRef} className="card position-relative">
      {
        
      }
      <canvas ref={canvasRef} className="w-100 h-100 position-absolute top-0 start-0" style={{ zIndex: 1 }}>
      </canvas>
    </div>
    </>
  );

};

export default ScratchCard;


