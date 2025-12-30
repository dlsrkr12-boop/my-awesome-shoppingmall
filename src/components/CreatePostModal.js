import React, { useState } from 'react';
import '../styles/Modal.css';

function CreatePostModal({ isOpen, onClose, onSubmit, editMode = false, initialData = {} }) {
  const [imageUrl, setImageUrl] = useState(initialData.image || '');
  const [caption, setCaption] = useState(initialData.caption || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!imageUrl.trim()) {
      setError('이미지 URL을 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      await onSubmit({ image: imageUrl, caption });
      handleClose();
    } catch (err) {
      setError(err.message || '게시물 처리에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setImageUrl('');
    setCaption('');
    setError('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{editMode ? '게시물 수정' : '새 게시물 만들기'}</h2>
          <button className="modal-close" onClick={handleClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="create-post-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="imageUrl">이미지 URL</label>
            <input
              type="text"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg 또는 ./img/img01.jpg"
              disabled={loading}
            />
          </div>

          {imageUrl && (
            <div className="image-preview">
              <img src={imageUrl} alt="미리보기" onError={(e) => {
                e.target.style.display = 'none';
                setError('이미지를 불러올 수 없습니다.');
              }} />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="caption">설명</label>
            <textarea
              id="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="설명을 입력하세요..."
              rows="4"
              disabled={loading}
            />
          </div>

          <div className="modal-actions">
            <button 
              type="button" 
              onClick={handleClose}
              className="btn-cancel"
              disabled={loading}
            >
              취소
            </button>
            <button 
              type="submit" 
              className="btn-submit"
              disabled={loading || !imageUrl.trim()}
            >
              {loading ? '처리 중...' : (editMode ? '수정' : '게시')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePostModal;

