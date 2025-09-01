import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Speaker } from '../lib/types';

interface PracticeBoardProps {
  speakers: Speaker[];
  selectedSpeaker: string | null;
}

export default function PracticeBoard({ speakers, selectedSpeaker }: PracticeBoardProps) {
  const [copiedTimeout, setCopiedTimeout] = useState<number | null>(null);

  const displaySpeakers = selectedSpeaker
    ? speakers.filter(s => s.id === selectedSpeaker)
    : speakers;

  const handleCopy = () => {
    const text = displaySpeakers
      .map(s => `# ${s.name} 的实践总结\n\n${s.practice.map(p => `- ${p}`).join('\n')}`)
      .join('\n\n');
    navigator.clipboard.writeText(text);
    
    if (copiedTimeout) {
      clearTimeout(copiedTimeout);
    }
    const timeout = window.setTimeout(() => {
      setCopiedTimeout(null);
    }, 2000);
    setCopiedTimeout(timeout);
  };

  return (
    <div className="space-y-6">
      {/* 顶部操作栏 */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            个人实践与思考
          </h2>
          <p className="text-sm text-gray-600 mt-1">分享者的实践经验和深度思考</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopy}
          className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg
            transition-all duration-300 shadow-md hover:shadow-lg
            ${
              copiedTimeout
                ? 'bg-green-500 text-white'
                : 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600'
            }`}
        >
          {copiedTimeout ? (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>已复制</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              <span>复制为 Markdown</span>
            </>
          )}
        </motion.button>
      </div>
      
      {/* 内容区域 */}
      <div className="space-y-6">
        {displaySpeakers.map((speaker, speakerIndex) => (
          <motion.div
            key={speaker.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: speakerIndex * 0.1 }}
            className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-100 overflow-hidden"
          >
            {/* 分享者信息 */}
            <div className="bg-gradient-to-r from-purple-100 to-indigo-100 px-6 py-4 border-b border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-semibold text-sm">
                        {speaker.name.charAt(0)}
                      </span>
                    </div>
                    {speaker.name} 的实践与思考
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{speaker.role}</p>
                </div>
                
                <div className="flex gap-2">
                  {speaker.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-medium text-purple-600 bg-purple-100 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 实践内容 */}
            <div className="p-6">
              <div className="space-y-4">
                {speaker.practice.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (speakerIndex * 0.1) + (index * 0.05) }}
                    className="flex items-start gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-purple-200 hover:border-purple-300 transition-colors"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 leading-relaxed">{item}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 底部提示 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100"
      >
        <p className="text-sm text-blue-700">
          💡 点击上方按钮可复制所有实践内容为 Markdown 格式，方便分享和记录
        </p>
      </motion.div>
    </div>
  );
}
