"use client";

import { useEffect, useState } from "react";

interface SparkleProps {
  startX: number;
  startY: number;
  duration: number;
}

interface SparklePropsWithDimensions extends SparkleProps {
  screenWidth: number;
  screenHeight: number;
}

function Sparkle({ startX, startY, duration, screenWidth, screenHeight }: SparklePropsWithDimensions) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [opacity, setOpacity] = useState(0.3);

  useEffect(() => {
    const movementRangeX = screenWidth * 0.8;
    const movementRangeY = screenHeight * 0.8;
    const randomX = (Math.random() - 0.5) * movementRangeX;
    const randomY = (Math.random() - 0.5) * movementRangeY;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = (elapsed % duration) / duration;

      const x = Math.sin(progress * Math.PI * 2) * randomX;
      const y = Math.sin((progress * Math.PI * 2) + Math.PI / 2) * randomY;
      setPosition({ x, y });
      setRotation(progress * 360 * 2);
      setOpacity(0.3 + Math.sin(progress * Math.PI * 2) * 0.4);

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [duration, screenWidth, screenHeight]);

  return (
    <span
      style={{
        position: "absolute",
        left: `${startX}px`,
        top: `${startY}px`,
        fontSize: "72px",
        transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`,
        opacity: opacity,
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      ✨
    </span>
  );
}

export function AnimatedBackground() {
  const [sparkles, setSparkles] = useState<SparkleProps[]>([]);
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    const newSparkles: SparkleProps[] = [];
    for (let i = 0; i < 8; i++) {
      newSparkles.push({
        startX: Math.random() * dimensions.width,
        startY: Math.random() * dimensions.height,
        duration: 4000 + Math.random() * 3000,
      });
    }
    setSparkles(newSparkles);
  }, [dimensions.width, dimensions.height]);

  return (
    <div className="fixed inset-0 h-screen w-screen bg-neon-green -z-10 overflow-hidden">
      {sparkles.map((sparkle, index) => (
        <Sparkle
          key={index}
          {...sparkle}
          screenWidth={dimensions.width}
          screenHeight={dimensions.height}
        />
      ))}
    </div>
  );
}

