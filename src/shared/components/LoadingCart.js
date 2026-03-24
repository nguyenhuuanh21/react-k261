import React from 'react'

const LoadingCart = () => {
  return (
    <div className="full-loading-overlay">
      <div className="full-spinner"></div>
      <p className='full-loading-text'>Đang xử lý...</p>
    </div>
  )
}

export default LoadingCart