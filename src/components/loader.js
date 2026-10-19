import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { IconLoader } from '@components/icons';

const StyledLoader = styled(motion.div)`
  ${({ theme }) => theme.mixins.flexCenter};
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 50%, rgba(46, 204, 113, 0.08) 0%, var(--dark-navy) 65%);
  z-index: 99;

  .logo-wrapper {
    width: max-content;
    max-width: 105px;
    filter: drop-shadow(0 0 18px rgba(46, 204, 113, 0.25));
    svg {
      display: block;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      fill: none;
      user-select: none;
    }
  }
`;

const Loader = ({ finishLoading }) => {
  useEffect(() => {
    const timeout = setTimeout(() => finishLoading(), 1400);
    return () => clearTimeout(timeout);
  }, [finishLoading]);

  return (
    <StyledLoader
      className="loader"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0, transitionEnd: { zIndex: -1 } }}
      transition={{ delay: 1.15, duration: 0.25, ease: 'easeInOut' }}>
      <Helmet bodyAttributes={{ class: `hidden` }} />
      <motion.div
        className="logo-wrapper"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: [0.9, 1, 0.15], opacity: [0, 1, 0] }}
        transition={{ duration: 1.25, times: [0, 0.2, 1], ease: 'easeInOut' }}>
        <IconLoader />
      </motion.div>
    </StyledLoader>
  );
};

Loader.propTypes = {
  finishLoading: PropTypes.func.isRequired,
};

export default Loader;
