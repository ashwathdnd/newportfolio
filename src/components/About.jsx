import { motion } from 'framer-motion';

const FlipCard = ({ title, description }) => {
  return (
    <div className="group relative h-[120px] cursor-pointer [perspective:1000px]">
      <div className="relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front of card */}
        <div className="absolute inset-0 h-full w-full bg-tertiary/50 p-4 rounded-xl [backface-visibility:hidden]">
          <h4 className="font-medium mb-2 text-secondary">{title}</h4>
        </div>
        {/* Back of card */}
        <div className="absolute inset-0 h-full w-full bg-secondary/10 p-4 rounded-xl [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <p className="text-textSecondary text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <section id="about" className="section-padding bg-tertiary">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h2 className="heading bg-clip-text text-transparent bg-gradient-to-r from-secondary to-white">About Me</h2>
            <p className="text-textSecondary mb-6">
              I'm a passionate <span className="text-secondary font-medium">Computer Science and Data Science</span> student at Rutgers University Honors College,
              with a strong focus on software engineering and machine learning. My journey in technology
              combines theoretical knowledge with practical experience in building scalable applications.
            </p>
            <p className="text-textSecondary mb-6">
              With a GPA of <span className="text-secondary font-medium">3.7/4.0</span>, I've developed expertise in <span className="text-secondary font-medium">systems programming</span>, <span className="text-secondary font-medium">computer architecture</span>,
              and <span className="text-secondary font-medium">data structures & algorithms</span>. I'm particularly interested in full-stack development,
              cloud computing, and machine learning applications.
            </p>
            <p className="text-textSecondary">
              When I'm not coding, you can find me contributing to open-source projects or exploring new
              technologies. I'm always eager to learn and apply new skills to solve real-world problems.
            </p>
          </div>
          <div className="space-y-6">
            <div className="bg-primary/50 backdrop-blur-sm p-8 rounded-2xl border border-secondary/20">
              <h3 className="text-xl font-semibold mb-4 text-secondary">Education</h3>
              <div className="space-y-2">
                <p className="text-textSecondary">Rutgers University Honors College</p>
                <p className="text-textSecondary">B.S. in <span className="text-secondary font-medium">Computer Science and Data Science</span></p>
                <p className="text-textSecondary">Expected Graduation: <span className="text-secondary font-medium">May 2025</span></p>
                <p className="text-textSecondary">GPA: <span className="text-secondary font-medium">3.7/4.0</span></p>
              </div>
            </div>

            <div className="bg-primary/50 backdrop-blur-sm p-8 rounded-2xl border border-secondary/20">
              <h3 className="text-xl font-semibold mb-4 text-secondary">Relevant Coursework</h3>
              <div className="grid grid-cols-2 gap-4">
                <FlipCard 
                  title="Systems Programming"
                  description="Low-level programming and system architecture"
                />
                <FlipCard 
                  title="Computer Architecture"
                  description="Hardware design and optimization"
                />
                <FlipCard 
                  title="Data 101"
                  description="Foundations of data science"
                />
                <FlipCard 
                  title="Data Structures & Algorithms"
                  description="Advanced programming concepts"
                />
              </div>
            </div>

            <div className="bg-primary/50 backdrop-blur-sm p-8 rounded-2xl border border-secondary/20">
              <h3 className="text-xl font-semibold mb-4 text-secondary">Certifications</h3>
              <div className="space-y-4">
                <FlipCard 
                  title="Forage's Goldman Sachs Software Engineering Experience"
                  description="Software engineering best practices and industry standards"
                />
                <FlipCard 
                  title="Forage's AWS Solutions Architecture"
                  description="Cloud architecture and AWS services"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 