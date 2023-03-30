import React, { useState, useRef, useEffect } from 'react'

import styles from './styles'

export default function _() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [componentPosition, setComponentPosition] = useState({ x: 0, y: 0 })
  const [velocity, setVelocity] = useState({ x: 0, y: 0 })
  const prevCursorPosition = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event) => {
      setCursorPosition({ x: event.clientX, y: event.clientY })
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useEffect(() => {
    updatePosition()
    // const intervalId = setInterval(() => {
    //   setComponentPosition((prevPosition) => {
    //     const dx = cursorPosition.x - prevPosition.x;
    //     const dy = cursorPosition.y - prevPosition.y;
    //     const newVelocity = {
    //       x: dx === 0 ? velocity.x * 0.95 : dx / 10,
    //       y: dy === 0 ? velocity.y * 0.95 : dy / 10,
    //     };
    //     setVelocity(newVelocity);
    //     const newX = prevPosition.x + newVelocity.x;
    //     const newY = prevPosition.y + newVelocity.y;
    //     return { x: newX, y: newY };
    //   });
    // }, 16); // Update interval time (in milliseconds) as per your requirement

    // return () => {
    //   clearInterval(intervalId);
    // };
  }, [cursorPosition])

  const updatePosition = () => {
    setComponentPosition((prevPosition) => {
      const dx = cursorPosition.x - prevPosition.x
      const dy = cursorPosition.y - prevPosition.y
      const newVelocity = {
        x: dx === 0 ? velocity.x * 0.9 : dx / 10,
        y: dy === 0 ? velocity.y * 0.9 : dy / 10,
      }
      setVelocity(newVelocity)
      const newX = prevPosition.x + newVelocity.x
      const newY = prevPosition.y + newVelocity.y

      if (newVelocity.x < 0.01 && newVelocity.y < 0.01) {
        return { x: cursorPosition.x, y: cursorPosition.y }
      }

      // detect if movement has stopped, if so decrease velocity

      return { x: newX, y: newY }
    })

    // setCursorPosition((prevPosition) => {
    //   console.log('Not changing: ', prevPosition)
    //   return prevPosition
    // })

    requestAnimationFrame(updatePosition)
  }

  useEffect(() => {
    if (prevCursorPosition.current.x !== cursorPosition.x || prevCursorPosition.current.y !== cursorPosition.y) {
      prevCursorPosition.current.x = cursorPosition.x
      prevCursorPosition.current.y = cursorPosition.y
    }
  }, [cursorPosition])

  return (
    <div style={styles.container}>
      {/* Positioner */}
      <div
        style={{
          position: 'absolute',
          left: componentPosition.x,
          top: componentPosition.y,
        }}
      >
        <h1>lawal</h1>
      </div>
    </div>
  )
}
