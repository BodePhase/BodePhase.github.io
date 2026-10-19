import React from 'react';
import { motion } from 'framer-motion';

const IconLoader = () => (
  <svg id="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <title>Loader Logo</title>
    <g>
      <motion.path
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M 50, 5 L 11, 27 L 11, 72 L 50, 95 L 89, 73 L 89, 28 z"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.85, ease: 'easeInOut' }}
      />
      <motion.text
        x="52.5"
        y="63.5"
        fill="var(--dark-slate)"
        fontSize="46px"
        fontFamily="var(--font-pixel)"
        textAnchor="middle"
        letterSpacing="1px"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.55, duration: 0.35, ease: 'easeOut' }}>
        MF
      </motion.text>
      <motion.text
        x="50"
        y="61"
        fill="var(--lightest-slate)"
        fontSize="46px"
        fontFamily="var(--font-pixel)"
        textAnchor="middle"
        letterSpacing="1px"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.55, duration: 0.35, ease: 'easeOut' }}>
        MF
      </motion.text>
    </g>
  </svg>
);

export default IconLoader;
