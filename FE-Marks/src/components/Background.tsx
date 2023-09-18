import "../index.css";

const Background = () => {


  return (
      <div className='bg-container' >
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

            <linearGradient  id="gradient">
              <stop stopColor="var(--orange)" offset="30%">
                <animate
                    dur='100s'
                    attributeName='stop-color'
                    values='#143F6B; #C51605; #F55353; #FEB139; #004225; #F6F54D; #2445C8; #EBE76C; #F0B86E; #ED7B7B; #252B48;
              #436354; #836096; #F5EAEA; #FFB84C; #FE0000 #F16767; #FCBAAD; #FCAEAE; #143F6B'
                    fill='freeze'
                    repeatCount='indefinite'
                />
              </stop>
              <stop stopColor="var(--blue)" offset="100%" >
                <animate
                    dur='75s'
                    attributeName='stop-color'
                    values='#F45050; #F9D949; #F0F0F0; #EF6262; #3C486B; #EBE4D1; #B4B4B3; #26577C; #E55604; #F8F0E5; #EADBC8;
                #DAC0A3; #F24C3D; #0F2C59; #F45050 '
                    fill='freeze'
                    repeatCount='indefinite'
                />
              </stop>
            </linearGradient>

            <path
                className='.path'
                filter="url(#grain) url(#innershadow)"
                d="M422.387 198.227L422.391 198.219L422.396 198.211C502.319 60.8445 622.539 0.0311147 722.711
            0.502722C772.8 0.738534 817.863 16.2941 850.397 45.241C882.924 74.1814 902.964 116.538 902.964
            170.46C902.964 386.353 722.037 540.046 503.397 569.464C391.377 584.537 274.916 566.55 182.513
            516.836C90.1201 467.127 21.7931 385.709 5.95884 273.89C-0.102654 231.085 -0.934731 202.296 2.56416
            184.102C4.31299 175.009 7.13492 168.612 10.881 164.434C14.6125 160.271 19.2937 158.273 24.8606
            158.03C30.4474 157.786 36.934 159.312 44.2331 162.232C51.5277 165.151 59.5994 169.448 68.3466
            174.712C81.0437 182.352 95.1262 192.005 110.285 202.396C116.019 206.327 121.908 210.364 127.934
            214.437C171.8 244.087 222.893 275.643 274.278 281.98C299.987 285.15 325.778 282.01 350.771 269.162C375.759
            256.315 399.914 233.783 422.387 198.227Z"
            />

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
              <stop stopColor="var(--orange)" offset="30%" >
                <animate
                    dur='100s'
                    attributeName='stop-color'
                    values='#143F6B; #C51605; #F55353; #FEB139; #004225; #F6F54D; #2445C8; #EBE76C; #F0B86E; #ED7B7B; #252B48;
              #436354; #836096; #F5EAEA; #FFB84C; #FE0000 #F16767; #FCBAAD; #FCAEAE; #143F6B'
                    fill='freeze'
                    repeatCount='indefinite'
                />
              </stop>
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
      </div>

  );
};

export default Background;
