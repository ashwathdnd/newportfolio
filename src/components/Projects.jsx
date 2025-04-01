import { motion } from 'framer-motion';

const projects = [
  {
    title: "ReelAI",
    description: "A full-stack video processing platform with AI integration. Built with ReactJS, NodeJS, and PostgreSQL, featuring Clerk authentication, optimized video rendering, and cloud-native infrastructure.",
    technologies: ["ReactJS", "NodeJS", "PostgreSQL", "Clerk", "DigitalOcean", "Stripe", "Google Gemini API"],
    image: "/reelai.png",
    github: "#",
    demo: "http://reelai.studio",
    highlights: [
      "Reduced page load times by 45%",
      "30+ RESTful API endpoints",
      "99.9% uptime",
      "65% reduction in cloud costs"
    ]
  },
  {
    title: "Age Recognition ML Model",
    description: "A CNN-based computer vision system for age prediction, achieving 90% accuracy. Features real-time predictions and optimized model architecture for edge deployment.",
    technologies: ["Python", "PyTorch", "Flask", "OpenCV", "TensorFlow"],
    image: "/ml.png",
    github: "https://github.com/ashwathdnd/Age-Recognition-Model",
    demo: "#",
    highlights: [
      "90% age prediction accuracy",
      "40% model size optimization",
      "52% validation loss reduction",
      "Real-time predictions"
    ]
  },
  {
    title: "dsinetwork.org",
    description: "A comprehensive Brother Directory for Delta Sigma Iota Fraternity, serving 25 active chapters across the nation with robust SEO and security protocols.",
    technologies: ["WordPress", "PHP", "DreamHost", "SQL"],
    image: "/dsinetwork.png",
    github: "#",
    demo: "https://dsinetwork.org",
    highlights: [
      "25 active chapters",
      "Optimized search visibility",
      "Strict data privacy standards",
      "Systematic maintenance protocols"
    ]
  }
];

const Projects = () => {
  return (
    <section id="projects" className="section-padding">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="heading text-center">Featured Projects</h2>
          <p className="subheading text-center">
            Here are some of my recent projects that showcase my skills and interests.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-tertiary rounded-lg overflow-hidden"
            >
              <div className="relative h-48">
                <a
                  href={project.demo !== "#" ? project.demo : project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <div className="flex gap-4">
                      {project.github !== "#" && (
                        <a
                          href={project.github}
                          className="text-white hover:text-secondary transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          GitHub
                        </a>
                      )}
                      {project.demo !== "#" && (
                        <a
                          href={project.demo}
                          className="text-white hover:text-secondary transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </a>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-textSecondary mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-accent text-secondary rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <ul className="space-y-2">
                  {project.highlights.map((highlight, highlightIndex) => (
                    <li key={highlightIndex} className="text-textSecondary text-sm flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-secondary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 