import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-tertiary py-8">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="flex space-x-6">
            <motion.a
              href="https://github.com/ashwathdnd"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-textSecondary hover:text-secondary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/ashwathd/"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-textSecondary hover:text-secondary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </motion.a>
            <motion.a
              href="mailto:ashwathdnd@gmail.com"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-textSecondary hover:text-secondary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Email
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 