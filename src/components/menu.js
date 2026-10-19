import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'gatsby';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { navLinks } from '@config';
import { KEY_CODES } from '@utils';

const StyledMenu = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

const StyledHamburgerButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    ${({ theme }) => theme.mixins.flexCenter};
    position: relative;
    z-index: 20;
    width: 44px;
    height: 44px;
    padding: 0;
    border-radius: 10px;
    border: 1px solid ${({ menuOpen }) => (menuOpen ? 'rgba(46, 204, 113, 0.35)' : 'transparent')};
    background-color: ${({ menuOpen }) => (menuOpen ? 'rgba(46, 204, 113, 0.08)' : 'transparent')};
    color: inherit;
    transition: var(--transition);

    &:hover,
    &:focus-visible {
      border-color: rgba(46, 204, 113, 0.35);
      background-color: rgba(46, 204, 113, 0.08);
    }
  }

  .ham-box {
    display: inline-block;
    position: relative;
    width: 26px;
    height: 20px;
  }

  .ham-box-inner {
    position: absolute;
    top: 50%;
    right: 0;
    width: 26px;
    height: 2px;
    border-radius: 4px;
    background-color: var(--green);
    transition-duration: 0.22s;
    transition-property: transform;
    transition-delay: ${props => (props.menuOpen ? `0.12s` : `0s`)};
    transform: rotate(${props => (props.menuOpen ? `225deg` : `0deg`)});
    transition-timing-function: cubic-bezier(
      ${props => (props.menuOpen ? `0.215, 0.61, 0.355, 1` : `0.55, 0.055, 0.675, 0.19`)}
    );
    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      left: auto;
      right: 0;
      height: 2px;
      border-radius: 4px;
      background-color: var(--green);
      transition-timing-function: ease;
      transition-duration: 0.15s;
      transition-property: transform;
    }
    &:before {
      width: ${props => (props.menuOpen ? `100%` : `100%`)};
      top: ${props => (props.menuOpen ? `0` : `-8px`)};
      opacity: ${props => (props.menuOpen ? 0 : 1)};
      transition: ${({ menuOpen }) =>
        menuOpen ? 'var(--ham-before-active)' : 'var(--ham-before)'};
    }
    &:after {
      width: ${props => (props.menuOpen ? `100%` : `70%`)};
      bottom: ${props => (props.menuOpen ? `0` : `-8px`)};
      transform: rotate(${props => (props.menuOpen ? `-90deg` : `0`)});
      transition: ${({ menuOpen }) => (menuOpen ? 'var(--ham-after-active)' : 'var(--ham-after)')};
    }
  }
`;

const StyledBackdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  background-color: rgba(10, 12, 10, 0.65);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  z-index: 14;
`;

const StyledSidebar = styled(motion.aside)`
  ${({ theme }) => theme.mixins.flexCenter};
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  padding: 90px 28px 40px;
  width: min(78vw, 340px);
  height: 100vh;
  outline: 0;
  background: linear-gradient(165deg, rgba(36, 38, 36, 0.98) 0%, rgba(22, 24, 22, 0.98) 100%);
  border-left: 1px solid rgba(46, 204, 113, 0.22);
  box-shadow: -20px 0px 50px -15px rgba(0, 0, 0, 0.85);
  z-index: 15;

  nav {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-height: 460px;
    height: 100%;
    color: var(--lightest-slate);
    font-family: var(--font-mono);
  }

  ol {
    padding: 0;
    margin: 0;
    list-style: none;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;

    li {
      position: relative;
      width: 100%;
      counter-increment: item 1;

      a {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 14px;
        width: 100%;
        padding: 14px 20px;
        border-radius: 10px;
        background-color: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.05);
        font-family: 'Space Grotesk', var(--font-sans);
        font-size: 18px;
        font-weight: 500;
        color: var(--lightest-slate);
        transition: var(--transition);

        &:before {
          content: '0' counter(item) '.';
          color: var(--green);
          font-family: var(--font-mono);
          font-size: var(--fz-xs);
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 6px;
          background-color: var(--green-tint);
        }

        &:hover,
        &:focus-visible {
          background-color: var(--green-tint);
          border-color: rgba(46, 204, 113, 0.4);
          color: var(--green);
          transform: translateX(4px);
        }
      }
    }
  }

  .resume-link {
    ${({ theme }) => theme.mixins.bigButton};
    width: 100%;
    text-align: center;
    padding: 16px 24px;
    margin-top: 24px;
    border-radius: 10px;
    background-color: rgba(46, 204, 113, 0.06);
  }
`;

const sidebarVariants = {
  hidden: { x: '100%', opacity: 0.5 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 320,
      damping: 32,
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { duration: 0.22, ease: 'easeInOut' },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
};

const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const buttonRef = useRef(null);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  useEffect(() => {
    const onKeyDown = e => {
      if (e.key === KEY_CODES.ESCAPE || e.key === KEY_CODES.ESCAPE_IE11) {
        setMenuOpen(false);
      }
    };

    const onResize = e => {
      if (e.currentTarget.innerWidth > 768) {
        setMenuOpen(false);
      }
      window.scrollTo({ left: 0 });
    };

    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <StyledMenu>
      <Helmet>
        <body className={menuOpen ? 'blur' : ''} />
      </Helmet>

      <StyledHamburgerButton
        onClick={toggleMenu}
        menuOpen={menuOpen}
        ref={buttonRef}
        aria-label="Menu">
        <div className="ham-box">
          <div className="ham-box-inner" />
        </div>
      </StyledHamburgerButton>

      <AnimatePresence>
        {menuOpen && (
          <>
            <StyledBackdrop
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
            />

            <StyledSidebar
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              aria-hidden={!menuOpen}>
              <nav>
                {navLinks && (
                  <ol>
                    {navLinks.map(({ url, name }, i) => (
                      <motion.li key={i} variants={itemVariants}>
                        <Link
                          to={url}
                          onClick={() => {
                            setMenuOpen(false);
                            window.scrollTo({ left: 0 });
                          }}>
                          {name}
                        </Link>
                      </motion.li>
                    ))}
                  </ol>
                )}

                <motion.div variants={itemVariants} style={{ width: '100%' }}>
                  <a
                    href="/resume.pdf"
                    className="resume-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}>
                    Resume
                  </a>
                </motion.div>
              </nav>
            </StyledSidebar>
          </>
        )}
      </AnimatePresence>
    </StyledMenu>
  );
};

export default Menu;
