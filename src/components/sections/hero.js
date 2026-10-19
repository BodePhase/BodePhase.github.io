import React, { useState, useCallback, useEffect, useRef, memo } from 'react';
import { motion } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import { usePrefersReducedMotion } from '@hooks';
import { email } from '@config';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const blink = keyframes`
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
`;

const PARTICLES_OPTIONS = {
  fullScreen: { enable: true, zIndex: 0 },
  fpsLimit: 60,
  detectRetina: true,
  particles: {
    number: {
      value: 52,
      density: { enable: true, value_area: 900 },
    },
    color: {
      value: ['#2ecc71', '#1abc9c', '#52be80'],
    },
    links: {
      enable: true,
      color: '#2ecc71',
      distance: 140,
      opacity: 0.22,
      width: 1,
      triangles: {
        enable: true,
        color: '#2ecc71',
        opacity: 0.025,
      },
    },
    shape: { type: 'circle' },
    opacity: {
      value: 0.45,
      random: true,
      anim: {
        enable: true,
        speed: 0.8,
        opacity_min: 0.15,
        sync: false,
      },
    },
    size: {
      value: 2.8,
      random: true,
      anim: {
        enable: true,
        speed: 1.5,
        size_min: 1,
        sync: false,
      },
    },
    move: {
      enable: true,
      speed: 0.6,
      direction: 'none',
      random: true,
      straight: false,
      out_mode: 'bounce',
      attract: { enable: false },
    },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: 'grab' },
      resize: true,
    },
    modes: {
      grab: {
        distance: 155,
        line_linked: { opacity: 0.55 },
      },
    },
  },
};

/* Componente memoizzato: impedisce il reset delle particelle quando si clicca o si scrive nel terminale */
const HeroParticles = memo(({ onLoaded }) => {
  const particlesInit = useCallback(async engine => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      className="particles-container"
      init={particlesInit}
      loaded={onLoaded}
      options={PARTICLES_OPTIONS}
    />
  );
});

HeroParticles.displayName = 'HeroParticles';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  padding: var(--nav-height) 0 40px;
  position: relative;
  width: 100%;

  .particles-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  .hero-content {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .hero-title-box {
    background-color: var(--navy);
    box-shadow: 0 0 28px 20px var(--navy);
    border-radius: 12px;
    padding: 8px 12px 10px 4px;
    width: fit-content;
    max-width: 100%;
  }

  h1 {
    margin: 0 0 14px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(13px, 2.8vw, 17px);
    font-weight: 500;
    letter-spacing: 0.05em;

    @media (max-width: 480px) {
      margin: 0 0 10px 2px;
    }
  }

  .pixel-name {
    font-family: var(--font-pixel);
    font-size: clamp(34px, 9.2vw, 98px);
    color: var(--lightest-slate);
    text-shadow: 3px 3px 0px var(--dark-slate);
    line-height: 0.95;
    margin: 0;
    white-space: nowrap;
  }

  .hero-subtitle {
    margin: 10px 0 0 0;
    color: var(--slate);
    font-family: 'Space Grotesk', var(--font-sans);
    font-size: clamp(21px, 6.2vw, 72px);
    line-height: 1.08;
    font-weight: 700;
    letter-spacing: -0.03em;
    white-space: nowrap;
  }

  /* Scritta animata sopra al terminale e sotto "I build things for the web." */
  .engineering-tagline {
    display: inline-flex;
    align-items: center;
    margin-top: clamp(16px, 3vw, 24px);
    padding: 8px 14px;
    border-left: 3px solid var(--green);
    background: linear-gradient(90deg, rgba(46, 204, 113, 0.1) 0%, rgba(46, 204, 113, 0) 100%);
    border-radius: 0 8px 8px 0;
    font-family: var(--font-mono);
    font-size: clamp(11px, 2.4vw, 15px);
    font-weight: 500;
    color: var(--lightest-slate);
    letter-spacing: 0.08em;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;

    .prompt-symbol {
      color: var(--green);
      font-weight: 700;
      margin-right: 10px;
      text-shadow: 0 0 8px var(--green-glow);
    }

    .typed-text {
      color: var(--light-slate);
    }

    .cursor-block {
      display: inline-block;
      margin-left: 4px;
      color: var(--green);
      animation: ${blink} 1s infinite;
    }
  }

  /* Finestra Terminale Interattivo */
  .hero-terminal {
    margin-top: clamp(18px, 3vw, 26px);
    width: 100%;
    max-width: 640px;
    background-color: #161716;
    border: 1px solid rgba(46, 204, 113, 0.32);
    border-radius: 12px;
    box-shadow: 0 18px 40px -15px rgba(0, 0, 0, 0.85), 0 0 25px 18px var(--navy);
    overflow: hidden;
    font-family: var(--font-mono);
    transition: border-color 0.25s ease, box-shadow 0.25s ease;

    &:focus-within {
      border-color: rgba(46, 204, 113, 0.7);
      box-shadow: 0 20px 45px -12px rgba(46, 204, 113, 0.18), 0 0 25px 18px var(--navy);
    }
  }

  .terminal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 14px;
    background-color: #202220;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    user-select: none;

    .dots {
      display: flex;
      gap: 7px;
      span {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        display: inline-block;
      }
      .close {
        background-color: #ff5f56;
        opacity: 0.85;
      }
      .minimize {
        background-color: #ffbd2e;
        opacity: 0.85;
      }
      .maximize {
        background-color: #27c93f;
        opacity: 0.85;
      }
    }

    .term-title {
      font-size: 11px;
      color: var(--slate);
      letter-spacing: 0.04em;
    }

    .term-badge {
      font-size: 10px;
      color: var(--green);
      background-color: rgba(46, 204, 113, 0.1);
      border: 1px solid rgba(46, 204, 113, 0.25);
      padding: 2px 7px;
      border-radius: 999px;
    }
  }

  .terminal-body {
    display: block;
    padding: 12px 16px;
    max-height: 190px;
    overflow-y: auto;
    font-size: clamp(12px, 2.2vw, 13.5px);
    line-height: 1.55;
    color: var(--light-slate);
    cursor: text;

    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: var(--lightest-navy);
      border-radius: 4px;
    }
  }

  .term-welcome {
    color: var(--dark-slate);
    font-size: clamp(11px, 2vw, 12.5px);
    margin-bottom: 8px;

    span {
      color: var(--green);
    }
  }

  .history-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 8px;
  }

  .history-item {
    .cmd-echo {
      color: var(--lightest-slate);
      .user-host {
        color: var(--green);
        margin-right: 8px;
      }
    }
    .cmd-output {
      color: var(--slate);
      padding-left: 12px;
      border-left: 2px solid rgba(46, 204, 113, 0.35);
      margin-top: 3px;
      font-size: clamp(11.5px, 2.1vw, 13px);

      strong {
        color: var(--green);
        font-weight: 500;
      }
    }
  }

  .input-line {
    display: flex;
    align-items: center;
    gap: 8px;

    .user-host {
      color: var(--green);
      font-weight: 600;
      white-space: nowrap;
      font-size: clamp(11.5px, 2.2vw, 13.5px);
    }

    input {
      flex: 1;
      min-width: 0;
      background: transparent;
      border: none;
      color: var(--lightest-slate);
      font-family: var(--font-mono);
      font-size: clamp(12px, 2.2vw, 13.5px);
      caret-color: var(--green);
      padding: 0;

      &::placeholder {
        color: var(--dark-slate);
        opacity: 0.85;
      }
    }
  }

  .terminal-QuickBar {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
    padding: 8px 14px;
    background-color: rgba(255, 255, 255, 0.02);
    border-top: 1px solid rgba(255, 255, 255, 0.05);

    .quick-label {
      font-size: 11px;
      color: var(--dark-slate);
      margin-right: 4px;
      user-select: none;
    }

    button.cmd-chip {
      padding: 3px 9px;
      border-radius: 6px;
      background-color: rgba(46, 204, 113, 0.07);
      border: 1px solid rgba(46, 204, 113, 0.22);
      color: var(--light-slate);
      font-family: var(--font-mono);
      font-size: 11px;
      transition: var(--transition);

      &:hover,
      &:focus-visible {
        background-color: var(--green-tint);
        border-color: var(--green);
        color: var(--green);
        transform: translateY(-1px);
      }
    }
  }

  .resume-cta {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-top: clamp(24px, 4vw, 34px);
    padding: clamp(13px, 2.8vw, 18px) clamp(22px, 4.5vw, 32px);
    font-family: var(--font-mono);
    font-size: clamp(13px, 2.5vw, 15px);
    font-weight: 500;
    letter-spacing: 0.03em;
    color: var(--green);
    background: linear-gradient(135deg, rgba(46, 204, 113, 0.14) 0%, rgba(30, 31, 30, 0.98) 100%),
      var(--navy);
    border: 1px solid rgba(46, 204, 113, 0.65);
    border-radius: 10px;
    box-shadow: 0 10px 25px -10px rgba(0, 0, 0, 0.7), 0 0 24px 16px var(--navy);
    white-space: nowrap;
    transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

    .cta-arrow {
      display: inline-block;
      font-size: 1.15em;
      line-height: 1;
      transition: transform 0.25s ease;
    }

    &:hover,
    &:focus-visible {
      color: var(--lightest-slate);
      background: linear-gradient(135deg, rgba(46, 204, 113, 0.26) 0%, rgba(30, 31, 30, 0.98) 100%),
        var(--navy);
      border-color: var(--green);
      box-shadow: 0 12px 28px -6px var(--green-glow), 3px 3px 0 0 var(--green),
        0 0 24px 16px var(--navy);
      transform: translate(-3px, -3px);

      .cta-arrow {
        transform: translate(3px, -3px);
        color: var(--green);
      }
    }
  }
`;

const TAGLINE_STRING = 'COMPUTER AND SYSTEMS ENGINEERING STUDENT';
const QUICK_COMMANDS = ['help', 'whoami', 'skills', 'projects', 'contact', 'clear'];

const Hero = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const particlesContainerRef = useRef(null);
  const terminalBodyRef = useRef(null);

  const [typedTagline, setTypedTagline] = useState(prefersReducedMotion ? TAGLINE_STRING : '');
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([]);

  /* Digita gradualmente COMPUTER AND SYSTEMS ENGINEERING STUDENT sotto "I build things for the web." */
  useEffect(() => {
    if (prefersReducedMotion) {
      setTypedTagline(TAGLINE_STRING);
      return;
    }

    let currentIndex = 0;
    let intervalId = null;

    const startDelay = setTimeout(() => {
      intervalId = setInterval(() => {
        currentIndex += 1;
        setTypedTagline(TAGLINE_STRING.slice(0, currentIndex));
        if (currentIndex >= TAGLINE_STRING.length) {
          clearInterval(intervalId);
        }
      }, 55);
    }, 650);

    return () => {
      clearTimeout(startDelay);
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const scrollToSection = id => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const executeCommand = rawCmd => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) {
      return;
    }

    if (cmd === 'clear' || cmd === 'cls') {
      setHistory([]);
      return;
    }

    let response;
    switch (cmd) {
      case 'help':
        response = (
          <span>
            Available commands: <strong>whoami</strong>, <strong>skills</strong>,{' '}
            <strong>projects</strong>, <strong>contact</strong>, <strong>resume</strong>,{' '}
            <strong>clear</strong>
          </span>
        );
        break;
      case 'whoami':
      case 'about':
        response = (
          <span>
            <strong>Massimiliano Favetta</strong> — Computer &amp; Systems Engineering student at{' '}
            <strong>Sapienza University of Rome</strong>. Passionate about software architecture,
            cybersecurity, Linux, and chess.
          </span>
        );
        break;
      case 'skills':
      case 'stack':
        response = (
          <span>
            Core stack: <strong>PyTorch</strong> · <strong>TensorFlow</strong> ·{' '}
            <strong>MATLAB</strong> · <strong>Docker</strong> · <strong>Node.js</strong> ·{' '}
            <strong>AWS</strong> · <strong>React</strong> · <strong>Linux</strong>
          </span>
        );
        break;
      case 'projects':
      case 'ls':
        response = (
          <span>
            Featured: <strong>01. Halcyon Theme</strong> | <strong>02. Spotify Profile</strong> |{' '}
            <strong>03. Exam Schedule</strong> — Scrolling to #projects...
          </span>
        );
        setTimeout(() => scrollToSection('projects'), 400);
        break;
      case 'contact':
      case 'email':
        response = (
          <span>
            Inbox: <strong>{email}</strong> — Scrolling to #contact...
          </span>
        );
        setTimeout(() => scrollToSection('contact'), 400);
        break;
      case 'resume':
      case 'cv':
        response = (
          <span>
            Opening <strong>/resume.pdf</strong> in a new tab...
          </span>
        );
        if (typeof window !== 'undefined') {
          window.open('/resume.pdf', '_blank', 'noopener,noreferrer');
        }
        break;
      case 'sudo':
      case 'hack':
        response = (
          <span>
            <strong>Permission denied:</strong> nice try! Everything here is already open-source.
          </span>
        );
        break;
      default:
        response = (
          <span>
            Command not found: <strong>{rawCmd}</strong>. Type <strong>help</strong> for available
            commands.
          </span>
        );
    }

    setHistory(prev => [...prev, { cmd: rawCmd, output: response }]);
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(inputVal);
      setInputVal('');
    }
  };

  const particlesLoaded = useCallback(async container => {
    particlesContainerRef.current = container;
  }, []);

  useEffect(() => {
    const protectedSelector = [
      'a',
      'button',
      'header',
      '.hero-title-box',
      '.hero-terminal',
      '.resume-cta',
      '#about',
      '#jobs',
      '#projects',
      '#contact .numbered-heading',
      '#contact .contact-card',
    ].join(', ');

    const handleMouseMove = e => {
      const container = particlesContainerRef.current;
      if (!container || !container.interactivity) {
        return;
      }
      if (e.target && e.target.closest && e.target.closest(protectedSelector)) {
        container.interactivity.status = 'mouseleave';
        if (container.interactivity.mouse) {
          container.interactivity.mouse.position = undefined;
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="pixel-name">Massimiliano Favetta.</h2>;
  const three = <h3 className="hero-subtitle">I build things for the web.</h3>;
  const four = (
    <div className="engineering-tagline" aria-label={TAGLINE_STRING}>
      <span className="prompt-symbol">$</span>
      <span className="typed-text">{typedTagline}</span>
      <span className="cursor-block" aria-hidden="true">
        █
      </span>
    </div>
  );

  const titleItems = [one, two, three, four];

  const terminalWidget = (
    <div className="hero-terminal">
      <div className="terminal-header">
        <div className="dots">
          <span className="close" />
          <span className="minimize" />
          <span className="maximize" />
        </div>
        <span className="term-title">max@sapienza: ~ (bash)</span>
        <span className="term-badge">interactive</span>
      </div>

      <label htmlFor="terminal-cmd-input" className="terminal-body" ref={terminalBodyRef}>
        <div className="term-welcome">
          <span>●</span> Interactive shell ready — type <span>help</span> or click a command below.
        </div>

        {history.length > 0 && (
          <div className="history-list">
            {history.map((item, idx) => (
              <div className="history-item" key={idx}>
                <div className="cmd-echo">
                  <span className="user-host">guest@max:~$</span>
                  <span>{item.cmd}</span>
                </div>
                <div className="cmd-output">{item.output}</div>
              </div>
            ))}
          </div>
        )}

        <div className="input-line">
          <span className="user-host">guest@max:~$</span>
          <input
            id="terminal-cmd-input"
            type="text"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="type a command..."
            aria-label="Terminal command input"
            autoComplete="off"
            spellCheck="false"
          />
        </div>
      </label>

      <div className="terminal-QuickBar">
        <span className="quick-label">Quick run:</span>
        {QUICK_COMMANDS.map(cmd => (
          <button
            key={cmd}
            type="button"
            className="cmd-chip"
            onClick={() => executeCommand(cmd)}>
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );

  const resumeButton = (
    <a className="resume-cta" href="/resume.pdf" target="_blank" rel="noreferrer">
      <span>Check out my Resume!</span>
      <span className="cta-arrow" aria-hidden="true">
        ↗
      </span>
    </a>
  );

  return (
    <StyledHeroSection>
      <HeroParticles onLoaded={particlesLoaded} />

      <div className="hero-content">
        <div className="hero-title-box">
          {prefersReducedMotion ? (
            <>
              {titleItems.map((item, i) => (
                <div key={i}>{item}</div>
              ))}
            </>
          ) : (
            titleItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.4 + i * 0.1,
                  ease: [0.645, 0.045, 0.355, 1],
                }}>
                {item}
              </motion.div>
            ))
          )}
        </div>

        {prefersReducedMotion ? (
          <>
            {terminalWidget}
            <div>{resumeButton}</div>
          </>
        ) : (
          <>
            <motion.div
              style={{ width: '100%' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.82,
                ease: [0.645, 0.045, 0.355, 1],
              }}>
              {terminalWidget}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.95,
                ease: [0.645, 0.045, 0.355, 1],
              }}>
              {resumeButton}
            </motion.div>
          </>
        )}
      </div>
    </StyledHeroSection>
  );
};

export default Hero;
