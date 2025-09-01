import { useState } from 'react'
import './App.css'
import SidebarTimeline from './components/SidebarTimeline'
import HeaderChips from './components/HeaderChips'
import TalkCards from './components/TalkCards'
import PracticeBoard from './components/PracticeBoard'
import PhotoGallery from './components/PhotoGallery'
import meetupData from './data/meetup.json'

function App() {
  const [selectedSpeaker, setSelectedSpeaker] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'filter' | 'jump'>('filter')

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <h1 className="text-xl font-bold text-slate-900">
                Cursor Meetup
              </h1>
            </div>
            
            <HeaderChips 
              speakers={meetupData.speakers}
              selected={selectedSpeaker}
              onSelect={setSelectedSpeaker}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          </div>
        </div>
      </header>

      <main className="flex max-w-7xl mx-auto">
        {/* 左侧时间轴 */}
        <aside className="w-72 flex-shrink-0 bg-white border-r border-slate-200">
          <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="p-4">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-slate-900 mb-2">分享时间轴</h2>
                <p className="text-sm text-slate-500">选择一位分享者查看详细内容</p>
              </div>
              <SidebarTimeline 
                speakers={meetupData.speakers}
                selectedSpeaker={selectedSpeaker}
                onSpeakerSelect={setSelectedSpeaker}
              />
            </div>
          </div>
        </aside>
        
        {/* 右侧内容区域 */}
        <div className="flex-1 flex flex-col">
          {/* 主要内容区域 */}
          <div className="flex-1 p-4">
            {selectedSpeaker ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
                {/* 左栏：嘉宾分享卡片 */}
                <div className="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      嘉宾分享
                    </h3>
                    <TalkCards 
                      speakers={meetupData.speakers}
                      selectedSpeaker={selectedSpeaker}
                    />
                  </div>
                </div>

                {/* 右栏：个人实践思考 */}
                <div className="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      实践思考
                    </h3>
                    <PracticeBoard 
                      speakers={meetupData.speakers}
                      selectedSpeaker={selectedSpeaker}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-[calc(100vh-8rem)] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-200">
                    <svg className="w-12 h-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">欢迎来到 Cursor Meetup</h3>
                  <p className="text-slate-500 mb-6">请从左侧时间轴选择一位分享者开始探索</p>
                  <div className="flex justify-center space-x-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-2 border border-slate-200">
                        <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <p className="text-sm text-slate-500">嘉宾分享</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-2 border border-slate-200">
                        <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <p className="text-sm text-slate-500">实践思考</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-2 border border-slate-200">
                        <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-sm text-slate-500">照片展示</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 底部照片展示区域 */}
          <div className="border-t border-slate-200">
            <div className="p-4">
              <PhotoGallery 
                albums={meetupData.albums}
                selectedSpeaker={selectedSpeaker}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
