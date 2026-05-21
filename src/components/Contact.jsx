import React, { useState } from 'react'
import { motion } from 'framer-motion'

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch (error) {
      console.error("Submission error:", error)
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="container">
      <div className="glass" style={{ padding: '5rem', background: 'white', borderRadius: '32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '5rem', alignItems: 'center' }}>
          <div>
            <h2 className="section-title" style={{ marginBottom: '2rem' }}>Let's Build <br />Something <span style={{ color: 'var(--primary)' }}>Impactful</span></h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '3rem', lineHeight: '1.8' }}>
              Interested in collaborating on AI, automation, or data projects? Drop a message below and let's create something powerful.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '20px', background: '#f0f9ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontSize: '1.5rem' }}>📧</div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 700, letterSpacing: '0.1em' }}>EMAIL ME</div>
                  <div style={{ fontWeight: 800, color: '#0c4a6e' }}>samarthshah992@gmail.com</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '20px', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)', fontSize: '1.5rem' }}>🤖</div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 700, letterSpacing: '0.1em' }}>AVAILABILITY</div>
                  <div style={{ fontWeight: 800, color: '#0c4a6e' }}>Open for Data & AI Projects</div>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 800, color: '#64748b' }}>YOUR NAME</label>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  style={{ 
                    padding: '1.2rem', 
                    background: '#f8fafc', 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '16px', 
                    color: 'var(--text-primary)',
                    fontFamily: 'inherit'
                  }} 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 800, color: '#64748b' }}>EMAIL ADDRESS</label>
                <input 
                  type="email" 
                  placeholder="john@example.com" 
                  style={{ 
                    padding: '1.2rem', 
                    background: '#f8fafc', 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '16px', 
                    color: 'var(--text-primary)',
                    fontFamily: 'inherit'
                  }} 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 800, color: '#64748b' }}>MESSAGE</label>
                <textarea 
                  rows="5" 
                  placeholder="How can I help you grow?" 
                  style={{ 
                    padding: '1.2rem', 
                    background: '#f8fafc', 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '16px', 
                    color: 'var(--text-primary)',
                    fontFamily: 'inherit',
                    resize: 'none'
                  }}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
              
              {status === 'success' && <p style={{ color: 'var(--secondary)', textAlign: 'center', fontWeight: 700 }}>Message sent! I'll get back to you soon.</p>}
              {status === 'error' && <p style={{ color: '#ef4444', textAlign: 'center', fontWeight: 700 }}>Oops! Something went wrong. Please try again.</p>}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
