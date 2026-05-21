import React from 'react'
import { motion } from 'framer-motion'

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.02,
        y: -15,
        rotateZ: 0.5,
        transition: { duration: 0.4, ease: "easeOut" }
      }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="project-card glass"
      onClick={() => project.link && window.open(project.link, '_blank')}
      style={{
        overflow: 'hidden',
        borderRadius: '32px',
        position: 'relative',
        cursor: 'pointer',
        border: '1px solid rgba(255, 255, 255, 0.4)',
        background: 'rgba(255, 255, 255, 0.6)',
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Image Container with Grayscale to Color & Blur effects */}
      <div style={{ position: 'relative', width: '100%', height: '280px', overflow: 'hidden' }}>
        <motion.div
          style={{
            width: '100%',
            height: '100%',
            backgroundImage: `url(${project.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(100%) blur(0px)', // Initial state
          }}
          whileHover={{
            filter: 'grayscale(0%) blur(0px)',
            scale: 1.05,
            transition: { duration: 0.5 }
          }}
        />

        {/* Color Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.2 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: project.color || 'var(--primary)',
            pointerEvents: 'none'
          }}
        />
      </div>

      <div style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <span style={{
            fontSize: '0.8rem',
            fontWeight: 800,
            letterSpacing: '0.1em',
            color: project.color || 'var(--primary)',
            textTransform: 'uppercase'
          }}>
            {project.category}
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{project.year}</span>
        </div>

        <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#0c4a6e' }}>{project.title}</h3>

        {/* Opacity Fade Description */}
        <motion.p
          initial={{ opacity: 0.6 }}
          whileHover={{ opacity: 1 }}
          style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '2rem' }}
        >
          {project.description}
        </motion.p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {project.tags.map((tag, i) => (
            <span key={i} style={{
              padding: '0.4rem 1rem',
              background: 'white',
              borderRadius: '100px',
              fontSize: '0.8rem',
              border: '1px solid #e2e8f0',
              color: '#64748b'
            }}>
              {tag}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: project.color || 'var(--primary)', fontWeight: 800, fontSize: '0.9rem' }}>
          VIEW PROJECT <span style={{ fontSize: '1.2rem' }}>→</span>
        </div>
      </div>
    </motion.div>
  )
}

const Projects = () => {
  const projectList = [
    {
      title: "Indian Crime",
      category: "DATA ANALYSIS",
      description: "Crime data analysis project using Python, Pandas, NumPy, and Matplotlib. Focuses on data visualization and insight generation.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      year: "2024",
      color: "#0ea5e5",
      tags: ["Python", "Pandas", "NumPy", "Matplotlib"],
      link: "https://github.com/samarthshah1308/indian-crime"
    },
    {
      title: "QA Automation",
      category: "AUTOMATION TESTING",
      description: "Automation testing using Playwright and Python. Involves website testing, comprehensive reporting, and workflow automation.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      year: "2024",
      color: "#10b981",
      tags: ["Python", "Playwright"],
      link: "https://github.com/samarthshah1308/QA-Automation"
    },
    {
      title: "Medicare Hospital Agent",
      category: "AI DEVELOPMENT",
      description: "AI Voice Agent based hospital assistant project. Includes appointment booking and voice interaction features.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      year: "2024",
      color: "#f59e0b",
      tags: ["FastAPI", "React", "Supabase", "Groq", "Pipecat"],
      link: "https://github.com/samarthshah1308/medicare-hospital-Agent"
    }
  ]

  return (
    <section id="projects" className="container" style={{ padding: '10rem 0' }}>
      <div style={{ marginBottom: '5rem', maxWidth: '800px' }}>
        <h4 style={{ color: 'var(--primary)', fontWeight: 800, letterSpacing: '0.2em', marginBottom: '1.5rem' }}>SELECTED WORK</h4>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, color: '#0c4a6e' }}>
          Merging <span style={{ color: 'var(--secondary)' }}>Innovation</span> with Natural Aesthetics.
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '3rem' }}>
        {projectList.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}

export default Projects
