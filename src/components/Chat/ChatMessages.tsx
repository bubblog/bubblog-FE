'use client'

import { ChatBubble } from './ChatBubble'
import { InspectorPanel } from '@/components/Chat/InspectorPanel'
import type { ContextItem, SearchPlan } from '@/apis/aiApi'

export interface InspectorData {
  version: 'v1' | 'v2'
  open: boolean
  // v1
  v1Context?: ContextItem[]
  // v2
  v2Plan?: SearchPlan | null
  v2Rewrites?: string[]
  v2Keywords?: string[]
  v2HybridResult?: ContextItem[]
  v2SearchResult?: ContextItem[]
  v2Context?: ContextItem[]
}

export interface ChatMessage {
  id: number
  role: 'user' | 'bot'
  content: string
  inspector?: InspectorData
}

interface Props {
  messages: ChatMessage[]
  chatEndRef: React.RefObject<HTMLDivElement | null >
  onToggleInspector?: (id: number) => void
  onInspectorItemClick?: (messageId: number, item: ContextItem) => void
}

export function ChatMessages({ messages, chatEndRef, onToggleInspector, onInspectorItemClick }: Props) {
  return (
    <div className="w-full flex-1 mb-4 space-y-4 px-2 overflow-y-auto overscroll-contain">
      {messages.map(msg => (
        <div key={msg.id} className="space-y-2">
          {msg.role === 'bot' && msg.inspector && (
            <InspectorPanel
              version={msg.inspector.version}
              visible={msg.inspector.open}
              onToggle={() => onToggleInspector?.(msg.id)}
              v1Context={msg.inspector.v1Context}
              v2Plan={msg.inspector.v2Plan}
              v2Rewrites={msg.inspector.v2Rewrites}
              v2Keywords={msg.inspector.v2Keywords}
              v2HybridResult={msg.inspector.v2HybridResult}
              v2SearchResult={msg.inspector.v2SearchResult}
              v2Context={msg.inspector.v2Context}
              onItemClick={onInspectorItemClick ? (item) => onInspectorItemClick(msg.id, item) : undefined}
            />
          )}
          <ChatBubble content={msg.content} role={msg.role} />
        </div>
      ))}
      <div ref={chatEndRef} />
    </div>
  )
}
