// =========================< IMPORTS: REACT >=================================
import { useEffect, useRef } from 'react'

// =========================< IMPORTS: LAYOUT >================================


// =========================< IMPORTS: OTHER >=================================


// =========================< IMPORTS: COMPONENTS >============================


// =========================< IMPORTS: STYLES >================================
import './TestPage9.scss'


export default function TestPage9() {
  const containerRef = useRef<HTMLDivElement>(null)


    useEffect(() => {
      const container = containerRef.current
      if (!container) return

      const createShootingStar = () => {
        const star = document.createElement('div')
        star.className = 'shooting_star'

        const top = Math.random() * window.innerHeight * 0.6
        const left = Math.random() * window.innerWidth

        star.style.top = `${top}px`
        star.style.left = `${left}px`

        container.appendChild(star)

        setTimeout(() => {
          container.removeChild(star)
        }, 2000)
      }

      const interval = setInterval(() => {
        if (Math.random() < 0.5) createShootingStar()
      }, 1000)

      return () => clearInterval(interval)
    }, [])


    return (
      <div className='TestPage9' ref={containerRef}>
        {[...Array(100)].map((_, i) => {
          const x = Math.random() * 100
          const y = Math.random() * 100
          const flicker = Math.random() * 5 + 2

          return (
            <div
              key={i}
              className='star'
              style={{
                top: `${y}%`,
                left: `${x}%`,
                animationDuration: `${flicker}s`,
              }}
            />
          )
        })}

        <div className='page-content'>Test Page</div>
      </div>
    )
}

