import { useState, useEffect } from 'react';
import type { Album } from '../lib/types';
import { getAssetUrl } from '../lib/utils';

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
    <div className="p-6 bg-white rounded-xl">
      {/* 相册内容 */}
      {albums.length > 0 ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-gray-900">照片展示</h2>
              <p className="text-sm text-gray-500">点击图片可查看大图</p>
            </div>
            {albums.length > 1 && (
              <div className="flex gap-2">
                {albums.map((album) => (
                  <button
                    key={album.id}
                    onClick={() => {
                      setActiveAlbum(album.id);
                      setSelectedImage(null);
                    }}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all
                      ${
                        album.id === activeAlbum
                          ? 'bg-blue-100 text-blue-600 shadow-sm'
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                  >
                    {album.title}
                  </button>
                ))}
              </div>
            )}
          </div>
      
          {/* 照片网格 */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                onClick={() => openPreview(image, index)}
                className="group relative aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden
                         cursor-pointer transition-transform hover:-translate-y-1 hover:shadow-lg"
              >
                {image ? (
                  <>
                    <img
                      src={getAssetUrl(image)}
                      alt={`照片 ${index + 1}`}
                      className="w-full h-full object-cover transition-all duration-300
                               group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 
                                 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <p className="text-sm font-medium">照片 {index + 1}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    暂无图片
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* 底部提示 */}
          <div className="text-center text-sm text-gray-500">
            共 {images.length} 张照片
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 py-12">
          暂无照片
        </div>
      )}

      {/* 图片预览模态框 */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div className="absolute top-4 right-4 flex gap-4">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex(prev => prev > 0 ? prev - 1 : images.length - 1);
              }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex(prev => prev < images.length - 1 ? prev + 1 : 0);
              }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button 
              onClick={() => setSelectedImage(null)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="h-full flex items-center justify-center p-8">
            <img
              src={getAssetUrl(images[currentImageIndex])}
              alt={`预览图片 ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2
                        bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full">
            {currentImageIndex + 1} / {images.length}
          </div>
        </div>
      )}


    </div>
  );
}
