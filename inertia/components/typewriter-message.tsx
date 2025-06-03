import { useEffect, useState } from 'react'

interface TypewriterMessageProps {
  speed?: number
  message: string
  id?: string
}

export const TypewriterMessage = ({ id, message, speed = 5 }: TypewriterMessageProps) => {
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

  return (
    <pre id={id} className="text-sm whitespace-pre-line">
      {message.slice(0, currentIndex)}
    </pre>
  )
}
