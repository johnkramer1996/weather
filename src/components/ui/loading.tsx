import { type ComponentProps } from 'react'
import { cn } from '../../lib/utils'

const Loading = ({ children, className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-2 py-8 text-center',
        className,
      )}
      {...props}
    >
      <div className='inline-block size-10 animate-spin rounded-full border-b-2 border-primary'></div>
      {children}
    </div>
  )
}

export { Loading }
