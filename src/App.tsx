import { useState } from 'react'
import './App.css'
import HeaderChips from './components/HeaderChips'
import SidebarTimeline from './components/SidebarTimeline'
import TalkCards from './components/TalkCards'
import PracticeBoard from './components/PracticeBoard'
import PhotoGallery from './components/PhotoGallery'
import meetupData from './data/meetup.json'

function App() {
  const [selectedSpeaker, setSelectedSpeaker] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Cursor Meetup</h1>
          <HeaderChips 
            speakers={meetupData.speakers}
            onSelect={setSelectedSpeaker}
            selected={selectedSpeaker}
          />
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          <aside className="w-48 flex-shrink-0">
            <SidebarTimeline 
              speakers={meetupData.speakers}
              selected={selectedSpeaker}
              onSelect={setSelectedSpeaker}
            />
          </aside>
          
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TalkCards 
              speakers={meetupData.speakers}
              selectedSpeaker={selectedSpeaker}
            />
            <PracticeBoard 
              speakers={meetupData.speakers}
              selectedSpeaker={selectedSpeaker}
            />
          </div>
        </div>
      </main>

      <footer className="mt-12 bg-white border-t">
        <div className="container mx-auto px-4 py-8">
          <PhotoGallery albums={meetupData.albums} />
        </div>
      </footer>
    </div>
  )
}

export default App
