// components/NavBar.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAuthStore, selectIsLogin, selectUserId, selectLogout } from '@/store/AuthStore'
import SearchBar from './SearchBar'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import {
  PencilIcon,
  ChatBubbleLeftRightIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline'
import { getUserProfile, UserProfile } from '@/apis/userApi'

export default function NavBar() {
  const isAuthenticated = useAuthStore(selectIsLogin);
  const userId = useAuthStore(selectUserId);
  const logout = useAuthStore(selectLogout);
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  const [profile, setProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    if (!userId) return
    getUserProfile(userId)
      .then(setProfile)
      .catch(console.error)
  }, [userId])

  const handleLogout = async () => {
    await logout()
    setMenuOpen(false)
  }

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!search.trim()) return
    router.push(`/search?query=${encodeURIComponent(search.trim())}`)
    setSearch('')
  }

  return (
    <header className="bg-[rgb(244,246,248)] shadow-md sticky top-0 z-50">
      <div className="md:px-16 p-3 flex justify-between items-center">
        {/* 로고 */}
        <Link href="/" className="hidden md:flex items-center mr-16">
          <div className="text-2xl font-bold text-gray-800">Bubblog</div>
        </Link>

        {/* 검색창 */}
        <SearchBar />

        {/* 메뉴 */}
        <nav className="flex items-center gap-2 md:gap-4 text-gray-700 relative">
          {isAuthenticated ? (
            <div className="relative">
              {/* 프로필 토글 버튼 */}
              <button
                onClick={() => setMenuOpen(o => !o)}
                className="flex items-center gap-3 rounded-full px-3 py-2 hover:bg-gray-200 transition-colors
                flex-shrink-0 whitespace-nowrap"
              >
                {profile ? (
                  <>
                    <Image
                      src={profile.profileImageUrl ?? '/logo.jpeg'}
                      alt={profile.nickname}
                      width={10}
                      height={10}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="hidden lg:inline text-lg font-semibold text-gray-800 text-nowrap">
                      {profile.nickname}
                    </span>
                  </>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
                    <UserIcon className="h-6 w-6" />
                  </div>
                )}
                <ChevronDownIcon
                  className={`h-5 w-5 text-gray-600 transition-transform ${
                    menuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* 드롭다운 메뉴 */}
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10">
                  <Link
                    href={`/blog/${userId}`}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    <UserIcon className="h-5 w-5" />
                    <span>내 블로그</span>
                  </Link>
                  <Link
                    href="/write"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    <PencilIcon className="h-5 w-5" />
                    <span>글쓰기</span>
                  </Link>
                  <Link
                    href={`/settings/${userId}`}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Cog6ToothIcon className="h-5 w-5" />
                    <span>블로그 설정</span>
                  </Link>
                  <Link
                    href={`/chatbot/${userId}`}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    <ChatBubbleLeftRightIcon className="h-5 w-5" />
                    <span>내 챗봇</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                    <span>로그아웃</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="flex items-center gap-1 hover:text-blue-500 transition-colors"
              >
                <ArrowLeftOnRectangleIcon className="h-6 w-6" />
                <span className="hidden xl:inline">로그인</span>
              </Link>
              <Link
                href="/signup"
                className="flex items-center gap-1 hover:text-blue-500 transition-colors"
              >
                <UserIcon className="h-6 w-6" />
                <span className="hidden xl:inline">회원가입</span>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}