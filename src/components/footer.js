import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from '@components/icons';
import { socialMedia } from '@config';

const StyledFooter = styled.footer`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  height: auto;
  min-height: 80px;
  padding: 20px 15px 30px;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
`;

const StyledSocialLinks = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    max-width: 270px;
    margin: 0 auto 14px;
    color: var(--light-slate);
  }

  ul {
    ${({ theme }) => theme.mixins.flexBetween};
    padding: 0;
    margin: 0;
    list-style: none;

    a {
      padding: 10px;
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

const StyledCredit = styled.div`
  color: var(--slate);
  font-family: var(--font-mono);
  font-size: var(--fz-xxs);
  line-height: 1.6;

  a {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: 10px 16px;
    border-radius: 10px;
    transition: var(--transition);

    &:hover,
    &:focus-visible {
      color: var(--green);
      background-color: rgba(46, 204, 113, 0.05);
    }
  }

  .status-line {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    color: var(--light-slate);

    .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: var(--green);
      box-shadow: 0 0 8px var(--green);
    }
  }

  .github-stats {
    margin-top: 2px;

    & > span {
      display: inline-flex;
      align-items: center;
      margin: 0 7px;
    }
    svg {
      display: inline-block;
      margin-right: 5px;
      width: 14px;
      height: 14px;
    }
  }
`;

const Footer = () => {
  const [githubInfo, setGitHubInfo] = useState({
    stars: null,
    forks: null,
  });

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }
    fetch('https://api.github.com/repos/BodePhase/BodePhase.github.io')
      .then(response => response.json())
      .then(json => {
        const { stargazers_count, forks_count } = json;
        if (typeof stargazers_count === 'number' && typeof forks_count === 'number') {
          setGitHubInfo({
            stars: stargazers_count,
            forks: forks_count,
          });
        }
      })
      .catch(e => console.error(e));
  }, []);

  return (
    <StyledFooter>
      <StyledSocialLinks>
        <ul>
          {socialMedia &&
            socialMedia.map(({ name, url }, i) => (
              <li key={i}>
                <a href={url} aria-label={name} target="_blank" rel="noreferrer">
                  <Icon name={name} />
                </a>
              </li>
            ))}
        </ul>
      </StyledSocialLinks>

      <StyledCredit tabIndex="-1">
        <a
          href="https://github.com/BodePhase/BodePhase.github.io"
          target="_blank"
          rel="noopener noreferrer">
          <div className="status-line">
            <span className="dot" aria-hidden="true" />
            <span>Designed &amp; Built by Massimiliano Favetta</span>
          </div>

          {githubInfo.stars !== null && githubInfo.forks !== null && (
            <div className="github-stats">
              <span>
                <Icon name="Star" />
                <span>{githubInfo.stars.toLocaleString()}</span>
              </span>
              <span>
                <Icon name="Fork" />
                <span>{githubInfo.forks.toLocaleString()}</span>
              </span>
            </div>
          )}
        </a>
      </StyledCredit>
    </StyledFooter>
  );
};

Footer.propTypes = {
  githubInfo: PropTypes.object,
};

export default Footer;
