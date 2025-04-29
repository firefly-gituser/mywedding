import { useState, useEffect } from 'react';

interface UseImagePreloaderReturn {
  imagesLoaded: boolean;
  loadedCount: number;
  totalCount: number;
}

/**
 * Custom hook để theo dõi việc tải trước hình ảnh
 * @param imageUrls - Danh sách các URL hình ảnh cần tải
 * @returns Đối tượng bao gồm trạng thái tải, số lượng đã tải và tổng số
 */
export const useImagePreloader = (imageUrls: string[]): UseImagePreloaderReturn => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const totalCount = imageUrls.length;

  useEffect(() => {
    // Nếu không có hình ảnh nào để tải, coi như đã hoàn tất
    if (!imageUrls || imageUrls.length === 0) {
      setImagesLoaded(true);
      return;
    }

    let loadedImages = 0;
    
    // Tạo một bản sao để tránh tham chiếu đến mảng ban đầu
    const urls = [...imageUrls];
    
    // Hàm kiểm tra khi tất cả hình ảnh đã tải xong
    const checkAllLoaded = () => {
      loadedImages++;
      setLoadedCount(loadedImages);
      
      if (loadedImages === urls.length) {
        setImagesLoaded(true);
      }
    };

    // Tải trước từng hình ảnh
    urls.forEach(url => {
      // Bỏ qua nếu URL không hợp lệ
      if (!url || url.startsWith('data:')) {
        checkAllLoaded();
        return;
      }

      const img = new Image();
      
      img.onload = checkAllLoaded
      
      img.onerror = checkAllLoaded
      
      img.src = url;
    });
  }, [imageUrls]);

  return { imagesLoaded, loadedCount, totalCount };
};

export default useImagePreloader;