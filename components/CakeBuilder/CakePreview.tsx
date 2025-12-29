'use client';

import { FLAVORS } from '../../lib/cakeData';

interface CakePreviewProps {
    shape: string;
    size: string;
    flavorId: string;
    extras: string[];
}

export default function CakePreview({ shape, size, flavorId, extras }: CakePreviewProps) {
    const flavor = FLAVORS.find(f => f.id === flavorId);
    const color = flavor?.color || '#F3E5AB';

    // Scale factor based on size (6" = 0.8, 8" = 1, 10" = 1.2)
    const scale = size === '6' ? 0.8 : size === '10' ? 1.2 : 1;
    const baseWidth = 200 * scale;
    const baseHeight = 120 * scale;

    // SVG Paths
    const roundPath = `M10 60 C 10 30, ${baseWidth + 10} 30, ${baseWidth + 10} 60 L ${baseWidth + 10} ${baseHeight} C ${baseWidth + 10} ${baseHeight + 30}, 10 ${baseHeight + 30}, 10 ${baseHeight} Z`;
    const squarePath = `M10 40 L ${baseWidth + 10} 40 L ${baseWidth + 10} ${baseHeight + 20} L 10 ${baseHeight + 20} Z`;
    const heartPath = `M${baseWidth / 2 + 10} 60 C ${baseWidth + 10} 0, ${baseWidth + 60} 80, ${baseWidth / 2 + 10} ${baseHeight} C -40 80, 10 0, ${baseWidth / 2 + 10} 60 Z`;
    // Simplified paths for demonstration - ideally would be more detailed paths

    const getShapePath = () => {
        switch (shape) {
            case 'square': return <rect x={20} y={40} width={baseWidth} height={baseHeight} rx={5} fill={color} stroke="#e0e0e0" strokeWidth="2" />;
            case 'heart': return <path d="M110 40 C 150 0, 210 50, 110 130 C 10 50, 70 0, 110 40 Z" transform={`scale(${scale}) translate(${110 - 110 * scale}, 20)`} fill={color} stroke="#e0e0e0" strokeWidth="2" />;
            default: return <ellipse cx={150} cy={140} rx={baseWidth / 2} ry={40} fill={color} stroke="#e0e0e0" strokeWidth="2" />;
        }
    };

    // For 3D effect mock using layered ellipses for round
    const renderRoundConfig = () => (
        <g transform={`translate(${150 - baseWidth / 2}, 50)`}>
            {/* Side */}
            <path d={`M0 50 L0 ${100 * scale} C 0 ${130 * scale}, ${baseWidth} ${130 * scale}, ${baseWidth} ${100 * scale} L ${baseWidth} 50`} fill={color} filter="brightness(0.9)" />
            {/* Top */}
            <ellipse cx={baseWidth / 2} cy={50} rx={baseWidth / 2} ry={30 * scale} fill={color} />
            {/* Decor - Flowers */}
            {extras.includes('flowers') && (
                <g transform="translate(20, 20)">
                    <circle cx="0" cy="0" r="10" fill="#FFB7B2" />
                    <circle cx="15" cy="5" r="8" fill="#FFDAC1" />
                    <circle cx="5" cy="15" r="8" fill="#E2F0CB" />
                </g>
            )}
            {/* Decor - Gold */}
            {extras.includes('gold_leaf') && (
                <path d="M40 40 Q 50 30 60 40 T 80 40" fill="none" stroke="#D4AF37" strokeWidth="3" />
            )}
        </g>
    );

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="350" height="350" viewBox="0 0 300 300" style={{ overflow: 'visible' }}>
                <defs>
                    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
                        <feOffset dx="0" dy="10" result="offsetblur" />
                        <feComponentTransfer>
                            <feFuncA type="linear" slope="0.2" />
                        </feComponentTransfer>
                        <feMerge>
                            <feMergeNode />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Plate */}
                <ellipse cx="150" cy="220" rx="130" ry="40" fill="#f0f0f0" />

                {/* Cake Render Logic */}
                {shape === 'round' ? renderRoundConfig() : getShapePath()}

            </svg>
        </div>
    );
}
