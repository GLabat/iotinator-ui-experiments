import React from 'react'

// Basic component to apply an overlay over its parent and prevent interaction
// while it is displayed.
const LoadingOverlay = () => (
  <div
    className="is-overlay"
    style={{ backgroundColor: '#e0e0e052', zIndex: 100 }}
  />
)

export default LoadingOverlay
