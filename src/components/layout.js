import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { Head, Loader, Nav, Social, Email, Footer } from '@components';
import { GlobalStyle, theme } from '@styles';

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  z-index: 1;
`;

const StyledCyberBackground = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;

  /* Griglia ingegneristica con sfumatura morbida sotto la navbar e ai bordi */
  .cyber-grid {
    position: absolute;
    inset: 0;
    background-image: linear-gradient(to right, rgba(46, 204, 113, 0.045) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(46, 204, 113, 0.045) 1px, transparent 1px),
      radial-gradient(circle, rgba(46, 204, 113, 0.14) 1px, transparent 1px);
    background-size: 56px 56px, 56px 56px, 28px 28px;
    background-position: center center;
    mask-image: linear-gradient(
      to bottom,
      transparent 0px,
      transparent 75px,
      rgba(0, 0, 0, 0.4) 140px,
      rgba(0, 0, 0, 1) 260px,
      rgba(0, 0, 0, 0.85) 85%,
      transparent 100%
    );
    -webkit-mask-image: linear-gradient(
      to bottom,
      transparent 0px,
      transparent 75px,
      rgba(0, 0, 0, 0.4) 140px,
      rgba(0, 0, 0, 1) 260px,
      rgba(0, 0, 0, 0.85) 85%,
      transparent 100%
    );
  }

  /* Spotlight interattivo che segue il cursore e illumina la griglia */
  .cursor-spotlight {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      600px circle at var(--mouse-x, 50vw) var(--mouse-y, 40vh),
      rgba(46, 204, 113, 0.075),
      rgba(26, 188, 156, 0.025) 40%,
      transparent 75%
    );
    transition: opacity 0.3s ease;
  }

  /* Bagliori ambientali animati a bassa frequenza */
  .ambient-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(110px);
    opacity: 0.35;
    animation: floatOrb 18s ease-in-out infinite alternate;
  }

  .orb-primary {
    width: 420px;
    height: 420px;
    top: 12%;
    right: 8%;
    background: radial-gradient(circle, rgba(46, 204, 113, 0.16) 0%, transparent 70%);
  }

  .orb-secondary {
    width: 380px;
    height: 380px;
    bottom: 10%;
    left: 6%;
    background: radial-gradient(circle, rgba(26, 188, 156, 0.12) 0%, transparent 70%);
    animation-delay: -9s;
  }

  @keyframes floatOrb {
    0% {
      transform: translate(0px, 0px) scale(1);
    }
    50% {
      transform: translate(-30px, 25px) scale(1.08);
    }
    100% {
      transform: translate(25px, -20px) scale(0.95);
    }
  }
`;

const Layout = ({ children, location }) => {
  const isHome = location.pathname === '/';
  const [isLoading, setIsLoading] = useState(false);

  const handleExternalLinks = () => {
    const allLinks = Array.from(document.querySelectorAll('a'));
    if (allLinks.length > 0) {
      allLinks.forEach(link => {
        if (link.host !== window.location.host) {
          link.setAttribute('rel', 'noopener noreferrer');
          link.setAttribute('target', '_blank');
        }
      });
    }
  };

  useEffect(() => {
    let rafId = null;
    const handleMouseMove = e => {
      if (rafId) {
        return;
      }
      rafId = window.requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
        rafId = null;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (location.hash) {
      const id = location.hash.substring(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          el.focus({ preventScroll: true });
        }
      }, 0);
    }

    handleExternalLinks();
  }, [isLoading, location.hash]);

  return (
    <>
      <Head />

      <div id="root">
        <ThemeProvider theme={theme}>
          <GlobalStyle />

          <a className="skip-to-content" href="#content">
            Skip to Content
          </a>

          <StyledCyberBackground aria-hidden="true">
            <div className="cyber-grid" />
            <div className="cursor-spotlight" />
            <div className="ambient-orb orb-primary" />
            <div className="ambient-orb orb-secondary" />
          </StyledCyberBackground>

          {isLoading && isHome ? (
            <Loader finishLoading={() => setIsLoading(false)} />
          ) : (
            <StyledContent>
              <Nav isHome={isHome} />
              <Social isHome={isHome} />
              <Email isHome={isHome} />

              <div id="content">
                {children}
                <Footer />
              </div>
            </StyledContent>
          )}
        </ThemeProvider>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
};

export default Layout;
