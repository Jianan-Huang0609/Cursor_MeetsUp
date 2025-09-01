import { motion } from 'framer-motion'
import type { Speaker } from '../lib/types'

interface HeaderChipsProps {
  speakers: Speaker[]
  selected: string | null
  onSelect: (id: string | null) => void
  viewMode: 'filter' | 'jump'
  onViewModeChange: (mode: 'filter' | 'jump') => void
}

export default function HeaderChips({ speakers, selected, onSelect, viewMode, onViewModeChange }: HeaderChipsProps) {
  return (
    <div className="flex items-center space-x-4">
      {/* 活动信息 */}
      <div className="hidden md:flex items-center space-x-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center space-x-2 px-3 py-1.5 bg-white/10 rounded-full border border-white/20"
        >
          <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
          <span className="text-sm font-medium text-white">2025-08-16</span>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center space-x-2 px-3 py-1.5 bg-white/10 rounded-full border border-white/20"
        >
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm font-medium text-white">浦东软件园</span>
        </motion.div>
      </div>

      {/* 模式切换 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center bg-gray-800 rounded-lg p-1 border border-gray-700"
      >
        <button
          onClick={() => onViewModeChange('filter')}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
            viewMode === 'filter'
              ? 'bg-gray-700 text-white shadow-[0_0_10px_rgba(255,255,255,0.3)]'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
          </svg>
          <span className="hidden sm:inline">筛选</span>
        </button>
        
        <button
          onClick={() => onViewModeChange('jump')}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
            viewMode === 'jump'
              ? 'bg-gray-700 text-white shadow-[0_0_10px_rgba(255,255,255,0.3)]'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          <span className="hidden sm:inline">跳转</span>
        </button>
      </motion.div>

      {/* 嘉宾选择 */}
      <div className="flex gap-2 overflow-x-auto py-2">
        {speakers.map((speaker) => (
          <motion.button
            key={speaker.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(speaker.id === selected ? null : speaker.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200
              ${
                speaker.id === selected
                  ? 'bg-gradient-to-r from-white/20 to-white/30 text-white shadow-[0_0_15px_rgba(255,255,255,0.5)] border border-white/50'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600 hover:border-gray-500'
              }`}
          >
            {speaker.name}
          </motion.button>
        ))}
      </div>

      {/* 分享按钮 */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-white/20 to-white/30 text-white rounded-lg hover:from-white/30 hover:to-white/40 transition-all duration-200 shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] border border-white/30"
        onClick={() => {
          if (navigator.share) {
            navigator.share({
              title: 'Cursor Meetup',
              text: '查看精彩的 Cursor Meetup 分享内容',
              url: window.location.href
            })
          } else {
            navigator.clipboard.writeText(window.location.href)
          }
        }}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
        </svg>
        <span className="hidden sm:inline">分享</span>
      </motion.button>
    </div>
  )
}
