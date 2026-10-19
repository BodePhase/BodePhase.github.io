import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import { navLinks } from '@config';
import { useScrollDirection, usePrefersReducedMotion } from '@hooks';
import { Menu } from '@components';
import { IconLogo, IconHex } from '@components/icons';

const StyledHeader = styled.header`
  ${({ theme }) => theme.mixins.flexBetween};
  position: fixed;
  top: 0;
  z-index: 11;
  padding: 0px 50px;
  width: 100%;
  height: var(--nav-height);
  background-color: var(--navy);
  border-bottom: 1px solid transparent;
  filter: none !important;
  pointer-events: auto !important;
  user-select: auto !important;
  transition: var(--transition);

  @media (max-width: 1080px) {
    padding: 0 40px;
  }
  @media (max-width: 768px) {
    padding: 0 20px;
  }

  @media (prefers-reduced-motion: no-preference) {
    ${props =>
      props.scrollDirection === 'up' &&
      !props.scrolledToTop &&
      css`
        height: var(--nav-scroll-height);
        transform: translateY(0px);
        background-color: rgba(30, 31, 30, 0.96);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        border-bottom: 1px solid rgba(46, 204, 113, 0.18);
        box-shadow: 0 10px 30px -10px var(--navy-shadow);
      `};

    ${props =>
      props.scrollDirection === 'down' &&
      !props.scrolledToTop &&
      css`
        height: var(--nav-scroll-height);
        transform: translateY(calc(var(--nav-scroll-height) * -1));
        box-shadow: 0 10px 30px -10px var(--navy-shadow);
      `};
  }
`;

const StyledNav = styled.nav`
  ${({ theme }) => theme.mixins.flexBetween};
  position: relative;
  width: 100%;
  color: var(--lightest-slate);
  font-family: var(--font-mono);
  counter-reset: item 0;
  z-index: 12;

  .logo {
    ${({ theme }) => theme.mixins.flexCenter};

    a {
      color: var(--green);
      width: 46px;
      height: 46px;
      position: relative;
      z-index: 1;

      .hex-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        @media (prefers-reduced-motion: no-preference) {
          transition: var(--transition);
        }
      }

      .logo-container {
        position: relative;
        width: 100%;
        height: 100%;
        z-index: 1;
        svg {
          fill: none;
          user-select: none;
          @media (prefers-reduced-motion: no-preference) {
            transition: var(--transition);
          }
          polygon#Shape {
            fill: var(--navy);
          }
        }
      }

      &:hover,
      &:focus-visible {
        outline: 0;
        transform: translate(-3px, -3px);
        filter: drop-shadow(0 4px 12px var(--green-glow));
        .hex-container {
          transform: translate(4px, 3px);
        }
      }
    }
  }
`;

const StyledLinks = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 14px;

  @media (max-width: 768px) {
    display: none;
  }

  ol {
    ${({ theme }) => theme.mixins.flexBetween};
    padding: 5px 8px;
    margin: 0;
    list-style: none;
    background-color: var(--light-navy);
    border: 1px solid var(--glass-border);
    border-radius: 12px;
    gap: 4px;

    li {
      margin: 0;
      position: relative;
      counter-increment: item 1;
      font-size: var(--fz-xs);

      a {
        position: relative;
        display: inline-flex;
        align-items: center;
        padding: 8px 14px;
        border-radius: 8px;
        color: var(--light-slate);
        font-weight: 500;
        transition: color 0.2s ease;

        &.active {
          color: var(--white);
        }

        .nav-active-pill {
          position: absolute;
          inset: 0;
          border-radius: 8px;
          background-color: var(--green-tint);
          border: 1px solid rgba(46, 204, 113, 0.35);
          z-index: 0;
        }

        .nav-text {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;

          &:before {
            content: '0' counter(item) '.';
            margin-right: 6px;
            color: var(--green);
            font-size: var(--fz-xxs);
            font-weight: 600;
            transition: transform 0.2s ease;
          }
        }

        &:hover,
        &:focus-visible {
          color: var(--white);

          .nav-text:before {
            transform: translateY(-1px);
          }
        }
      }
    }
  }

  .resume-button {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 10px 16px;
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    font-weight: 500;
    color: var(--green);
    background: linear-gradient(135deg, rgba(46, 204, 113, 0.14) 0%, rgba(30, 31, 30, 0.98) 100%),
      var(--navy);
    border: 1px solid rgba(46, 204, 113, 0.6);
    border-radius: 10px;
    transition: var(--transition);

    .arrow {
      font-size: 1.1em;
      line-height: 1;
      transition: transform 0.2s ease;
    }

    &:hover,
    &:focus-visible {
      color: var(--lightest-slate);
      background: linear-gradient(135deg, rgba(46, 204, 113, 0.26) 0%, rgba(30, 31, 30, 0.98) 100%),
        var(--navy);
      border-color: var(--green);
      box-shadow: 0 6px 18px -4px var(--green-glow), 2px 2px 0 0 var(--green);
      transform: translate(-2px, -2px);

      .arrow {
        transform: translate(2px, -2px);
        color: var(--green);
      }
    }
  }
`;

const Nav = ({ isHome }) => {
  const scrollDirection = useScrollDirection('down');
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const [activeSection, setActiveSection] = useState('');
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      const isTop = window.scrollY < 50;
      setScrolledToTop(isTop);
      if (isTop) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isHome || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const sectionIds = navLinks.map(link => link.url.replace('/#', ''));
    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: 0 },
    );

    sections.forEach(sec => observer.observe(sec));
    return () => observer.disconnect();
  }, [isHome]);

  const handleSectionClick = (e, url) => {
    if (isHome && url.startsWith('/#')) {
      e.preventDefault();
      const id = url.replace('/#', '');
      const el = document.getElementById(id);
      if (el) {
        setActiveSection(id);
        window.history.pushState(null, '', url);
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const Logo = (
    <div className="logo" tabIndex="-1">
      {isHome ? (
        <a
          href="/"
          aria-label="home"
          onClick={e => {
            e.preventDefault();
            setActiveSection('');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}>
          <div className="hex-container">
            <IconHex />
          </div>
          <div className="logo-container">
            <IconLogo />
          </div>
        </a>
      ) : (
        <Link to="/" aria-label="home">
          <div className="hex-container">
            <IconHex />
          </div>
          <div className="logo-container">
            <IconLogo />
          </div>
        </Link>
      )}
    </div>
  );

  const ResumeLink = (
    <a className="resume-button" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
      <span>Resume</span>
      <span className="arrow" aria-hidden="true">
        ↗
      </span>
    </a>
  );

  return (
    <StyledHeader scrollDirection={scrollDirection} scrolledToTop={scrolledToTop}>
      <StyledNav>
        {prefersReducedMotion ? (
          <>
            {Logo}
            <StyledLinks>
              <ol>
                {navLinks &&
                  navLinks.map(({ url, name }, i) => {
                    const secId = url.replace('/#', '');
                    const isActive = activeSection === secId;
                    return (
                      <li key={i}>
                        <Link
                          to={url}
                          className={isActive ? 'active' : ''}
                          onClick={e => handleSectionClick(e, url)}>
                          <span className="nav-text">{name}</span>
                        </Link>
                      </li>
                    );
                  })}
              </ol>
              <div>{ResumeLink}</div>
            </StyledLinks>
            <Menu isHome={isHome} />
          </>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}>
              {Logo}
            </motion.div>

            <StyledLinks>
              <ol>
                {navLinks &&
                  navLinks.map(({ url, name }, i) => {
                    const secId = url.replace('/#', '');
                    const isActive = activeSection === secId;
                    return (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: isHome ? i * 0.08 + 0.1 : 0 }}>
                        <Link
                          to={url}
                          className={isActive ? 'active' : ''}
                          onClick={e => handleSectionClick(e, url)}>
                          {isActive && (
                            <motion.span
                              className="nav-active-pill"
                              layoutId="activeNavPill"
                              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                            />
                          )}
                          <span className="nav-text">{name}</span>
                        </Link>
                      </motion.li>
                    );
                  })}
              </ol>

              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: isHome ? navLinks.length * 0.08 + 0.1 : 0,
                }}>
                {ResumeLink}
              </motion.div>
            </StyledLinks>

            <Menu isHome={isHome} />
          </>
        )}
      </StyledNav>
    </StyledHeader>
  );
};

Nav.propTypes = {
  isHome: PropTypes.bool,
};

export default Nav;
