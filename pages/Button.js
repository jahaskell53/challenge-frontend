import React from 'react'

export default function Button({children, ...props}) {
  return (
    <button id="submit-button" {...props}>
    {children}
  </button>
  )
}
