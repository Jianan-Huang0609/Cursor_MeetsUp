import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Navigation } from 'lucide-react';
import { cn } from '../lib/utils';
import { Speaker } from '../lib/types';

interface HeaderChipsProps {
  speakers: Speaker[];
  onSpeakerSelect: (speakerId: string | null) => void;
  selectedSpeaker: string | null;
}

export function HeaderChips({ speakers, onSpeakerSelect, selectedSpeaker }: HeaderChipsProps) {
  const [mode, setMode] = useState<'jump' | 'filter'>('jump');

  const scrollToSpeaker = (speakerId: string) => {
    const element = document.getElementById(speakerId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSpeakerClick = (speakerId: string) => {
    if (mode === 'jump') {
      scrollToSpeaker(speakerId);
    } else {
      onSpeakerSelect(selectedSpeaker === speakerId ? null : speakerId);
    }
  };

  return (
    <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">分享嘉宾</h1>
          
          {/* 模式切换 */}
          <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
            <button
              onClick={() => setMode('jump')}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors",
                mode === 'jump'
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Navigation className="h-4 w-4" />
              定位
            </button>
            <button
              onClick={() => setMode('filter')}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors",
                mode === 'filter'
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Filter className="h-4 w-4" />
              过滤
            </button>
          </div>
        </div>

        {/* 嘉宾 Chips */}
        <div className="flex flex-wrap gap-2">
          {speakers.map((speaker, index) => (
            <motion.button
              key={speaker.id}
              onClick={() => handleSpeakerClick(speaker.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
                selectedSpeaker === speaker.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-foreground border-border hover:border-primary/50 hover:bg-accent"
              )}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center gap-2">
                <span>{speaker.name}</span>
                {speaker.tags.length > 0 && (
                  <span className="text-xs opacity-70">
                    {speaker.tags[0]}
                  </span>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        {/* 模式说明 */}
        <div className="mt-3 text-xs text-muted-foreground">
          {mode === 'jump' ? '点击嘉宾快速定位到对应内容' : '点击嘉宾过滤显示相关内容'}
        </div>
      </div>
    </div>
  );
}
