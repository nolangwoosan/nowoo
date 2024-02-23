import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import React from 'react'

interface Props extends DialogPrimitive.DialogContentProps, React.RefAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const DialogContent = React.forwardRef<HTMLDivElement, Props>(({ children, ...props }, forwardedRef) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50' />
    <DialogPrimitive.Content {...props} ref={forwardedRef}>
      {children}
      <DialogPrimitive.Close className='absolute right-5 top-5 cursor-pointer text-gray-500' aria-label='Close'>
        <X />
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
))

DialogContent.displayName = 'DialogContent'

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
