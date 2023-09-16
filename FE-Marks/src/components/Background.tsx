import { useEffect, useState } from "react";
import "../index.css";

type TRandomColor = {
  r: number;
  g: number;
  b: number;
};

const Background = () => {
  const random = (min: number, max: number) =>
    Math.round(min + Math.random() * (max - min));

  const randomcolor = () => {
    return {
      r: random(0, 255),
      g: random(0, 255),
      b: random(0, 255),
    };
  };

  const [currentColor, setCurrentColor] = useState<TRandomColor>(randomcolor());
  const [targetColor, setTargetColor] = useState<TRandomColor>(randomcolor());

  let increment: TRandomColor = null as unknown as TRandomColor;

  const resetTransition = () => {
    setTargetColor(randomcolor());
    increment = {
      r: 1,
      g: 1,
      b: 1,
    };
  };

  const transition = () => {
    let newColor = { ...currentColor };

    if (newColor.r > targetColor.r) {
      newColor.r = newColor.r - targetColor.r;
      if (newColor.r <= targetColor.r) {
        increment.r = 0;
      }
    } else if (newColor.r < targetColor.r) {
      newColor.r = newColor.r + targetColor.r;
      if (newColor.r >= targetColor.r) {
        increment.r = 0;
      }
    } else if (newColor.b === targetColor.b) {
      increment.r = 0;
    }

    if (newColor.g > targetColor.g) {
      newColor.g = newColor.g - targetColor.g;
      if (newColor.g <= targetColor.g) {
        increment.g = 0;
      }
    } else if (newColor.g < targetColor.g) {
      newColor.g = newColor.g + targetColor.g;
      if (newColor.g >= targetColor.g) {
        increment.g = 0;
      }
    } else if (newColor.b == targetColor.b) {
      increment.g = 0;
    }

    if (newColor.b > targetColor.b) {
      newColor.b = newColor.b - targetColor.b;
      if (newColor.b <= targetColor.b) {
        increment.b = 0;
      }
    } else if (newColor.b < targetColor.b) {
      newColor.b = newColor.b + targetColor.b;
      if (newColor.b >= targetColor.b) {
        increment.b = 0;
      }
    } else if (newColor.b == targetColor.b) {
      increment.b = 0;
    }

    setCurrentColor(newColor);

    if (increment.r === 0 && increment.g === 0 && increment.b === 0) {
      resetTransition();
    }
  };

  useEffect(() => {
    resetTransition();
    let animationFrameId: number;
    const animate = () => {
      transition();
      setTimeout(() => {
        animationFrameId = requestAnimationFrame(animate);
      }, 500);
    };
    animationFrameId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    const gradient = document.getElementById("gradient");
    const gradient2 = document.getElementById("gradient2");
    if (gradient && gradient2) {
      gradient.children[0].setAttribute(
        "stop-color",
        `rgb(${currentColor.r},${currentColor.g},${currentColor.b})`,
      );
      gradient.children[1].setAttribute(
        "stop-color",
        `rgb(${targetColor.r},${targetColor.g},${targetColor.b})`,
      );

      gradient2.children[0].setAttribute(
        "stop-color",
        `rgb(${currentColor.r},${currentColor.g},${currentColor.b})`,
      );
      gradient2.children[1].setAttribute(
        "stop-color",
        `rgb(${targetColor.r + 50},${targetColor.g + 200},${targetColor.b})`,
      );
    }
  }, [currentColor, targetColor]);

  return (
    <div className="background">
      <svg
        className="gr1"
        xmlns="http://www.w3.org/2000/svg"
        width="904"
        height="576"
        viewBox="0 0 904 576"
        fill="url(#gradient)"
      >
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.6"
            stitchTiles="stitch"
            result="colorNoise"
          />
          <feColorMatrix
            in="colorNoise"
            type="matrix"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"
          />
          <feComposite operator="in" in2="SourceGraphic" result="monoNoise" />
          <feBlend in="SourceGraphic" in2="monoNoise" mode="hard-light" />
        </filter>

        <filter id="innershadow">
          <feFlood floodColor="rgb(255,255,255,0.2)" />

          <feComposite operator="out" in2="SourceGraphic" />

          <feMorphology operator="dilate" radius="0" />
          <feGaussianBlur stdDeviation="15" />
          <feOffset dx="-7" dy="-45" />

          <feComposite operator="atop" in2="SourceGraphic" />
        </filter>

        <linearGradient id="gradient">
          <stop stopColor="var(--orange)" offset="30%" />
          <stop stopColor="var(--blue)" offset="100%" />
        </linearGradient>

        <path
          filter="url(#grain) url(#innershadow)"
          d="M422.387 198.227L422.391 198.219L422.396 198.211C502.319 60.8445 622.539 0.0311147 722.711 0.502722C772.8 0.738534 817.863 16.2941 850.397 45.241C882.924 74.1814 902.964 116.538 902.964 170.46C902.964 386.353 722.037 540.046 503.397 569.464C391.377 584.537 274.916 566.55 182.513 516.836C90.1201 467.127 21.7931 385.709 5.95884 273.89C-0.102654 231.085 -0.934731 202.296 2.56416 184.102C4.31299 175.009 7.13492 168.612 10.881 164.434C14.6125 160.271 19.2937 158.273 24.8606 158.03C30.4474 157.786 36.934 159.312 44.2331 162.232C51.5277 165.151 59.5994 169.448 68.3466 174.712C81.0437 182.352 95.1262 192.005 110.285 202.396C116.019 206.327 121.908 210.364 127.934 214.437C171.8 244.087 222.893 275.643 274.278 281.98C299.987 285.15 325.778 282.01 350.771 269.162C375.759 256.315 399.914 233.783 422.387 198.227Z"
        />

        <radialGradient id="G1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop
            offset="0%"
            style={{
              stopColor: "rgb(119, 183, 167, 0.7)",
              stopOpacity: 1,
            }}
          />
          <stop
            offset="90%"
            style={{ stopColor: "rgb(119,183,167)", stopOpacity: 0 }}
          />
        </radialGradient>
        <ellipse
          cx="350"
          cy="400"
          rx="300"
          ry="200"
          clipPath="url(#C)"
          fill="url(#G1)"
        />
      </svg>

      <svg
        className="gr2"
        xmlns="http://www.w3.org/2000/svg"
        width="600"
        height="600"
        viewBox="0 0 600 600"
        fill="url(#gradient2)"
      >
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.6"
            stitchTiles="stitch"
            result="colorNoise"
          />
          <feColorMatrix
            in="colorNoise"
            type="matrix"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"
          />
          <feComposite operator="in" in2="SourceGraphic" result="monoNoise" />
          <feBlend in="SourceGraphic" in2="monoNoise" mode="hard-light" />
        </filter>

        <filter id="innershadow2">
          <feFlood floodColor="rgb(255,255,255,0.1)" />

          <feComposite operator="out" in2="SourceGraphic" />

          <feMorphology operator="dilate" radius="1" />
          <feGaussianBlur stdDeviation="15" />
          <feOffset dx="-20" dy="0" />

          <feComposite operator="atop" in2="SourceGraphic" />
        </filter>

        <linearGradient id="gradient2" gradientTransform="rotate(0)">
          <stop stopColor="var(--orange)" offset="30%" />
          <stop stopColor="var(--green)" offset="100%" />
        </linearGradient>

        <circle
          cx="300"
          cy="300"
          r="300"
          filter="url(#grain) url(#innershadow2)"
        />
      </svg>
    </div>
  );
};

export default Background;
