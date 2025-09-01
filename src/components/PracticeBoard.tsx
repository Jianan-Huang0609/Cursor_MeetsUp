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
      .map(s => {
        let content = `# ${s.name} 的感悟总结\n\n`;
        
        if (s.personal_practice.length > 0) {
          content += `## 🙋‍个人实践\n${s.personal_practice.map(p => `- ${p}`).join('\n')}\n\n`;
        }
        
        if (s.personal_development.length > 0) {
          content += `## 💡个人开发\n${s.personal_development.map(d => `- ${d}`).join('\n')}\n\n`;
        }
        
        return content;
      })
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
          <h2 className="text-lg font-semibold text-gray-100 flex items-center">
            <svg className="w-5 h-5 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            感悟总结
          </h2>
          <p className="text-sm text-gray-400 mt-1">个人实践与开发灵感</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopy}
          className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg
            transition-all duration-300 shadow-md hover:shadow-lg
            ${
              copiedTimeout
                ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.5)]'
                : 'bg-gradient-to-r from-white/20 to-white/30 text-white hover:from-white/30 hover:to-white/40 shadow-[0_0_15px_rgba(255,255,255,0.3)]'
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
            className="bg-gradient-to-r from-white/5 to-white/10 rounded-xl border border-white/20 overflow-hidden"
          >
            {/* 分享者信息 */}
            <div className="bg-gradient-to-r from-white/10 to-white/20 px-6 py-4 border-b border-white/30">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-100 flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-white/20 to-white/30 rounded-full flex items-center justify-center mr-3 shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                      <span className="text-white font-semibold text-sm">
                        {speaker.name.charAt(0)}
                      </span>
                    </div>
                    {speaker.name} 的感悟总结
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">{speaker.role}</p>
                </div>
              </div>
            </div>

            {/* 个人实践 */}
            {speaker.personal_practice.length > 0 && (
              <div className="p-6">
                <h4 className="text-md font-semibold text-white mb-3 flex items-center">
                  <span className="mr-2">🙋‍</span>
                  个人实践
                </h4>
                <div className="space-y-3">
                  {speaker.personal_practice.map((practice, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/20"
                    >
                      <span className="flex-shrink-0 w-6 h-6 bg-white/30 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </span>
                      <span className="text-gray-300 leading-relaxed">
                        {practice}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* 个人开发 */}
            {speaker.personal_development.length > 0 && (
              <div className="p-6 border-t border-white/20">
                <h4 className="text-md font-semibold text-white mb-3 flex items-center">
                  <span className="mr-2">💡</span>
                  个人开发
                </h4>
                <div className="space-y-3">
                  {speaker.personal_development.map((development, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/20"
                    >
                      <span className="flex-shrink-0 w-6 h-6 bg-white/30 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </span>
                      <span className="text-gray-300 leading-relaxed">
                        {development}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* 空状态 */}
            {speaker.personal_practice.length === 0 && speaker.personal_development.length === 0 && (
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-white/10 to-white/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <p className="text-gray-400">暂无实践总结</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
