import React, { type ComponentProps } from 'react'
import { cn } from '../../lib/utils'

interface NotificationProps extends ComponentProps<'div'> {
  children: React.ReactNode
  type: 'success' | 'error'
}

export const Notification = ({
  type,
  className,
  ...props
}: NotificationProps) => {
  return (
    <div
      className={cn(
        'rounded-lg border px-4 py-2',
        type === 'success' && 'border-green-400 bg-green-100 text-green-700',
        type === 'error' && 'border-red-400 bg-red-100 text-red-700',
        className,
      )}
      {...props}
    ></div>
  )
}
