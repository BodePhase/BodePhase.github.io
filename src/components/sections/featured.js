import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

const StyledProjectsGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};

  a {
    position: relative;
    z-index: 1;
  }
`;

const StyledProject = styled(motion.li)`
  position: relative;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    grid-gap: 0;
    background-color: rgba(36, 38, 36, 0.98);
    border: 1px solid var(--glass-border);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 18px 35px -15px rgba(0, 0, 0, 0.85);
  }

  &:not(:last-of-type) {
    margin-bottom: 100px;

    @media (max-width: 768px) {
      margin-bottom: 50px;
    }

    @media (max-width: 480px) {
      margin-bottom: 40px;
    }
  }

  &:nth-of-type(odd) {
    .project-content {
      grid-column: 7 / -1;
      text-align: right;

      @media (max-width: 1080px) {
        grid-column: 5 / -1;
      }
      @media (max-width: 768px) {
        order: 2;
        width: 100%;
        padding: 24px 22px 20px;
        text-align: left;
      }
      @media (max-width: 480px) {
        padding: 20px 18px 16px;
      }
    }
    .project-tech-list {
      justify-content: flex-end;
      margin-left: auto;

      @media (max-width: 768px) {
        justify-content: flex-start;
        margin-left: 0;
      }
    }
    .project-links {
      justify-content: flex-end;
      margin-left: 0;
      margin-right: -10px;

      @media (max-width: 768px) {
        justify-content: flex-start;
        margin-left: -10px;
        margin-right: 0;
      }
    }
    .project-image {
      grid-column: 1 / 8;

      @media (max-width: 768px) {
        order: 1;
        width: 100%;
      }
    }
  }

  .project-content {
    position: relative;
    grid-column: 1 / 7;
    grid-row: 1 / -1;

    @media (max-width: 1080px) {
      grid-column: 1 / 9;
    }

    @media (max-width: 768px) {
      order: 2;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 24px 22px 20px;
      z-index: 5;
    }

    @media (max-width: 480px) {
      padding: 20px 18px 16px;
    }
  }

  .project-overline {
    margin: 10px 0;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    font-weight: 500;
    letter-spacing: 0.04em;

    @media (max-width: 768px) {
      margin: 0 0 6px;
    }
  }

  .project-title {
    color: var(--lightest-slate);
    font-size: clamp(22px, 5vw, 28px);
    margin: 0 0 20px;

    @media (max-width: 768px) {
      color: var(--white);
      margin: 0 0 12px;
    }
  }

  .project-description {
    ${({ theme }) => theme.mixins.boxShadow};
    position: relative;
    z-index: 2;
    padding: 25px;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    color: var(--light-slate);
    font-size: var(--fz-lg);

    @media (max-width: 768px) {
      padding: 0;
      margin-bottom: 18px;
      background-color: transparent;
      box-shadow: none;
      font-size: var(--fz-md);

      &:hover {
        box-shadow: none;
      }
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }

    strong {
      color: var(--white);
      font-weight: normal;
    }
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    position: relative;
    z-index: 2;
    margin: 18px 0 10px;
    padding: 0;
    list-style: none;
    max-width: 80%;

    @media (max-width: 1080px) {
      max-width: 68%;
    }

    li {
      margin: 0;
      padding: 4px 11px;
      border-radius: 6px;
      background-color: rgba(30, 31, 30, 0.92);
      border: 1px solid rgba(46, 204, 113, 0.25);
      color: var(--green);
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      font-weight: 500;
      white-space: nowrap;
      backdrop-filter: blur(8px);
      transition: var(--transition);

      &:hover {
        background-color: var(--green-tint);
        border-color: rgba(46, 204, 113, 0.5);
        transform: translateY(-1px);
      }
    }

    @media (max-width: 768px) {
      max-width: 100%;
      margin: 0 0 10px;
    }
  }

  .project-links {
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 8px;
    margin-left: -10px;
    color: var(--lightest-slate);

    @media (max-width: 768px) {
      margin-top: 4px;
    }

    a {
      ${({ theme }) => theme.mixins.flexCenter};
      padding: 10px;
      border-radius: 8px;

      &:hover,
      &:focus-visible {
        color: var(--green);
        background-color: rgba(46, 204, 113, 0.08);
        transform: translateY(-2px);
      }

      &.external {
        svg {
          width: 22px;
          height: 22px;
          margin-top: -4px;
        }
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }

    .cta {
      ${({ theme }) => theme.mixins.smallButton};
      margin: 10px;
    }
  }

  .project-image {
    ${({ theme }) => theme.mixins.boxShadow};
    grid-column: 6 / -1;
    grid-row: 1 / -1;
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
      order: 1;
      width: 100%;
      height: auto;
      opacity: 1;
      box-shadow: none;
      border-bottom: 1px solid var(--glass-border);
    }

    a {
      width: 100%;
      height: 100%;
      background-color: var(--green);
      border-radius: var(--border-radius);
      vertical-align: middle;

      @media (max-width: 768px) {
        background-color: var(--dark-navy);
        border-radius: 0;
      }

      &:hover,
      &:focus {
        outline: 0;

        @media (min-width: 769px) {
          &:before {
            background-color: var(--navy);
            mix-blend-mode: screen;
          }

          .img {
            filter: grayscale(100%) contrast(1) brightness(90%);
            mix-blend-mode: multiply;
            transition: none;
          }
        }
      }

      &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 3;
        transition: var(--transition);
        background-color: transparent;
        mix-blend-mode: normal;

        @media (max-width: 768px) {
          display: none;
        }
      }
    }

    .img {
      border-radius: var(--border-radius);
      mix-blend-mode: normal;
      filter: none;
      width: 100%;
      height: 100%;
      display: block;
      transition: var(--transition);

      @media (max-width: 768px) {
        border-radius: 0;
        object-fit: cover;
        width: 100%;
        max-height: 240px;
        filter: none;
        mix-blend-mode: normal;
      }
    }
  }
`;

const Featured = () => {
  const data = useStaticQuery(graphql`
    {
      featured: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/featured/" } }
        sort: { frontmatter: { date: ASC } }
      ) {
        edges {
          node {
            frontmatter {
              title
              cover {
                childImageSharp {
                  gatsbyImageData(width: 700, placeholder: BLURRED, formats: [AUTO, WEBP])
                }
              }
              tech
              github
              external
              cta
            }
            html
          }
        }
      }
    }
  `);

  const featuredProjects = data.featured.edges.filter(({ node }) => node);
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section id="projects">
      <motion.h2
        className="numbered-heading"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5 }}>
        Some Things I’ve Built
      </motion.h2>

      <StyledProjectsGrid>
        {featuredProjects &&
          featuredProjects.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { external, title, tech, github, cover, cta } = frontmatter;
            const image = getImage(cover);

            return (
              <StyledProject
                key={i}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}>
                <div className="project-content">
                  <div>
                    <p className="project-overline">Featured Project</p>

                    <h3 className="project-title">
                      <a href={external || github || '#'}>{title}</a>
                    </h3>

                    <div
                      className="project-description"
                      dangerouslySetInnerHTML={{ __html: html }}
                    />

                    {tech.length > 0 && (
                      <ul className="project-tech-list">
                        {tech.map((techItem, idx) => (
                          <li key={idx}>{techItem}</li>
                        ))}
                      </ul>
                    )}

                    <div className="project-links">
                      {cta && (
                        <a href={cta} aria-label="Course Link" className="cta">
                          Learn More
                        </a>
                      )}
                      {github && (
                        <a href={github} aria-label={`${title} GitHub repository`}>
                          <Icon name="GitHub" />
                        </a>
                      )}
                      {external && !cta && (
                        <a href={external} aria-label={`${title} external link`} className="external">
                          <Icon name="External" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="project-image">
                  <a href={external ? external : github ? github : '#'}>
                    <GatsbyImage image={image} alt={title} className="img" />
                  </a>
                </div>
              </StyledProject>
            );
          })}
      </StyledProjectsGrid>
    </section>
  );
};

export default Featured;
