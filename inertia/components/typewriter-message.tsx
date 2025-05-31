import { useEffect, useState } from 'react'

export const TypewriterMessage = ({ message, speed = 5 }: { message: string; speed?: number }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(
      () =>
        setCurrentIndex((prev) => {
          if (prev <= message.length) {
            return prev + 1
          } else {
            clearInterval(interval)
            return prev
          }
        }),
      speed
    )
  }, [message, speed])

  return <p>{message.slice(0, currentIndex)}</p>
}
