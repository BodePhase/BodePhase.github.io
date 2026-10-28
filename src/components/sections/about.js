import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled(motion.section)`
  max-width: 920px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 48px;
    align-items: start;

    @media (max-width: 820px) {
      grid-template-columns: 1.4fr 1fr;
      grid-gap: 32px;
    }

    @media (max-width: 680px) {
      display: flex;
      flex-direction: column;
      gap: 28px;
    }
  }
`;

const StyledText = styled.div`
  width: 100%;

  p {
    color: var(--light-slate);
    font-size: clamp(15px, 2vw, 17px);
    line-height: 1.65;
  }

  .skills-title {
    margin-top: 22px;
    margin-bottom: 14px;
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    color: var(--green);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(3, minmax(100px, 1fr));
    gap: 10px;
    padding: 0;
    margin: 0;
    list-style: none;

    @media (max-width: 480px) {
      grid-template-columns: repeat(2, minmax(110px, 1fr));
      gap: 8px;
    }

    li {
      position: relative;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      border-radius: 8px;
      background-color: rgba(46, 204, 113, 0.06);
      border: 1px solid rgba(46, 204, 113, 0.2);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      color: var(--lightest-slate);
      transition: var(--transition);

      &:before {
        content: '▹';
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 1;
      }

      &:hover {
        background-color: var(--green-tint);
        border-color: rgba(46, 204, 113, 0.45);
        transform: translateY(-2px);
      }
    }
  }
`;

const StyledPic = styled.div`
  position: relative;
  max-width: 280px;
  width: 100%;
  justify-self: center;

  /* Su smartphone diventa un ritratto compatto e proporzionato in alto accanto/sopra al testo */
  @media (max-width: 680px) {
    order: -1;
    max-width: clamp(150px, 38vw, 195px);
    margin: 4px auto 8px;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: 12px;
    background-color: var(--green);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-3px, -3px);

      &:after {
        transform: translate(6px, 6px);
      }

      .img {
        filter: grayscale(100%) contrast(1);
        mix-blend-mode: multiply;
        transition: none;
      }

      &:before {
        background-color: var(--navy);
        mix-blend-mode: screen;
      }
    }

    .img {
      position: relative;
      border-radius: 12px;
      mix-blend-mode: normal;
      filter: none;
      display: block;
      width: 100%;
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 12px;
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: transparent;
    }

    &:after {
      border: 2px solid var(--green);
      top: 10px;
      left: 10px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const skills = ['PyTorch', 'TensorFlow', 'MATLAB', 'Docker', 'Node.js', 'AWS'];

  return (
    <StyledAboutSection
      id="about"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: [0.645, 0.045, 0.355, 1] }}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              Hello! My name is Massimiliano and my passion lies in building and dissecting complex
              digital systems. I am currently pursuing a degree in Computer and Systems Engineering
              at Sapienza University of Rome, where I&apos;m building a solid foundation in how
              architectures work from the ground up.
            </p>

            <p>
              However, my interest in technology goes beyond just writing clean code. I am deeply
              fascinated by cybersecurity, chess and bridging the gap between theoretical
              engineering concepts and hands-on, secure software development.
            </p>

            <p className="skills-title">Technologies I work with:</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.jpg"
              width={280}
              quality={80}
              formats={['AUTO', 'WEBP']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
