import React from 'react';

const IconLogo = () => (
  <svg id="logo" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 84 96">
    <title>Logo</title>
    <g transform="translate(-8.000000, -2.000000)">
      <g transform="translate(11.000000, 5.000000)">
        <polygon
          id="Shape"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points="39 0 0 22 0 67 39 90 78 68 78 23"
        />
        <polygon
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray="6 4"
          strokeOpacity="0.4"
          fill="none"
          points="39 8 7 26 7 63 39 82 71 64 71 27"
        />
        {/* Ombra 3D stile Pixel-Art coordinata con il titolo della Hero */}
        <text
          x="41.5"
          y="58.5"
          fill="var(--dark-slate)"
          fontSize="44px"
          fontFamily="var(--font-pixel)"
          textAnchor="middle"
          letterSpacing="1px">
          MF
        </text>
        {/* Monogramma principale MF in font VT323 */}
        <text
          x="39"
          y="56"
          fill="var(--lightest-slate)"
          fontSize="44px"
          fontFamily="var(--font-pixel)"
          textAnchor="middle"
          letterSpacing="1px">
          MF
        </text>
      </g>
    </g>
  </svg>
);

export default IconLogo;
