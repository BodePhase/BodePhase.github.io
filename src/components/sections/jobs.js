import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { KEY_CODES } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledJobsSection = styled(motion.section)`
  max-width: 750px;
  width: 100%;

  .inner {
    display: flex;
    align-items: flex-start;
    gap: 28px;
    width: 100%;

    @media (max-width: 600px) {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    @media (min-width: 700px) {
      min-height: 340px;
    }
  }
`;

const StyledTabList = styled.div`
  position: relative;
  z-index: 3;
  width: max-content;
  padding: 6px;
  margin: 0;
  list-style: none;
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--glass-border);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (max-width: 600px) {
    flex-direction: row;
    overflow-x: auto;
    width: 100%;
    max-width: 100%;
    padding: 6px;
    margin: 0;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const StyledTabButton = styled.button`
  ${({ theme }) => theme.mixins.link};
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 44px;
  padding: 0 18px;
  border-radius: 7px;
  background-color: transparent;
  color: ${({ isActive }) => (isActive ? 'var(--green)' : 'var(--slate)')};
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  font-weight: ${({ isActive }) => (isActive ? '600' : '400')};
  text-align: left;
  white-space: nowrap;
  transition: color 0.2s ease;

  @media (max-width: 600px) {
    ${({ theme }) => theme.mixins.flexCenter};
    width: auto;
    flex: 1 0 auto;
    padding: 0 16px;
    text-align: center;
  }

  &:hover,
  &:focus-visible {
    color: var(--green);
  }

  span.tab-label {
    position: relative;
    z-index: 2;
  }

  .active-pill {
    position: absolute;
    inset: 0;
    border-radius: 7px;
    background-color: var(--green-tint);
    border: 1px solid rgba(46, 204, 113, 0.35);
    z-index: 1;
  }
`;

const StyledTabPanels = styled.div`
  position: relative;
  flex: 1;
  min-width: 0;
  width: 100%;
`;

const StyledTabPanel = styled(motion.div)`
  width: 100%;
  height: auto;
  padding: 22px 26px;
  border-radius: 10px;
  background-color: rgba(36, 38, 36, 0.65);
  border: 1px solid var(--glass-border);

  @media (max-width: 600px) {
    padding: 18px 16px;
  }

  ul {
    ${({ theme }) => theme.mixins.fancyList};
    li {
      word-break: break-word;
    }
  }

  h3 {
    margin-bottom: 4px;
    font-size: var(--fz-xxl);
    font-weight: 600;
    line-height: 1.3;

    .company {
      color: var(--green);
    }
  }

  .range {
    margin-bottom: 20px;
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
  }
`;

const Jobs = () => {
  const data = useStaticQuery(graphql`
    query {
      jobs: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/jobs/" } }
        sort: { frontmatter: { date: DESC } }
      ) {
        edges {
          node {
            frontmatter {
              title
              company
              location
              range
              url
            }
            html
          }
        }
      }
    }
  `);

  const jobsData = data.jobs.edges;
  const [activeTabId, setActiveTabId] = useState(0);
  const [tabFocus, setTabFocus] = useState(null);
  const tabs = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  const focusTab = useCallback(() => {
    if (tabFocus === null) {
      return;
    }
    if (tabs.current[tabFocus]) {
      tabs.current[tabFocus].focus();
      return;
    }
    if (tabFocus >= tabs.current.length) {
      setTabFocus(0);
    }
    if (tabFocus < 0) {
      setTabFocus(tabs.current.length - 1);
    }
  }, [tabFocus]);

  useEffect(() => {
    focusTab();
  }, [focusTab]);

  const onKeyDown = e => {
    switch (e.key) {
      case KEY_CODES.ARROW_UP: {
        e.preventDefault();
        setTabFocus((tabFocus ?? activeTabId) - 1);
        break;
      }
      case KEY_CODES.ARROW_DOWN: {
        e.preventDefault();
        setTabFocus((tabFocus ?? activeTabId) + 1);
        break;
      }
      default: {
        break;
      }
    }
  };

  const activeJob = jobsData[activeTabId]?.node;

  return (
    <StyledJobsSection
      id="jobs"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: [0.645, 0.045, 0.355, 1] }}>
      <h2 className="numbered-heading">Experience</h2>

      <div className="inner">
        <StyledTabList role="tablist" aria-label="Job tabs" onKeyDown={onKeyDown}>
          {jobsData &&
            jobsData.map(({ node }, i) => {
              const { title } = node.frontmatter;
              const isActive = activeTabId === i;
              return (
                <StyledTabButton
                  key={i}
                  isActive={isActive}
                  onClick={() => setActiveTabId(i)}
                  ref={el => (tabs.current[i] = el)}
                  id={`tab-${i}`}
                  role="tab"
                  tabIndex={isActive ? '0' : '-1'}
                  aria-selected={isActive}
                  aria-controls={`panel-${i}`}>
                  {isActive && (
                    <motion.div
                      className="active-pill"
                      layoutId="activeJobTab"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="tab-label">{title}</span>
                </StyledTabButton>
              );
            })}
        </StyledTabList>

        <StyledTabPanels>
          <AnimatePresence mode="wait">
            {activeJob && (
              <StyledTabPanel
                key={activeTabId}
                id={`panel-${activeTabId}`}
                role="tabpanel"
                tabIndex="0"
                aria-labelledby={`tab-${activeTabId}`}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}>
                <h3>
                  <span>{activeJob.frontmatter.title}</span>
                  &nbsp;-&nbsp;
                  <span className="company">
                    {activeJob.frontmatter.url ? (
                      <a href={activeJob.frontmatter.url} className="inline-link">
                        {activeJob.frontmatter.company}
                      </a>
                    ) : (
                      activeJob.frontmatter.company
                    )}
                  </span>
                </h3>

                <p className="range">{activeJob.frontmatter.range}</p>

                <div dangerouslySetInnerHTML={{ __html: activeJob.html }} />
              </StyledTabPanel>
            )}
          </AnimatePresence>
        </StyledTabPanels>
      </div>
    </StyledJobsSection>
  );
};

export default Jobs;
