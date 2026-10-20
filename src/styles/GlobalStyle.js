import { createGlobalStyle } from 'styled-components';
import variables from './variables';
import PrismStyles from './PrismStyles';

const GlobalStyle = createGlobalStyle`
  ${variables};

  html {
    box-sizing: border-box;
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
    scroll-behavior: smooth;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  ::selection {
    background-color: var(--green-tint);
    color: var(--green);
  }

  :focus {
    outline: 2px dashed var(--green);
    outline-offset: 3px;
  }

  :focus:not(:focus-visible) {
    outline: none;
    outline-offset: 0px;
  }

  :focus-visible {
    outline: 2px dashed var(--green);
    outline-offset: 3px;
  }

  /* Scrollbar Styles */
  html {
    scrollbar-width: thin;
    scrollbar-color: var(--lightest-navy) var(--navy);
  }
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: var(--navy);
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--lightest-navy);
    border: 2px solid var(--navy);
    border-radius: 10px;
  }

  body {
    margin: 0;
    width: 100%;
    max-width: 100vw;
    min-height: 100%;
    overflow-x: hidden;
    position: relative;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    background-color: var(--navy);
    color: var(--slate);
    font-family: var(--font-sans);
    font-size: var(--fz-lg);
    line-height: 1.6;

    @media (max-width: 480px) {
      font-size: var(--fz-md);
    }

    &.hidden {
      overflow: hidden;
    }

    &.blur {
      overflow: hidden;

      #content > * {
        filter: blur(6px) brightness(0.65);
        transition: var(--transition);
        pointer-events: none;
        user-select: none;
      }
    }
  }

  #root {
    min-height: 100vh;
    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-columns: 100%;
    width: 100%;
    overflow-x: hidden;
  }

  main {
    margin: 0 auto;
    width: 100%;
    max-width: 1600px;
    min-height: 100vh;
    padding: 200px 150px;

    @media (max-width: 1080px) {
      padding: 200px 100px;
    }
    @media (max-width: 768px) {
      padding: 150px 40px;
    }
    @media (max-width: 480px) {
      padding: 120px 20px;
    }

    &.fillHeight {
      padding: 0 150px;

      @media (max-width: 1080px) {
        padding: 0 100px;
      }
      @media (max-width: 768px) {
        padding: 0 40px;
      }
      @media (max-width: 480px) {
        padding: 0 20px;
      }
    }
  }

  section {
    margin: 0 auto;
    padding: 100px 0;
    max-width: 1000px;
    width: 100%;
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
      padding: 80px 0;
    }

    @media (max-width: 480px) {
      padding: 60px 0;
    }
  }

  footer {
    position: relative;
    z-index: 1;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0 0 10px 0;
    font-weight: 600;
    color: var(--lightest-slate);
    line-height: 1.15;
    letter-spacing: -0.02em;
  }

  .big-heading {
    margin: 0;
    font-size: clamp(36px, 7vw, 72px);
    font-weight: 700;
  }

  .medium-heading {
    margin: 0;
    font-size: clamp(32px, 7vw, 56px);
  }

  .numbered-heading {
    display: flex;
    align-items: center;
    position: relative;
    margin: 10px 0 40px;
    width: 100%;
    font-family: 'Space Grotesk', var(--font-sans);
    font-size: clamp(22px, 5vw, var(--fz-heading));
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.02em;
    white-space: nowrap;

    &:before {
      counter-increment: section;
      content: '0' counter(section);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-right: 14px;
      padding: 5px 10px;
      border-radius: 7px;
      background-color: rgba(46, 204, 113, 0.1);
      border: 1px solid rgba(46, 204, 113, 0.38);
      box-shadow: 0 0 14px rgba(46, 204, 113, 0.12);
      color: var(--green);
      font-family: var(--font-mono);
      font-size: clamp(13px, 2.5vw, 15px);
      font-weight: 600;
      line-height: 1;
    }

    &:after {
      content: '';
      display: block;
      position: relative;
      top: 2px;
      flex: 1;
      max-width: 320px;
      height: 2px;
      margin-left: 20px;
      border-radius: 999px;
      background: linear-gradient(
        90deg,
        rgba(46, 204, 113, 0.8) 0%,
        rgba(46, 204, 113, 0.25) 55%,
        transparent 100%
      );
      box-shadow: 0 0 10px rgba(46, 204, 113, 0.2);

      @media (max-width: 768px) {
        max-width: 100%;
        margin-left: 14px;
      }
    }
  }

  img,
  svg,
  .gatsby-image-wrapper {
    width: 100%;
    max-width: 100%;
    vertical-align: middle;
  }

  img[alt=""],
  img:not([alt]) {
    filter: blur(5px);
  }

  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
    vertical-align: middle;

    &.feather {
      fill: none;
    }
  }

  a {
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    color: inherit;
    position: relative;
    transition: var(--transition);

    &:hover,
    &:focus {
      color: var(--green);
    }

    &.inline-link {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

  button {
    cursor: pointer;
    border: 0;
    border-radius: 0;
  }

  input, textarea {
    border-radius: 0;
    outline: 0;

    &:focus {
      outline: 0;
    }
    &:focus,
    &:active {
      &::placeholder {
        opacity: 0.5;
      }
    }
  }

  p {
    margin: 0 0 15px 0;

    &:last-child,
    &:last-of-type {
      margin: 0;
    }

    & > a {
      ${({ theme }) => theme.mixins.inlineLink};
    }

    & > code {
      background-color: var(--light-navy);
      color: var(--white);
      font-size: var(--fz-sm);
      border-radius: 4px;
      padding: 0.25em 0.5em;
    }
  }

  ul {
    &.fancy-list {
      padding: 0;
      margin: 0;
      list-style: none;
      font-size: var(--fz-md);
      li {
        position: relative;
        padding-left: 28px;
        margin-bottom: 12px;
        &:before {
          content: '▹';
          position: absolute;
          left: 0;
          color: var(--green);
        }
      }
    }
  }

  blockquote {
    border-left: 2px solid var(--green);
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 1.5rem;

    p {
      font-style: italic;
      font-size: 22px;
    }
  }

  hr {
    background-color: var(--lightest-navy);
    height: 1px;
    border: 0;
    margin: 1rem;
  }

  code {
    font-family: var(--font-mono);
    font-size: var(--fz-md);
  }

  .skip-to-content {
    ${({ theme }) => theme.mixins.button};
    position: absolute;
    top: auto;
    left: -999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
    z-index: -99;

    &:hover,
    &:focus {
      background-color: var(--green);
      color: var(--navy);
      top: 0;
      left: 0;
      width: auto;
      height: auto;
      overflow: auto;
      z-index: 99;
      box-shadow: none;
      transform: none;
    }
  }

  #logo {
    color: var(--green);
  }

  .overline {
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;
  }

  .subtitle {
    color: var(--green);
    margin: 0 0 20px 0;
    font-size: var(--fz-md);
    font-family: var(--font-mono);
    font-weight: 400;
    line-height: 1.5;
    @media (max-width: 1080px) {
      font-size: var(--fz-sm);
    }
    @media (max-width: 768px) {
      font-size: var(--fz-xs);
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
      line-height: 1.5;
    }
  }

  .breadcrumb {
    display: flex;
    align-items: center;
    margin-bottom: 50px;
    color: var(--green);

    .arrow {
      display: block;
      margin-right: 10px;
      padding-top: 4px;
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
      font-family: var(--font-mono);
      font-size: var(--fz-sm);
      font-weight: 600;
      line-height: 1.5;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
  }

  .gatsby-image-outer-wrapper {
    height: 100%;
  }

  /* Glassmorphism per le card dei progetti */
  @media (min-width: 769px) {
    #projects .project-description,
    .project-inner,
    .post__inner {
      background-color: rgba(36, 38, 36, 0.96) !important;
      box-shadow: 0 20px 35px -15px rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid var(--glass-border);
      transition: var(--transition);

      &:hover {
        border-color: rgba(46, 204, 113, 0.3);
      }
    }
  }

  ${PrismStyles};
`;

export default GlobalStyle;
