import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export function OutlineButton(props: ComponentProps<'button'>) {
  return (
    <button
      {...props}
      className={twMerge(
        'flex items-center px-3 py-2 gap-2 leading-none rounded-full border border-dashed border-teal-800 text-sm text-teal-300 hover:border-teal-700 disabled:opacity-50 disabled:pointer-events-none outline-none focus-visible:border-teal-500 ring-teal-500/10 focus-visible:ring-4',
        props.className
      )}
    />
  )
}
