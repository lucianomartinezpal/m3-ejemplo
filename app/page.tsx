'use client'

import { useState, useEffect } from 'react'

const emojis = ['🚀', '⭐', '✨', '🎉', '💻', '🔥', '🌈', '🎨', '🌟', '💡', '🎯', '⚡', '🌙', '☀️', '🦄', '🐱', '🐶', '🦋', '🌸', '🍕', '🍔', '🍰', '🎂', '🎁', '🎈']

export default function Home() {
  const [selectedEmoji, setSelectedEmoji] = useState('🚀')
  const [animatedEmojis, setAnimatedEmojis] = useState<string[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)]
      setAnimatedEmojis(prev => [...prev.slice(-4), randomEmoji])
      setTimeout(() => {
        setAnimatedEmojis(prev => prev.slice(1))
      }, 2000)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <main style={{
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '24px',
      padding: '48px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      maxWidth: '600px',
      width: '100%',
      textAlign: 'center',
      animation: 'fadeIn 0.5s ease-in'
    }}>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.2);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-30px);
          }
        }
        .emoji-big {
          font-size: 80px;
          display: inline-block;
          animation: bounce 2s infinite;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .emoji-big:hover {
          transform: scale(1.3) rotate(10deg);
        }
        .emoji-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 12px;
          margin: 32px 0;
        }
        .emoji-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 12px;
          padding: 16px;
          font-size: 32px;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }
        .emoji-btn:hover {
          transform: translateY(-4px) scale(1.1);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
        }
        .emoji-btn:active {
          transform: scale(0.95);
        }
        .floating-emoji {
          position: fixed;
          font-size: 40px;
          pointer-events: none;
          animation: float 3s infinite;
          opacity: 0.8;
        }
        .status-badge {
          background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
          color: white;
          padding: 12px 24px;
          border-radius: 50px;
          display: inline-block;
          margin: 24px 0;
          font-weight: 600;
          box-shadow: 0 4px 15px rgba(17, 153, 142, 0.4);
        }
      `}</style>

      <h1 style={{
        fontSize: '42px',
        fontWeight: 'bold',
        marginBottom: '16px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        🎊 ¡Hola desde Vercel! 🎊
      </h1>

      <div className="status-badge">
        ✅ Funcionando Perfectamente ✅
      </div>

      <div
        className="emoji-big"
        onClick={() => {
          const random = emojis[Math.floor(Math.random() * emojis.length)]
          setSelectedEmoji(random)
        }}
        style={{ margin: '32px 0' }}
      >
        {selectedEmoji}
      </div>

      <p style={{
        fontSize: '18px',
        color: '#666',
        marginBottom: '32px',
        lineHeight: '1.6'
      }}>
        🎯 Haz clic en el emoji de arriba para cambiarlo! 🎯
      </p>

      <div className="emoji-grid">
        {emojis.slice(0, 10).map((emoji, index) => (
          <button
            key={index}
            className="emoji-btn"
            onClick={() => setSelectedEmoji(emoji)}
          >
            {emoji}
          </button>
        ))}
      </div>

      <div style={{
        marginTop: '40px',
        padding: '24px',
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        borderRadius: '16px',
        color: 'white',
        fontWeight: '600'
      }}>
        <p style={{ fontSize: '20px', marginBottom: '12px' }}>
          🌐 Deployado en Vercel 🌐
        </p>
        <p style={{ fontSize: '16px', opacity: 0.9 }}>
          Si ves esto, ¡todo funciona perfectamente! 🎉
        </p>
      </div>

      {animatedEmojis.map((emoji, index) => (
        <div
          key={index}
          className="floating-emoji"
          style={{
            left: `${20 + index * 15}%`,
            top: `${30 + index * 10}%`,
            animationDelay: `${index * 0.5}s`
          }}
        >
          {emoji}
        </div>
      ))}
    </main>
  )
}

