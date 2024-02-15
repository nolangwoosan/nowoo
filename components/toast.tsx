import * as ToastPrimitive from '@radix-ui/react-toast'
import { X } from 'lucide-react'

interface Props {
  title?: string
  content: string
  children?: React.ReactNode
}

export const Toast = ({ title, content, children, ...props }: Readonly<Props>) => {
  return (
    <ToastPrimitive.Root
      className="grid grid-cols-[auto_max-content] items-center gap-x-[15px] rounded-md bg-white p-[15px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] [grid-template-areas:_'title_action'_'description_action'] data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[state=closed]:animate-hide data-[state=open]:animate-slideIn data-[swipe=end]:animate-swipeOut data-[swipe=cancel]:transition-[transform_200ms_ease-out]"
      {...props}
    >
      {title && (
        <ToastPrimitive.Title className='text-slate12 mb-[5px] text-[15px] font-medium [grid-area:_title]'>
          {title}
        </ToastPrimitive.Title>
      )}
      <ToastPrimitive.Description>{content}</ToastPrimitive.Description>
      {children && (
        <ToastPrimitive.Action className='[grid-area:_action]' asChild altText=''>
          {children}
        </ToastPrimitive.Action>
      )}
      <ToastPrimitive.Close aria-label='Close'>
        <span aria-hidden>
          <X />
        </span>
      </ToastPrimitive.Close>
    </ToastPrimitive.Root>
  )
}
