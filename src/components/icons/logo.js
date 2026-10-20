import React from 'react';

const IconLogo = () => (
  <svg id="logo" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 100 100">
    <title>Massimiliano Favetta Logo</title>
    <defs>
      <linearGradient id="navHexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2ecc71" />
        <stop offset="100%" stopColor="#1abc9c" />
      </linearGradient>
    </defs>
    <polygon
      id="Shape"
      points="50,4 91,27 91,73 50,96 9,73 9,27"
      fill="var(--navy)"
      stroke="url(#navHexGrad)"
      strokeWidth="5.5"
      strokeLinejoin="round"
    />
    <polygon
      points="50,12 83,31 83,69 50,88 17,69 17,31"
      fill="none"
      stroke="var(--green)"
      strokeWidth="1.3"
      strokeDasharray="7 5"
      strokeOpacity="0.45"
    />
    <circle cx="50" cy="12" r="2.3" fill="var(--green)" />
    <circle cx="50" cy="88" r="2.3" fill="var(--green)" />
    <g transform="translate(2.5, 2.5)" fill="rgba(46, 204, 113, 0.25)">
      <path d="M 22,66 L 22,34 L 29.5,34 L 37,46.5 L 44.5,34 L 52,34 L 52,66 L 45,66 L 45,45.5 L 37,58 L 29,45.5 L 29,66 Z" />
      <path d="M 57,66 L 57,34 L 79,34 L 79,40.5 L 64,40.5 L 64,47.5 L 76,47.5 L 76,54 L 64,54 L 64,66 Z" />
    </g>
    <path
      fill="var(--lightest-slate)"
      d="M 22,66 L 22,34 L 29.5,34 L 37,46.5 L 44.5,34 L 52,34 L 52,66 L 45,66 L 45,45.5 L 37,58 L 29,45.5 L 29,66 Z"
    />
    <path
      fill="var(--lightest-slate)"
      d="M 57,66 L 57,34 L 79,34 L 79,40.5 L 64,40.5 L 64,47.5 L 76,47.5 L 76,54 L 64,54 L 64,66 Z"
    />
    <rect x="71" y="59" width="7" height="7" rx="1.2" fill="var(--green)" />
  </svg>
);

export default IconLogo;
