'use client';

export default function SoftFog() {
    return (
        <div className="fog-container">
            <div className="fog-layer fog-layer-1"></div>
            <div className="fog-layer fog-layer-2"></div>
            <style jsx>{`
        .fog-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 10;
          overflow: hidden;
        }

        .fog-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 200%;
          height: 100%;
          background: url('https://raw.githubusercontent.com/danielstuart14/CSS_FOG_ANIMATION/master/img/fog1.png') repeat-x;
          opacity: 0.4;
          background-size: 50% 100%;
        }

        .fog-layer-1 {
          animation: fogAnim 60s linear infinite;
        }

        .fog-layer-2 {
          background: url('https://raw.githubusercontent.com/danielstuart14/CSS_FOG_ANIMATION/master/img/fog2.png') repeat-x;
          animation: fogAnim 40s linear infinite reverse;
          opacity: 0.3;
          margin-top: 10vh;
        }

        @keyframes fogAnim {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
        </div>
    );
}
