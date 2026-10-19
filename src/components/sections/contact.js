import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import { email } from '@config';
import { usePrefersReducedMotion } from '@hooks';

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(46, 204, 113, 0.7);
  }
  70% {
    box-shadow: 0 0 0 8px rgba(46, 204, 113, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(46, 204, 113, 0);
  }
`;

const StyledContactSection = styled(motion.section)`
  max-width: 900px;
  margin: 0 auto 100px;

  @media (max-width: 768px) {
    margin: 0 auto 60px;
  }

  .contact-card {
    position: relative;
    max-width: 680px;
    margin: 0 auto;
    padding: clamp(32px, 6vw, 52px) clamp(22px, 5vw, 48px);
    border-radius: 16px;
    background: radial-gradient(
        circle at 50% 0%,
        rgba(46, 204, 113, 0.11) 0%,
        rgba(36, 38, 36, 0.98) 65%
      ),
      var(--navy);
    border: 1px solid rgba(46, 204, 113, 0.22);
    box-shadow: 0 25px 50px -15px rgba(0, 0, 0, 0.85), 0 0 20px 12px var(--navy);
    text-align: center;
    overflow: hidden;
    transition: var(--transition);

    &:hover {
      border-color: rgba(46, 204, 113, 0.4);
    }
  }

  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 6px 14px;
    margin-bottom: 20px;
    border-radius: 999px;
    background-color: rgba(46, 204, 113, 0.08);
    border: 1px solid rgba(46, 204, 113, 0.25);
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    color: var(--lightest-slate);
    letter-spacing: 0.03em;

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--green);
      animation: ${pulse} 2s infinite;
    }
  }

  .title {
    font-family: 'Space Grotesk', var(--font-sans);
    font-size: clamp(34px, 5.5vw, 54px);
    font-weight: 700;
    color: var(--lightest-slate);
    margin: 0 0 18px;
    letter-spacing: -0.02em;
  }

  .description {
    max-width: 500px;
    margin: 0 auto;
    color: var(--light-slate);
    font-size: clamp(15px, 2vw, 17px);
    line-height: 1.65;
  }

  .actions-wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 14px;
    margin-top: 36px;

    @media (max-width: 480px) {
      flex-direction: column;
      width: 100%;
    }
  }

  .email-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 15px 28px;
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    font-weight: 500;
    color: var(--green);
    background: linear-gradient(135deg, rgba(46, 204, 113, 0.16) 0%, rgba(30, 31, 30, 0.98) 100%),
      var(--navy);
    border: 1px solid rgba(46, 204, 113, 0.7);
    border-radius: 10px;
    transition: var(--transition);

    @media (max-width: 480px) {
      width: 100%;
    }

    .arrow {
      font-size: 1.15em;
      line-height: 1;
      transition: transform 0.25s ease;
    }

    &:hover,
    &:focus-visible {
      color: var(--white);
      background: linear-gradient(135deg, rgba(46, 204, 113, 0.28) 0%, rgba(30, 31, 30, 0.98) 100%),
        var(--navy);
      border-color: var(--green);
      box-shadow: 0 10px 25px -6px var(--green-glow), 3px 3px 0 0 var(--green);
      transform: translate(-3px, -3px);

      .arrow {
        transform: translate(3px, -3px);
        color: var(--green);
      }
    }
  }

  .copy-terminal-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 15px 22px;
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    color: var(--light-slate);
    background-color: var(--dark-navy);
    border: 1px solid var(--glass-border);
    border-radius: 10px;
    transition: var(--transition);

    @media (max-width: 480px) {
      width: 100%;
    }

    .prompt {
      color: var(--green);
      font-weight: 600;
    }

    &:hover,
    &:focus-visible {
      color: var(--lightest-slate);
      border-color: rgba(46, 204, 113, 0.45);
      background-color: var(--light-navy);
      transform: translateY(-2px);
    }
  }
`;

const Contact = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <StyledContactSection
      id="contact"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: [0.645, 0.045, 0.355, 1] }}>
      <h2 className="numbered-heading">What’s Next?</h2>

      <div className="contact-card">
        <div className="status-badge">
          <span className="status-dot" />
          <span>Available for new opportunities</span>
        </div>

        <h3 className="title">Get In Touch</h3>

        <p className="description">
          I’m currently open to new engineering opportunities, collaborations, or technical
          projects. Whether you have a question or just want to say hi, my inbox is always open!
        </p>

        <div className="actions-wrapper">
          <a className="email-link" href={`mailto:${email}`}>
            <span>Say Hello</span>
            <span className="arrow" aria-hidden="true">
              ↗
            </span>
          </a>

          <button
            type="button"
            className="copy-terminal-btn"
            onClick={handleCopyEmail}
            aria-label="Copy email address to clipboard">
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.span
                  key="copied"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  style={{ color: 'var(--green)', fontWeight: 500 }}>
                  ✓ Copied to clipboard!
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}>
                  <span className="prompt">$</span> copy {email}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </StyledContactSection>
  );
};

export default Contact;
