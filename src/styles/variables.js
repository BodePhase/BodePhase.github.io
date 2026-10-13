import { css } from 'styled-components';

const variables = css`
  :root {
    /* Il grigio opaco esatto dello sfondo di Hacknical */
    --dark-navy: #1a1b1a; /* Leggermente più scuro per dare profondità */
    --navy: #252625;      /* Il tuo colore esatto (Sfondo principale) */
    --light-navy: #353635; /* Per i riquadri e i dettagli */
    --lightest-navy: #454645;
    --navy-shadow: rgba(0, 0, 0, 0.5);
    
    /* Colori dei testi */
    --dark-slate: #5c606a; /* Il colore dell'ombra del logo e dei numeri in basso */
    --slate: #8f96a3;
    --light-slate: #c1c7d1;
    --lightest-slate: #ffffff;
    --white: #ffffff;
    
    /* Il verde delle particelle e accenti */
    --green: #2ecc71;
    --green-tint: rgba(46, 204, 113, 0.1);
    
    --pink: #f57dff;
    --blue: #58a6ff;

    /* I Font originali di Hacknical */
    --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    --font-mono: 'Roboto Mono', 'SF Mono', monospace;
    --font-pixel: 'VT323', monospace;

    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 22px;
    --fz-heading: 32px;

    --border-radius: 2px;
    --nav-height: 100px;
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