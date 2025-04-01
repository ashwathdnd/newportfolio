import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <section id="contact" className="section-padding bg-tertiary">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="heading text-center text-secondary">Get in Touch</h2>
          <p className="subheading text-center">
            Feel free to reach out for recruitment purposes or even friendly chats.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mt-12 text-center space-y-8"
        >
          <div className="bg-tertiary/50 backdrop-blur-sm p-8 rounded-2xl border border-secondary/20">
            <h3 className="text-xl font-semibold mb-4 text-secondary">Contact Information</h3>
            <p className="text-textSecondary text-lg">ashwathdnd@gmail.com</p>
          </div>

          <div className="bg-tertiary/50 backdrop-blur-sm p-8 rounded-2xl border border-secondary/20">
            <h3 className="text-xl font-semibold mb-4 text-secondary">Social Links</h3>
            <div className="flex justify-center gap-8">
              <motion.a
                href="https://github.com/ashwathdnd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-textSecondary hover:text-secondary transition-colors text-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                GitHub
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/ashwathd/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-textSecondary hover:text-secondary transition-colors text-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                LinkedIn
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact; 