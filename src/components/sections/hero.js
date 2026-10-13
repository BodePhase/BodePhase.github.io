import React, { useState, useEffect, useCallback } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import Typewriter from 'typewriter-effect';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const StyledHeroSection = styled.section`
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500&family=VT323&display=swap');

  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;
  position: relative;
  z-index: 1;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  .particles-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  /* Dimensioni ESATTE del template originale di Brittany (big-heading) */
  .pixel-name {
    font-family: var(--font-pixel);
    font-size: clamp(40px, 8vw, 80px);
    color: var(--lightest-slate);
    text-shadow: 3px 3px 0px var(--dark-slate);
    line-height: 1.1;
    margin: 0;
    margin-top: -20px; /* Aggiungi questa riga per avvicinare il nome! */
  }

  h3 {
    margin-top: 5px; /* Diamo più respiro al nome sopra */
    color: var(--slate);
    line-height: 0.9;
    font-weight: 500; /* Lo rendiamo leggermente meno "massiccio" */
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }

  .terminal-text {
    font-family: var(--font-mono);
    color: var(--light-slate);
    font-size: 16px;
    letter-spacing: 1px;
    margin-top: 30px;
    max-width: 540px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const particlesInit = useCallback(async engine => {
    await loadFull(engine);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="pixel-name">Massimiliano Favetta.</h2>;
  const three = <h3 className="big-heading">I build things for the web.</h3>;
  
  const four = (
    <div className="terminal-text">
      <Typewriter
        onInit={(typewriter) => {
          typewriter.typeString('$ COMPUTER AND SYSTEMS ENGINEERING STUDENT')
            .start();
        }}
        options={{
          cursor: '█',
          delay: 100,
        }}
      />
    </div>
  );
  
  const five = (
    <a
      className="email-link"
      href="/resume.pdf"
      target="_blank"
      rel="noreferrer">
      Check out my Resume!
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      <Particles
        id="tsparticles"
        className="particles-container"
        init={particlesInit}
        options={{
          fullScreen: { enable: true, zIndex: -1 },
          fpsLimit: 60,
          particles: {
            number: { value: 40, density: { enable: true, value_area: 800 } },
            color: { value: "#2ecc71" },
            links: { enable: true, color: "#2ecc71", distance: 150, opacity: 0.3, width: 1 },
            shape: { type: "circle" },
            opacity: { value: 0.5 },
            size: { value: 3, random: true },
            move: { enable: true, speed: 1, direction: "none", out_mode: "out" }
          },
          interactivity: {
            events: { onHover: { enable: true, mode: "grab" } },
            modes: { grab: { distance: 140, line_linked: { opacity: 1 } } }
          }
        }}
      />

      <div style={{ zIndex: 2, position: 'relative' }}>
        {prefersReducedMotion ? (
          <>
            {items.map((item, i) => (
              <div key={i}>{item}</div>
            ))}
          </>
        ) : (
          <TransitionGroup component={null}>
            {isMounted &&
              items.map((item, i) => (
                <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                  <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
                </CSSTransition>
              ))}
          </TransitionGroup>
        )}
      </div>
    </StyledHeroSection>
  );
};

export default Hero;