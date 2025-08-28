import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users } from 'lucide-react';
import { cn } from '../lib/utils';
import { Speaker } from '../lib/types';

interface SidebarTimelineProps {
  speakers: Speaker[];
  eventDate: string;
}

export function SidebarTimeline({ speakers, eventDate }: SidebarTimelineProps) {
  const [activeSpeaker, setActiveSpeaker] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const speakerElements = speakers.map(speaker => ({
        id: speaker.id,
        element: document.getElementById(speaker.id)
      }));

      const scrollPosition = window.scrollY + 100;

      for (const { id, element } of speakerElements) {
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSpeaker(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speakers]);

  const scrollToSpeaker = (speakerId: string) => {
    const element = document.getElementById(speakerId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border p-6 overflow-y-auto">
      <div className="space-y-6">
        {/* 事件信息 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{eventDate}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{speakers.length} 位嘉宾</span>
          </div>
        </div>

        {/* 时间轴 */}
        <div className="relative">
          <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-border" />
          
          {speakers.map((speaker, index) => (
            <motion.div
              key={speaker.id}
              className="relative mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* 时间轴点 */}
              <div className="absolute left-0 top-2 w-6 h-6 rounded-full border-2 border-border bg-background flex items-center justify-center">
                <div
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    activeSpeaker === speaker.id
                      ? "bg-primary"
                      : "bg-muted-foreground"
                  )}
                />
              </div>

              {/* 嘉宾信息 */}
              <div className="ml-8">
                <button
                  onClick={() => scrollToSpeaker(speaker.id)}
                  className={cn(
                    "text-left transition-colors hover:text-primary",
                    activeSpeaker === speaker.id
                      ? "text-primary font-medium"
                      : "text-foreground"
                  )}
                >
                  <div className="font-medium text-sm">{speaker.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {speaker.role}
                  </div>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
