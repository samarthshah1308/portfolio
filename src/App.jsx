import React, { useEffect, useState, useRef } from 'react'
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence, useInView } from 'framer-motion'
import Background3D from './components/Background3D'
import Hero3D from './components/Hero3D'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import './App.css'

const CustomCursor = () => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [isHovering, setIsHovering] = useState(false)
  const springConfig = { damping: 25, stiffness: 300 }
  const followerX = useSpring(mouseX, springConfig)
  const followerY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const moveMouse = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    const handleHover = () => setIsHovering(true)
    const handleLeave = () => setIsHovering(false)
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .interactive-text, .flip-card')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleHover)
      el.addEventListener('mouseleave', handleLeave)
    })
    window.addEventListener('mousemove', moveMouse)
    return () => {
      window.removeEventListener('mousemove', moveMouse)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleHover)
        el.removeEventListener('mouseleave', handleLeave)
      })
    }
  }, [])

  return (
    <>
      <motion.div className="cursor" style={{ left: mouseX, top: mouseY, x: '-50%', y: '-50%' }} />
      <motion.div
        className="cursor-follower"
        style={{
          left: followerX,
          top: followerY,
          x: '-50%',
          y: '-50%',
          scale: isHovering ? 1.5 : 1,
          borderColor: 'var(--primary)',
          backgroundColor: isHovering ? 'rgba(14, 165, 233, 0.1)' : 'transparent'
        }}
      />
    </>
  )
}

const FlipCard = ({ title, desc, backDesc, color, iconColor }) => {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      className="flip-card"
      style={{ perspective: '1000px', width: '100%', height: '180px', cursor: 'pointer' }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Front */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          padding: '1.5rem',
          background: color,
          borderRadius: '16px',
          border: `1px solid ${iconColor}22`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <h4 style={{ color: iconColor, marginBottom: '0.5rem', fontWeight: 800 }}>{title}</h4>
          <p style={{ fontSize: '0.9rem', color: '#64748b' }}>{desc}</p>
        </div>

        {/* Back */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          padding: '1.5rem',
          background: iconColor,
          borderRadius: '16px',
          transform: 'rotateY(180deg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '0.85rem', color: 'white', fontWeight: 600, lineHeight: '1.4' }}>{backDesc}</p>
        </div>
      </motion.div>
    </div>
  )
}

const AssembleText = ({ text, className, style, delay = 0 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const letters = text.split("")
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({ opacity: 1, transition: { staggerChildren: 0.03, delayChildren: 0.04 * i + delay } }),
  }
  const child = {
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", damping: 12, stiffness: 100 } },
    hidden: { opacity: 0, y: 20, scale: 1.5 },
  }
  return (
    <motion.h2 ref={ref} style={{ display: "flex", flexWrap: "wrap", ...style }} variants={container} initial="hidden" animate={isInView ? "visible" : "hidden"} className={className}>
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index} style={{ display: "inline-block", whiteSpace: "pre" }}>{letter}</motion.span>
      ))}
    </motion.h2>
  )
}

const NaturePulse = ({ x, y }) => {
  return (
    <div style={{ position: 'fixed', top: y, left: x, pointerEvents: 'none', zIndex: 9999 }}>
      <motion.div initial={{ scale: 0, opacity: 1 }} animate={{ scale: 4, opacity: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} style={{ width: '20px', height: '20px', background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)', borderRadius: '50%' }} />
    </div>
  )
}

const InteractiveText = ({ children, style, className }) => {
  const [clickPos, setClickPos] = useState(null)
  const handleClick = (e) => {
    setClickPos({ x: e.clientX, y: e.clientY })
    setTimeout(() => setClickPos(null), 1000)
  }
  return (
    <motion.div
      onClick={handleClick}
      whileHover={{ scale: 1.0, x: 10 }}
      transition={{ type: "spring", stiffness: 200, damping: 7 }}
      className={`interactive-text ${className}`}
      style={{ cursor: 'pointer', ...style }}
    >
      {children}
      {clickPos && <NaturePulse x={clickPos.x} y={clickPos.y} />}
    </motion.div>
  )
}

const SpreadText = ({ text, className, style }) => {
  const letters = text.split("")
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])
  return (
    <h1 className={className} style={{ ...style, display: 'flex', flexWrap: 'wrap' }}>
      {letters.map((letter, i) => <Letter key={i} letter={letter} mouseX={mouseX} mouseY={mouseY} />)}
    </h1>
  )
}

const Letter = ({ letter, mouseX, mouseY }) => {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { damping: 20, stiffness: 150 })
  const springY = useSpring(y, { damping: 20, stiffness: 150 })
  useTransform([mouseX, mouseY], ([latestX, latestY]) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const dx = centerX - latestX
      const dy = centerY - latestY
      const distance = Math.sqrt(dx * dx + dy * dy)
      const radius = 100
      if (distance < radius) {
        const force = (radius - distance) / radius
        x.set(dx * force * 0.5); y.set(dy * force * 0.5)
      } else {
        x.set(0); y.set(0)
      }
    }
  })
  return <motion.span ref={ref} style={{ x: springX, y: springY, display: 'inline-block', whiteSpace: 'pre' }}>{letter}</motion.span>
}

const NatureBloom = ({ x, y }) => {
  const particles = Array.from({ length: 12 })
  return (
    <div style={{ position: 'fixed', top: y, left: x, pointerEvents: 'none', zIndex: 9999 }}>
      {particles.map((_, i) => (
        <motion.div key={i} initial={{ scale: 0, x: 0, y: 0, opacity: 1 }} animate={{ scale: [0, 1.2, 0], x: (Math.random() - 0.5) * 200, y: (Math.random() - 0.5) * 200, rotate: Math.random() * 360, opacity: [1, 1, 0] }} transition={{ duration: 0.8, ease: "easeOut" }} style={{ position: 'absolute', width: '12px', height: '12px', backgroundColor: i % 2 === 0 ? 'var(--secondary)' : 'var(--primary)', borderRadius: i % 3 === 0 ? '50% 0 50% 0' : '50%' }} />
      ))}
    </div>
  )
}

const InnovativeButton = ({ children, href, className, style }) => {
  const [clickPos, setClickPos] = useState(null)
  const handleClick = (e) => {
    setClickPos({ x: e.clientX, y: e.clientY })
    setTimeout(() => setClickPos(null), 1000)
    if (href.startsWith("#")) {
      e.preventDefault()
      setTimeout(() => {
        const target = document.querySelector(href)
        if (target) target.scrollIntoView({ behavior: 'smooth' })
      }, 400)
    }
  }
  return (
    <>
      <motion.a href={href} className={className} style={style} onClick={handleClick} whileTap={{ scale: 0.95 }}>{children}</motion.a>
      {clickPos && <NatureBloom x={clickPos.x} y={clickPos.y} />}
    </>
  )
}

function App() {
  const aboutImageRef = useRef(null)
  const isAboutInView = useInView(aboutImageRef, { margin: "-200px" })
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [0, 1000], [5, -5])
  const rotateY = useTransform(mouseX, [0, 1000], [-5, 5])

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX)
    mouseY.set(e.clientY)
  }

  return (
    <div className="app-container" onMouseMove={handleMouseMove}>
      <Background3D />
      <CustomCursor />

      <nav>
        <div className="container">
          <div className="logo">SAMARTH</div>
          <div style={{ display: 'flex', gap: '2.5rem' }}>
            <InnovativeButton href="#about" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>ABOUT</InnovativeButton>
            <InnovativeButton href="#skills" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>SKILLS</InnovativeButton>
            <InnovativeButton href="#projects" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>WORK</InnovativeButton>
            <InnovativeButton href="#contact" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>SAY HELLO</InnovativeButton>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-container container" id="home" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
        <div className="hero-content" style={{ maxWidth: '800px' }}>
          <motion.div initial={{ opacity: 2, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ fontFamily: 'var(--font-body)', fontSize: '2.5rem', color: '#242424ff', fontStyle: 'Times New Roman', fontWeight: 800, marginBottom: '1rem' }}>DATA ANALYST & AUTOMATION ENGINEER .</motion.div>
          <SpreadText text="Crafting Digital Experiences" className="hero-title" style={{ fontSize: 'clamp(2rem, 3vw, 4rem)', lineHeight: 1.1, color: '#535353ff' }} />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.4 }} style={{ color: 'var(--text-secondary)', fontSize: '1.4rem', marginTop: '2rem', maxWidth: '650px' }}>I build data-driven insights and robust automation frameworks to streamline workflows and solve complex problems.</motion.p>
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '3rem' }}>
            <InnovativeButton href="#skills" className="btn btn-primary">My Skills</InnovativeButton>
            <InnovativeButton href="#projects" className="btn btn-outline">View My Work</InnovativeButton>
            <InnovativeButton href="#contact" className="btn btn-outline">Start a Project</InnovativeButton>
          </div>
        </div>
        <Hero3D />
      </section>

      {/* About Section with Advanced Transformative Design */}
      <section id="about" className="container">
        <div className="glass" style={{ padding: '5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '5rem', alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: '1.8' }}>
                I am passionate about building intelligent systems and automating complex workflows. With expertise in Python development, Data Analysis, and AI/ML, I focus on creating scalable data solutions, reliable QA automation, and innovative tools like the Medicare Hospital Voice Agent.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <FlipCard
                  title="PRECISION"
                  desc="Data-driven and accurate models."
                  backDesc="Ensuring every insight and automated workflow is highly reliable and robust."
                  color="#f0f9ff"
                  iconColor="#0369a1"
                />
                <FlipCard
                  title="INNOVATION"
                  desc="Intelligent and automated systems."
                  backDesc="Building AI solutions and comprehensive testing frameworks that scale with your needs."
                  color="#f0fdf4"
                  iconColor="#15803d"
                />
              </div>
            </motion.div>

            <div style={{ textAlign: 'center', position: 'relative' }}>
              <motion.div
                ref={aboutImageRef}
                style={{
                  rotateX,
                  rotateY,
                  perspective: 1000,
                  width: '100%',
                  height: '400px',
                  background: 'url("https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '32px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }}
                animate={{
                  filter: isAboutInView ? 'grayscale(0%) blur(0px)' : 'grayscale(100%) blur(10px)',
                  opacity: isAboutInView ? 1 : 0.5,
                  scale: isAboutInView ? 1 : 0.95
                }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                style={{ position: 'absolute', bottom: '-20px', right: '-20px', padding: '2rem', background: 'white', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', cursor: 'pointer' }}
              >
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Skills />
      <Projects />
      <Contact />

      <footer style={{ padding: '8rem 0 4rem', textAlign: 'center', background: 'white' }}>
        <div className="container">
          <div className="logo" style={{ fontSize: '3rem', marginBottom: '2.5rem' }}>SAMARTH</div>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '3.5rem', maxWidth: '500px', margin: '0 auto 3.5 rem' }}>Building a greener, cleaner web experience for everyone.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem' }}>
            <InnovativeButton href="#" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 700 }}>GITHUB</InnovativeButton>
            <InnovativeButton href="#" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 700 }}>LINKEDIN</InnovativeButton>
            <InnovativeButton href="#" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 700 }}>EMAIL</InnovativeButton>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
