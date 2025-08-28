import { useState, useEffect } from 'react';
import type { Album } from '../lib/types';

interface PhotoGalleryProps {
  albums: Album[];
}

export default function PhotoGallery({ albums }: PhotoGalleryProps) {
  const [activeAlbum, setActiveAlbum] = useState(albums[0]?.id);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const currentAlbum = albums.find(a => a.id === activeAlbum);
  const images = currentAlbum?.images || [];

  // 键盘导航
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedImage) return;

      if (e.key === 'Escape') {
        setSelectedImage(null);
      } else if (e.key === 'ArrowLeft') {
        setCurrentImageIndex((prev) => 
          prev > 0 ? prev - 1 : images.length - 1
        );
      } else if (e.key === 'ArrowRight') {
        setCurrentImageIndex((prev) => 
          prev < images.length - 1 ? prev + 1 : 0
        );
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, images]);

  // 打开图片预览
  const openPreview = (image: string, index: number) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  return (
    <div className="relative">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">照片展示</h2>
      
      {/* 相册选择器 */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {albums.map((album) => (
          <button
            key={album.id}
            onClick={() => {
              setActiveAlbum(album.id);
              setSelectedImage(null);
            }}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors
              whitespace-nowrap flex items-center gap-2
              ${
                album.id === activeAlbum
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            {album.title}
            <span className="text-xs opacity-75">
              ({album.images.length})
            </span>
          </button>
        ))}
      </div>
      
      {/* 照片网格 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => openPreview(image, index)}
            className="aspect-square bg-gray-100 rounded-lg overflow-hidden
                     cursor-pointer group relative"
          >
            {image ? (
              <>
                <img
                  src={image}
                  alt={`照片 ${index + 1}`}
                  className="w-full h-full object-cover transition-transform
                           group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 
                               group-hover:bg-opacity-20 transition-opacity" />
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center 
                             text-gray-400">
                暂无图片
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 图片预览模态框 */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex 
                       items-center justify-center"
             onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full mx-4">
            <img
              src={images[currentImageIndex]}
              alt={`预览图片 ${currentImageIndex + 1}`}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            
            {/* 导航按钮 */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex(prev => 
                  prev > 0 ? prev - 1 : images.length - 1
                );
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2
                         bg-white bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full"
            >
              ← 上一张
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex(prev => 
                  prev < images.length - 1 ? prev + 1 : 0
                );
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2
                         bg-white bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full"
            >
              下一张 →
            </button>

            {/* 计数器 */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2
                          bg-black bg-opacity-50 text-white px-4 py-2 rounded-full">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
