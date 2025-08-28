import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Lightbulb, Target, Zap } from 'lucide-react';
import { cn } from '../lib/utils';
import { Speaker } from '../lib/types';

interface TalkCardsProps {
  speakers: Speaker[];
  selectedSpeaker: string | null;
}

export function TalkCards({ speakers, selectedSpeaker }: TalkCardsProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentSpeakerIndex, setCurrentSpeakerIndex] = useState(0);

  const filteredSpeakers = selectedSpeaker 
    ? speakers.filter(s => s.id === selectedSpeaker)
    : speakers;

  const totalPages = Math.ceil(filteredSpeakers.length / 2);

  useEffect(() => {
    setCurrentPage(0);
    setCurrentSpeakerIndex(0);
  }, [selectedSpeaker]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevPage();
      } else if (e.key === 'ArrowRight') {
        handleNextPage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, totalPages]);

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setCurrentSpeakerIndex((currentPage - 1) * 2);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      setCurrentSpeakerIndex((currentPage + 1) * 2);
    }
  };

  const currentSpeakers = filteredSpeakers.slice(currentPage * 2, (currentPage + 1) * 2);

  return (
    <div className="space-y-6">
      {/* 分页控制 */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          第 {currentPage + 1} 页，共 {totalPages} 页
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className={cn(
              "p-2 rounded-md transition-colors",
              currentPage === 0
                ? "text-muted-foreground cursor-not-allowed"
                : "text-foreground hover:bg-accent"
            )}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
            className={cn(
              "p-2 rounded-md transition-colors",
              currentPage === totalPages - 1
                ? "text-muted-foreground cursor-not-allowed"
                : "text-foreground hover:bg-accent"
            )}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* 卡片容器 */}
      <div className="space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {currentSpeakers.map((speaker, index) => (
              <motion.div
                key={speaker.id}
                id={speaker.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-lg p-6 space-y-4"
              >
                {/* 嘉宾信息 */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{speaker.name}</h3>
                    <p className="text-muted-foreground">{speaker.role}</p>
                    <p className="text-sm text-muted-foreground mt-2">{speaker.summary}</p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {speaker.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 一句话总结 */}
                <div className="bg-accent/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-primary" />
                    <span className="font-medium text-sm">一句话总结</span>
                  </div>
                  <p className="text-sm">{speaker.talk.one_liner}</p>
                </div>

                {/* 关键观点 */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="h-4 w-4 text-primary" />
                    <span className="font-medium">关键观点</span>
                  </div>
                  <ul className="space-y-2">
                    {speaker.talk.highlights.map((highlight, highlightIndex) => (
                      <li key={highlightIndex} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tips */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="h-4 w-4 text-primary" />
                    <span className="font-medium">Tips</span>
                  </div>
                  <ul className="space-y-2">
                    {speaker.talk.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-accent-foreground rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 分页指示器 */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrentPage(i);
                setCurrentSpeakerIndex(i * 2);
              }}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                currentPage === i
                  ? "bg-primary"
                  : "bg-muted-foreground hover:bg-primary/50"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
