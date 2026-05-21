import React from 'react'
import { motion } from 'framer-motion'

const skillCategories = [
  {
    name: "Data Science & Analysis",
    color: "#0ea5e9",
    skills: ["Python", "Pandas", "NumPy", "Matplotlib"]
  },
  {
    name: "Database & Backend",
    color: "#10b981",
    skills: ["SQL", "MySQL"]
  },
]

const Skills = () => {
  return (
    <section id="skills" className="container">
      <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
        <h2 className="section-title">Experienced Skills</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem' }}>
          Blending organic creativity with robust engineering to grow impactful digital products.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
        {skillCategories.map((cat, idx) => (
          <motion.div
            key={idx}
            className="glass"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            viewport={{ once: true }}
            style={{ padding: '3.5rem', borderTop: `6px solid ${cat.color}`, background: 'white' }}
          >
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.8rem',
              color: '#0c4a6e',
              marginBottom: '2rem'
            }}>
              {cat.name}
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
              {cat.skills.map((skill, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, delay: (idx * 0.1) + (i * 0.05) }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 0,
                    backgroundColor: cat.color,
                    color: 'white',
                    transition: { duration: 0.2 }
                  }}
                  style={{
                    padding: '0.6rem 1.4rem',
                    borderRadius: '50px',
                    border: `2px solid ${cat.color}22`,
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    color: cat.color,
                    background: `${cat.color}08`,
                    cursor: 'pointer',
                    transition: 'background-color 0.2s, color 0.2s'
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Skills
