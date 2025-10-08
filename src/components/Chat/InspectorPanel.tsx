'use client'

import Link from 'next/link'
import type { ContextItem, SearchPlan } from '@/apis/aiApi'

interface Props {
  version: 'v1' | 'v2'
  visible: boolean
  onToggle: () => void
  // v1
  v1Context?: ContextItem[]
  // v2
  v2Plan?: SearchPlan | null
  v2Rewrites?: string[]
  v2Keywords?: string[]
  v2HybridResult?: ContextItem[]
  v2SearchResult?: ContextItem[]
  v2Context?: ContextItem[]
  onItemClick?: (item: ContextItem) => void
}

export function InspectorPanel({
  version,
  visible,
  onToggle,
  v1Context = [],
  v2Plan = null,
  v2Rewrites = [],
  v2Keywords = [],
  v2HybridResult = [],
  v2SearchResult = [],
  v2Context = [],
  onItemClick,
}: Props) {
  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="border border-gray-200 rounded-md p-3 bg-white">
      <div className="text-xs font-semibold text-gray-600 mb-2">{title}</div>
      {children}
    </div>
  )

  const renderList = (items: ContextItem[]) => (
    <ul className="list-disc ml-5 space-y-1">
      {items.map((it) => (
        <li key={it.post_id}>
          {onItemClick ? (
            <button
              type="button"
              className="text-left text-sm font-medium hover:text-green-600"
              onClick={() => onItemClick(it)}
            >
              {it.post_title}
            </button>
          ) : (
            <Link href={`/post/${it.post_id}`} className="text-sm font-medium hover:text-green-600">
              {it.post_title}
            </Link>
          )}
        </li>
      ))}
    </ul>
  )

  return (
    <div className="mx-2 md:mx-4 mb-3">
      <button
        type="button"
        onClick={onToggle}
        className="px-3 py-1.5 text-sm rounded-md bg-gray-700 text-white hover:bg-gray-800"
        aria-expanded={visible}
      >
        {visible ? '검색 인스펙터 닫기' : '검색 인스펙터 열기'}
      </button>

      {visible && (
        <div className="mt-3 space-y-3">
          {version === 'v1' ? (
            <Section title="Context">
              {v1Context.length > 0 ? renderList(v1Context) : (
                <div className="text-sm text-gray-500">표시할 컨텍스트가 없습니다.</div>
              )}
            </Section>
          ) : (
            <>
              <Section title="Search Plan">
                {v2Plan ? (
                  <pre className="text-xs bg-gray-50 p-2 rounded overflow-auto max-h-48">
                    {JSON.stringify(v2Plan, null, 2)}
                  </pre>
                ) : (
                  <div className="text-sm text-gray-500">계획 없음</div>
                )}
              </Section>
              <Section title="Rewrites">
                {v2Rewrites.length > 0 ? (
                  <ul className="list-disc ml-5 space-y-1 text-sm">
                    {v2Rewrites.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                ) : (
                  <div className="text-sm text-gray-500">재작성 없음</div>
                )}
              </Section>
              <Section title="Keywords">
                {v2Keywords.length > 0 ? (
                  <ul className="list-disc ml-5 space-y-1 text-sm">
                    {v2Keywords.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                ) : (
                  <div className="text-sm text-gray-500">키워드 없음</div>
                )}
              </Section>
              <Section title="Hybrid Result">
                {v2HybridResult.length > 0 ? renderList(v2HybridResult) : (
                  <div className="text-sm text-gray-500">하이브리드 결과 없음</div>
                )}
              </Section>
              <Section title="Search Result">
                {v2SearchResult.length > 0 ? renderList(v2SearchResult) : (
                  <div className="text-sm text-gray-500">검색 결과 없음</div>
                )}
              </Section>
              <Section title="Context">
                {v2Context.length > 0 ? renderList(v2Context) : (
                  <div className="text-sm text-gray-500">컨텍스트 없음</div>
                )}
              </Section>
            </>
          )}
        </div>
      )}
    </div>
  )
}

