import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Download, Check, BookOpen, Code, Target } from 'lucide-react';
import { cn } from '../lib/utils';
import { Speaker } from '../lib/types';

interface PracticeBoardProps {
  speakers: Speaker[];
  selectedSpeaker: string | null;
}

export function PracticeBoard({ speakers, selectedSpeaker }: PracticeBoardProps) {
  const [copied, setCopied] = useState(false);

  const filteredSpeakers = selectedSpeaker 
    ? speakers.filter(s => s.id === selectedSpeaker)
    : speakers;

  const allPractices = filteredSpeakers.flatMap(speaker => 
    speaker.practice.map(practice => ({
      ...speaker,
      practice: practice
    }))
  );

  const exportToMarkdown = () => {
    const markdown = `# Cursor Meetup 实践总结

## 活动信息
- **时间**: ${speakers[0]?.id ? '2025-08-16' : ''}
- **地点**: 浦东软件园-2号楼
- **嘉宾数量**: ${filteredSpeakers.length} 位

## 实践要点

${allPractices.map((item, index) => `
### ${index + 1}. ${item.name} (${item.role})
${item.practice}

`).join('')}

---
*生成时间: ${new Date().toLocaleString('zh-CN')}*
`;

    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cursor-meetup-practice-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = async () => {
    const text = allPractices.map((item, index) => 
      `${index + 1}. ${item.name}: ${item.practice}`
    ).join('\n');

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      {/* 标题和操作按钮 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">实践与思考</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                已复制
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                复制
              </>
            )}
          </button>
          <button
            onClick={exportToMarkdown}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            <Download className="h-4 w-4" />
            导出
          </button>
        </div>
      </div>

      {/* 统计信息 */}
      <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{filteredSpeakers.length}</div>
          <div className="text-sm text-muted-foreground">嘉宾数量</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{allPractices.length}</div>
          <div className="text-sm text-muted-foreground">实践要点</div>
        </div>
      </div>

      {/* 实践列表 */}
      <div className="space-y-4">
        {allPractices.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>暂无实践内容</p>
          </div>
        ) : (
          allPractices.map((item, index) => (
            <motion.div
              key={`${item.id}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium text-sm">{item.name}</h4>
                    <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
                      {item.role}
                    </span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">
                    {item.practice}
                  </p>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* 底部提示 */}
      {allPractices.length > 0 && (
        <div className="text-xs text-muted-foreground text-center pt-4 border-t border-border">
          共收集到 {allPractices.length} 个实践要点，建议定期回顾和更新
        </div>
      )}
    </div>
  );
}
