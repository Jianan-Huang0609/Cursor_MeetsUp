/**
 * 获取资源的完整 URL
 * @param path - 相对路径
 * @returns 完整的 URL
 */
export function getAssetUrl(path: string): string {
  const baseUrl = import.meta.env.BASE_URL;
  // 移除开头的斜杠，避免重复
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${baseUrl}${cleanPath}`;
}

/**
 * 格式化日期时间
 * @param date - 日期对象或时间字符串
 * @returns 格式化后的日期时间字符串
 */
export function formatDateTime(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleTimeString('zh-CN', { 
    hour: '2-digit',
    minute: '2-digit'
  });
}
