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

  return (
    <div className="space-y-6">
      {/* 相册内容 */}
      {filteredAlbums.length > 0 ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                照片展示
              </h2>
              <p className="text-sm text-gray-600 mt-1">
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
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
                className="group relative aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden
                         cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                {image ? (
                  <>
                    <img
                      src={getAssetUrl(image)}
                      alt={`照片 ${index + 1}`}
                      className="w-full h-full object-cover transition-all duration-300
                               group-hover:scale-110"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder.svg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 
                                 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <p className="text-sm font-medium">照片 {index + 1}</p>
                        <p className="text-xs opacity-80">点击查看大图</p>
                      </div>
                    </div>
                    
                    {/* 悬停时的放大镜图标 */}
                    <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
          
          {/* 底部信息 */}
          <motion.div 
            className="text-center p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm text-orange-700 font-medium">
              共 {images.length} 张照片 • 支持键盘导航 (← → ESC)
            </p>
          </motion.div>
        </div>
      ) : (
        <motion.div 
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-gray-500">
            {selectedSpeaker ? '该嘉宾暂无照片' : '暂无照片'}
          </p>
        </motion.div>
      )}

      {/* 图片预览模态框 */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            {/* 顶部控制栏 */}
            <div className="absolute top-4 right-4 flex gap-4 z-10">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(prev => prev > 0 ? prev - 1 : images.length - 1);
                }}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white backdrop-blur-sm"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(prev => prev < images.length - 1 ? prev + 1 : 0);
                }}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white backdrop-blur-sm"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedImage(null)}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white backdrop-blur-sm"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>

            {/* 图片显示区域 */}
            <div className="h-full flex items-center justify-center p-8">
              <motion.img
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                src={getAssetUrl(images[currentImageIndex])}
                alt={`预览图片 ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
            </div>

            {/* 底部信息栏 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2
                        bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full border border-white/20"
            >
              <span className="text-sm font-medium">
                {currentImageIndex + 1} / {images.length}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
