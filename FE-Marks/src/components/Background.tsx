import { useEffect, useState } from "react";
import "../index.css";

const Background = () => {
  const random = (min: number, max: number) =>
    Math.round(min + Math.random() * (max - min));

  const randomcolorInRgb = () => {
    let color = [];
    for (let i = 0; i < 3; i++) {
      let num = random(0, 255);
      color.push(num);
    }
    return color;
  };

  // Converts RGB array [32,64,128] to HEX string #204080
  // It's easier to apply HEX color than RGB color.
  const rgb2Hex = (colorArray: number[]) => {
    let color = [];
    for (let i = 0; i < colorArray.length; i++) {
      let hex = colorArray[i].toString(16);
      if (hex.length < 2) {
        hex = "0" + hex;
      }
      color.push(hex);
    }
    return "#" + color.join("");
  };

  // Calculates the distance between the RGB
  // valuses so the increment values can be
  // calculated for the R, G and B values
  const calculateDistance = (colorArray1: number[], colorArray2: number[]) => {
    let distance = [];
    for (let i = 0; i < colorArray1.length; i++) {
      distance.push(Math.abs(colorArray1[i] - colorArray2[i]));
    }
    return distance;
  };

  // Calculates the increment values for R, G, and B using distance, fps, and duration.
  // This calculation can be made in many different ways.
  const calculateIncrement = (
    disyanceArray: number[],
    fps: number,
    duration: number,
  ): number[] => {
    fps === undefined ? 30 : fps;
    duration === undefined ? 1 : duration;

    let increment: number[] = [];

    for (let i = 0; i < disyanceArray.length; i++) {
      let inc = Math.abs(Math.floor(disyanceArray[i] / (fps * duration)));
      if (inc == 0) {
        inc = 1;
      }

      increment.push(inc);

      return increment;
    }
    return increment;
  };

  const [currentColor, setCurrentColor] = useState(randomcolorInRgb());
  const [targetColor, setTargetColor] = useState(randomcolorInRgb());
  const [increment, setIncrement] = useState([0, 0, 0]);
  let fps = 30;
  let duration = 3;
  let transitionHandler: ReturnType<typeof setTimeout>;

  const transition = () => {
    let newColor = { ...currentColor };
    let newIncrement = [...increment];

    if (newColor[0] > targetColor[0]) {
      newColor[0] = newColor[0] - targetColor[0];
      if (newColor[0] <= targetColor[0]) {
        newIncrement[0] = 0;
      }
    } else if (newColor[0] < targetColor[0]) {
      newColor[0] = newColor[0] + targetColor[0];
      if (newColor[0] >= targetColor[0]) {
        newIncrement[0] = 0;
      }
    } else if (newColor[2] === targetColor[2]) {
      newIncrement[0] = 0;
    }

    if (newColor[1] > targetColor[1]) {
      newColor[1] = newColor[1] - targetColor[1];
      if (newColor[1] <= targetColor[1]) {
        newIncrement[1] = 0;
      }
    } else if (newColor[1] < targetColor[1]) {
      newColor[1] = newColor[1] + targetColor[1];
      if (newColor[1] >= targetColor[1]) {
        newIncrement[1] = 0;
      }
    } else if (newColor[2] === targetColor[2]) {
      newIncrement[1] = 0;
    }

    if (newColor[2] > targetColor[2]) {
      newColor[2] = newColor[2] - targetColor[2];
      if (newColor[2] <= targetColor[2]) {
        newIncrement[2] = 0;
      }
    } else if (newColor[2] < targetColor[2]) {
      newColor[2] = newColor[2] + targetColor[2];
      if (newColor[2] >= targetColor[2]) {
        newIncrement[2] = 0;
      }
    } else if (newColor[2] === targetColor[2]) {
      newIncrement[2] = 0;
    }

    setCurrentColor(newColor);
    setIncrement(newIncrement);

    if (
      Array.isArray(increment) &&
      increment[0] === 0 &&
      increment[1] === 0 &&
      increment[2] === 0
    ) {
      startTransition();
    }
  };

  const startTransition = () => {
    clearInterval(transitionHandler);

    setTargetColor(randomcolorInRgb());
    const distance = calculateDistance(currentColor, targetColor);
    const newIncrement = calculateIncrement(distance, fps, duration);

    setIncrement(newIncrement);

    transitionHandler = setInterval(() => {
      transition();
    }, 1000 / 2);
  };

  // useEffect(() => {
  //   startTransition();
  //   return () => {
  //     clearInterval(transitionHandler);
  //   };
  // }, []);

  useEffect(() => {
    const randomColor = () => {
      // Generate random values for each of the R, G, and B components
      const r = Math.floor(Math.random() * 256); // Random number between 0 and 255
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);

      // Convert the decimal values to hex and ensure they have two digits
      const rHex = r.toString(16).padStart(2, "0");
      const gHex = g.toString(16).padStart(2, "0");
      const bHex = b.toString(16).padStart(2, "0");

      // Concatenate the hex values to form a valid hex color string
      return `#${rHex}${gHex}${bHex}`;
    };
    const changeColor = () => {
      document.body.style.backgroundColor = randomColor();
    };

    const hexToRgb = (hex: string) => {
      hex.toLowerCase();
      let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return {
        r: parseInt(result![1], 16),
        g: parseInt(result![2], 16),
        b: parseInt(result![3], 16),
      };
    };

    console.log(hexToRgb(randomColor()));

    console.log(randomColor());

    // const gradient = document.getElementById("gradient");
    // const gradient2 = document.getElementById("gradient2");
    // if (gradient && gradient2) {
    //   gradient.children[0].setAttribute(
    //     "stop-color",
    //     `rgb(${targetColor[0]},${targetColor[1]},${targetColor[2]})`,
    //   );
    // gradient.children[1].setAttribute(
    //   "stop-color",
    //   `rgb(${targetColor[0]},${targetColor[1]},${targetColor[2]})`,
    // );
    // gradient2.children[0].setAttribute(
    //   "stop-color",
    //   `rgb(${currentColor[0]},${currentColor[1]},${currentColor[2]})`,
    // );
    // gradient2.children[1].setAttribute(
    //   "stop-color",
    //   `rgb(${targetColor[0]},${targetColor[1]},${targetColor[2]})`,
    // );
    // }

    setInterval(() => {
      changeColor();
    }, 5000);

    // start color animation as soon as document is ready
    document.onreadystatechange = () => {
      if (document.readyState === "complete") {
        changeColor();
      }
    };
  });

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

        <linearGradient color="black" id="gradient">
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
