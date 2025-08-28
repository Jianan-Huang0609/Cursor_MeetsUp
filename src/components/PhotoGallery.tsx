import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Image as ImageIcon } from 'lucide-react';
import { cn } from '../lib/utils';
import { Album, Speaker } from '../lib/types';

interface PhotoGalleryProps {
  albums: Album[];
  speakers: Speaker[];
}

export function PhotoGallery({ albums, speakers }: PhotoGalleryProps) {
  const [selectedAlbum, setSelectedAlbum] = useState<string>(albums[0]?.id || '');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const currentAlbum = albums.find(album => album.id === selectedAlbum);
  const currentImages = currentAlbum?.images || [];

  const openImage = (imageUrl: string, index: number) => {
    setSelectedImage(imageUrl);
    setCurrentImageIndex(index);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (currentImages.length > 0) {
      const nextIndex = (currentImageIndex + 1) % currentImages.length;
      setCurrentImageIndex(nextIndex);
      setSelectedImage(currentImages[nextIndex]);
    }
  };

  const prevImage = () => {
    if (currentImages.length > 0) {
      const prevIndex = currentImageIndex === 0 ? currentImages.length - 1 : currentImageIndex - 1;
      setCurrentImageIndex(prevIndex);
      setSelectedImage(currentImages[prevIndex]);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedImage) {
      if (e.key === 'Escape') {
        closeImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    }
  };

  // 添加键盘事件监听
  useEffect(() => {
    const handleKeyDownWrapper = (e: KeyboardEvent) => handleKeyDown(e);
    window.addEventListener('keydown', handleKeyDownWrapper);
    return () => window.removeEventListener('keydown', handleKeyDownWrapper);
  }, [selectedImage, currentImageIndex, currentImages]);

  return (
    <div className="space-y-6">
      {/* 标题 */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">活动照片</h2>
        <p className="text-muted-foreground">记录精彩瞬间</p>
      </div>

      {/* 相册标签 */}
      <div className="flex flex-wrap justify-center gap-2">
        {albums.map((album, index) => {
          const speaker = speakers.find(s => s.albumId === album.id);
          return (
            <button
              key={album.id}
              onClick={() => setSelectedAlbum(album.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
                selectedAlbum === album.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-foreground border-border hover:border-primary/50 hover:bg-accent"
              )}
            >
              {speaker ? `${speaker.name} 的相册` : album.title}
              <span className="ml-2 text-xs opacity-70">({album.images.length})</span>
            </button>
          );
        })}
      </div>

      {/* 照片网格 */}
      {currentAlbum && (
        <motion.div
          key={selectedAlbum}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {currentImages.length === 0 ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>暂无照片</p>
            </div>
          ) : (
            currentImages.map((image, index) => (
              <motion.div
                key={image}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="aspect-square rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all duration-200 cursor-pointer group"
                onClick={() => openImage(image, index)}
              >
                <div className="relative w-full h-full bg-muted">
                  <img
                    src={image}
                    alt={`照片 ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="hidden absolute inset-0 flex items-center justify-center bg-muted">
                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      )}

      {/* 图片预览模态框 */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={closeImage}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 关闭按钮 */}
              <button
                onClick={closeImage}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {/* 导航按钮 */}
              {currentImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              {/* 图片 */}
              <img
                src={selectedImage}
                alt={`预览图片 ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-lg"
              />

              {/* 图片信息 */}
              <div className="absolute bottom-4 left-4 right-4 text-center text-white text-sm">
                {currentImageIndex + 1} / {currentImages.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
