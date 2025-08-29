import { useState } from 'react'
import './App.css'
import SidebarTimeline from './components/SidebarTimeline'
import TalkCards from './components/TalkCards'
import PracticeBoard from './components/PracticeBoard'
import PhotoGallery from './components/PhotoGallery'
import { CardShell } from './components/Card/CardShell'
import meetupData from './data/meetup.json'

function App() {
  const [selectedSpeaker, setSelectedSpeaker] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gray-50">      
      <main className="mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* 左侧时间轴 */}
          <aside className="lg:col-span-4 bg-white border-r border-gray-200">
            <div className="sticky top-0 h-[calc(100vh)] overflow-y-auto">
              <div className="py-8 px-6">
                <SidebarTimeline 
                  speakers={meetupData.speakers}
                  selected={selectedSpeaker}
                  onSelect={setSelectedSpeaker}
                />
              </div>
            </div>
          </aside>
          
          {/* 右侧内容区域 */}
          <div className="lg:col-span-8 bg-gray-50">
            {selectedSpeaker ? (
              <div className="p-8">
                <div className="space-y-6 max-w-5xl">
                  {/* 议程与要点 */}
                  <CardShell title="议程与要点">
                    <TalkCards 
                      speakers={meetupData.speakers}
                      selectedSpeaker={selectedSpeaker}
                    />
                  </CardShell>

                  {/* 实践与思考 */}
                  <CardShell title="实践与思考">
                    <PracticeBoard 
                      speakers={meetupData.speakers}
                      selectedSpeaker={selectedSpeaker}
                    />
                  </CardShell>

                  {/* 照片展示 */}
                  <CardShell title="照片展示">
                    <PhotoGallery 
                      albums={meetupData.albums.filter(album => album.speakerId === selectedSpeaker)} 
                    />
                  </CardShell>
                </div>
              </div>
            ) : (
              <div className="h-[calc(100vh)] flex items-center justify-center text-gray-400">
                <p className="text-lg">请从左侧时间轴选择一位分享者查看详情</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
