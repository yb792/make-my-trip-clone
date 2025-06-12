// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <motion.div
      className="container text-center my-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h1
        className="display-4 text-primary"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        🌍 Welcome to Yashu's Travel Portal
      </motion.h1>

      <motion.p
        className="lead text-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.7 }}
      >
        Book cheap flights & hotels across India
      </motion.p>

      <motion.div
        className="d-grid gap-2 d-md-block mt-4"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <motion.div whileHover={{ scale: 1.05 }} className="d-inline-block me-2">
          <Link to="/flights" className="btn btn-outline-primary">
            ✈️ Flights
          </Link>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="d-inline-block">
          <Link to="/hotels" className="btn btn-outline-success">
            🏨 Hotels
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Home;
