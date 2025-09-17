'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button } from '@/components/Common/Button'
import { useAuthStore, selectIsLogin } from '@/store/AuthStore'

interface Props {
  userId: string
  onClick: () => void
  postId?: number | string
  variant?: 'post' | 'blog'
}

export function ChatViewButton({ userId, onClick, postId, variant = 'post' }: Props) {
  const [isMobile, setIsMobile] = useState(false)
  const isLogin = useAuthStore(selectIsLogin)

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 640px)')
    const update = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    setIsMobile(mql.matches)

    if (mql.addEventListener) {
      mql.addEventListener('change', update)
    } else {
      mql.addListener(update)
    }

    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener('change', update)
      } else {
        mql.removeListener(update)
      }
    }
  }, [])

  if (isMobile) {
    const href = `/chatbot/${userId}${postId != null ? `?postId=${postId}` : ''}`
    return (
      isLogin ? (
        <Link href={href}>
          <Button>챗봇 이동</Button>
        </Link>
      ) : (
        <Button onClick={onClick}>챗봇 이동</Button>
      )
    )
  }

  return (
    <Button onClick={onClick}>
      {variant === 'post' ? '이 글에 대해 질문하기' : '이 블로그에 대해 질문하기'}
    </Button>
  )
}
