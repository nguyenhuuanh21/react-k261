import React from 'react'

const Loading = () => {
  return (
      <div className="loading-overlay">
      <div className="spinner"></div>
      <p className="content-loading">Đang xử lý...</p>
    </div>
  )
}

export default Loading