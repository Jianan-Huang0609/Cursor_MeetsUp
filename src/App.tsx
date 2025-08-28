import { useState } from 'react'
import './App.css'
import meetupData from './data/meetup.json'

function App() {
  const [selectedSpeaker, setSelectedSpeaker] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Cursor Meetup - 测试页面</h1>
        
        {/* 简单的测试内容 */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">活动信息</h2>
          <p><strong>标题：</strong>{meetupData.event.title}</p>
          <p><strong>日期：</strong>{meetupData.event.date}</p>
          <p><strong>地点：</strong>{meetupData.event.place}</p>
        </div>

        {/* 嘉宾列表 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">嘉宾列表 ({meetupData.speakers.length} 位)</h2>
          <div className="grid gap-4">
            {meetupData.speakers.map((speaker) => (
              <div 
                key={speaker.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors
                  ${selectedSpeaker === speaker.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                  }`}
                onClick={() => setSelectedSpeaker(speaker.id === selectedSpeaker ? null : speaker.id)}
              >
                <h3 className="font-medium text-lg">{speaker.name}</h3>
                <p className="text-gray-600">{speaker.role}</p>
                <p className="text-sm text-gray-500 mt-2">{speaker.summary}</p>
                
                {selectedSpeaker === speaker.id && (
                  <div className="mt-4 p-4 bg-gray-50 rounded">
                    <h4 className="font-medium mb-2">分享要点：</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {speaker.talk.highlights.map((highlight, index) => (
                        <li key={index}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 相册信息 */}
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">相册信息</h2>
          <div className="grid gap-4">
            {meetupData.albums.map((album) => (
              <div key={album.id} className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium">{album.title}</h3>
                <p className="text-sm text-gray-600">照片数量: {album.images.length}</p>
                {album.images.length > 0 && (
                  <p className="text-xs text-gray-500 mt-1">
                    示例: {album.images[0]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
