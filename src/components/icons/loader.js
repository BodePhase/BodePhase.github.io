import React from 'react';
import { motion } from 'framer-motion';

const IconLoader = () => (
  <svg id="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <title>Loader Logo</title>
    <g>
      <motion.path
        stroke="var(--green)"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M 50, 4 L 91, 27 L 91, 73 L 50, 96 L 9, 73 L 9, 27 z"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />
      <motion.g
        initial={{ opacity: 0, scale: 0.82 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.35, ease: 'easeOut' }}
        style={{ transformOrigin: '50px 50px' }}>
        <path
          fill="var(--lightest-slate)"
          d="M 22,66 L 22,34 L 29.5,34 L 37,46.5 L 44.5,34 L 52,34 L 52,66 L 45,66 L 45,45.5 L 37,58 L 29,45.5 L 29,66 Z"
        />
        <path
          fill="var(--lightest-slate)"
          d="M 57,66 L 57,34 L 79,34 L 79,40.5 L 64,40.5 L 64,47.5 L 76,47.5 L 76,54 L 64,54 L 64,66 Z"
        />
        <rect x="71" y="59" width="7" height="7" rx="1.2" fill="var(--green)" />
      </motion.g>
    </g>
  </svg>
);

export default IconLoader;
