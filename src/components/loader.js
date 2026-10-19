import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { IconLoader } from '@components/icons';

const StyledLoader = styled(motion.div)`
  ${({ theme }) => theme.mixins.flexCenter};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: var(--dark-navy);
  z-index: 99;

  .logo-wrapper {
    width: max-content;
    max-width: 100px;
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
    const timeout = setTimeout(() => finishLoading(), 2400);
    return () => clearTimeout(timeout);
  }, [finishLoading]);

  return (
    <StyledLoader
      className="loader"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0, transitionEnd: { zIndex: -1 } }}
      transition={{ delay: 2.1, duration: 0.3, ease: 'easeInOut' }}>
      <Helmet bodyAttributes={{ class: `hidden` }} />
      <motion.div
        className="logo-wrapper"
        initial={{ scale: 1, opacity: 1 }}
        animate={{ scale: 0.1, opacity: 0 }}
        transition={{ delay: 1.8, duration: 0.3, ease: 'easeInOut' }}>
        <IconLoader />
      </motion.div>
    </StyledLoader>
  );
};

Loader.propTypes = {
  finishLoading: PropTypes.func.isRequired,
};

export default Loader;
