import { css } from 'styled-components';

const variables = css`
  :root {
    /* Palette Dark Charcoal & Glassmorphism */
    --dark-navy: #141514;
    --navy: #1e1f1e;
    --light-navy: #2a2c2a;
    --lightest-navy: #3a3d3a;
    --navy-shadow: rgba(0, 0, 0, 0.6);
    --glass-bg: rgba(42, 44, 42, 0.72);
    --glass-border: rgba(255, 255, 255, 0.08);

    /* Tipografia e Testi */
    --dark-slate: #5c626d;
    --slate: #9aa1ae;
    --light-slate: #c9cfd8;
    --lightest-slate: #f3f5f8;
    --white: #ffffff;

    /* Accenti Smeraldo */
    --green: #2ecc71;
    --green-tint: rgba(46, 204, 113, 0.12);
    --green-glow: rgba(46, 204, 113, 0.25);

    --pink: #f57dff;
    --blue: #58a6ff;

    /* Pairing Tipografico Moderno */
    --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    --font-mono: 'JetBrains Mono', 'Roboto Mono', monospace;
    --font-pixel: 'VT323', monospace;

    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 17px;
    --fz-xl: 19px;
    --fz-xxl: 22px;
    --fz-heading: 32px;

    --border-radius: 8px;
    --nav-height: 90px;
    --nav-scroll-height: 70px;
    --tab-height: 42px;
    --tab-width: 120px;
    --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
    --hamburger-width: 30px;
    --ham-before: top 0.1s ease-in 0.25s, opacity 0.1s ease-in;
    --ham-before-active: top 0.1s ease-out, opacity 0.1s ease-out 0.12s;
    --ham-after: bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    --ham-after-active: bottom 0.1s ease-out, transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;
  }
`;

export default variables;
