import { type ReactNode, forwardRef } from 'react'

export default forwardRef<HTMLSpanElement, { children: ReactNode }>(
  function TitleText ({ children, ...rest }, ref) {
    return (
      <span {...rest} ref={ref} className="Label-title">
        {children}
      </span>
    )
  })
