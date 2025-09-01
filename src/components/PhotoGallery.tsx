import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Album } from '../lib/types';
import { getAssetUrl } from '../lib/utils';

interface PhotoGalleryProps {
  albums: Album[];
  selectedSpeaker?: string | null;
}

export default function PhotoGallery({ albums, selectedSpeaker }: PhotoGalleryProps) {
  const [activeAlbum, setActiveAlbum] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 根据选中的嘉宾筛选相册
  const filteredAlbums = selectedSpeaker 
    ? albums.filter(album => album.speakerId === selectedSpeaker)
    : albums;

  const currentAlbum = activeAlbum 
    ? filteredAlbums.find(a => a.id === activeAlbum)
    : filteredAlbums[0];
    
  const images = currentAlbum?.images || [];

  // 当选中嘉宾改变时，自动选择对应的相册
  useEffect(() => {
    if (selectedSpeaker && filteredAlbums.length > 0) {
      const speakerAlbum = filteredAlbums.find(album => album.speakerId === selectedSpeaker);
      if (speakerAlbum) {
        setActiveAlbum(speakerAlbum.id);
      }
    } else if (filteredAlbums.length > 0) {
      setActiveAlbum(filteredAlbums[0].id);
    }
  }, [selectedSpeaker, filteredAlbums]);

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

  // 渲染图片或占位符
  const renderImage = (image: string, index: number) => {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="text-center">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-sm text-gray-400">照片 {index + 1}</p>
          <p className="text-xs text-gray-500 mt-1">示例图片</p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* 相册内容 */}
      {filteredAlbums.length > 0 ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-100 flex items-center">
                <svg className="w-5 h-5 mr-2 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                照片展示
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                {selectedSpeaker ? '当前嘉宾的照片' : '所有嘉宾的照片'} • 点击图片可查看大图
              </p>
            </div>
            
            {filteredAlbums.length > 1 && (
              <div className="flex gap-2">
                {filteredAlbums.map((album) => (
                  <motion.button
                    key={album.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setActiveAlbum(album.id);
                      setSelectedImage(null);
                    }}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 shadow-sm
                      ${
                        album.id === activeAlbum
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-[0_0_15px_rgba(251,146,60,0.5)]'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600'
                      }`}
                  >
                    {album.title}
                  </motion.button>
                ))}
              </div>
            )}
          </div>
      
          {/* 照片网格 */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => openPreview(image, index)}
                className="group relative aspect-[4/3] bg-gray-800 rounded-xl overflow-hidden
                         cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(251,146,60,0.3)] border border-gray-700 hover:border-orange-500/50"
              >
                {renderImage(image, index)}
                
                {/* 悬停时的放大镜图标 */}
                <div className="absolute top-3 right-3 w-8 h-8 bg-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-gray-600">
                  <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* 底部信息 */}
          <motion.div 
            className="text-center p-4 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-lg border border-orange-500/30 shadow-[0_0_15px_rgba(251,146,60,0.2)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm text-gray-300">
              共 <span className="text-orange-400 font-semibold">{images.length}</span> 张照片
              {selectedSpeaker && (
                <span className="text-gray-400"> • 来自 {currentAlbum?.title}</span>
              )}
            </p>
          </motion.div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-700">
            <svg className="w-12 h-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-100 mb-2">暂无照片</h3>
          <p className="text-gray-400">
            {selectedSpeaker ? '该嘉宾暂无照片' : '暂无照片展示'}
          </p>
        </div>
      )}

      {/* 图片预览模态框 */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-full">
              <img
                src={getAssetUrl(selectedImage)}
                alt="预览图片"
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
              
              {/* 关闭按钮 */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors duration-200 border border-gray-600"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* 导航按钮 */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex((prev) => 
                        prev > 0 ? prev - 1 : images.length - 1
                      );
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors duration-200 border border-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex((prev) => 
                        prev < images.length - 1 ? prev + 1 : 0
                      );
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors duration-200 border border-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  
                  {/* 图片计数器 */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-gray-900/80 backdrop-blur-sm rounded-full text-white text-sm border border-gray-600">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
