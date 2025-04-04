import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"

import { cn } from "@/lib/utils"
import { Icon } from "@iconify/react"
import { cva, VariantProps } from "class-variance-authority"

const dialogVariants = cva(
  'fixed z-50 grid w-full gap-4 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 sm:rounded-lg',
  {
    variants: {
      variant: {
        default:
          'border border-neutral-500 bg-white dark:border-neutral-900 dark:bg-neutral-950 dark:text-white',
      },
      position: {
        default:
          'left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
        bl: 'left-6 bottom-6 data-[state=closed]:slide-out-to-bottom-16 data-[state=open]:slide-in-from-bottom-16',
        bc: 'left-[50%] top-[50%] translate-x-[-50%] bottom-6 data-[state=closed]:slide-out-to-bottom-16 data-[state=open]:slide-in-from-bottom-16',
        br: 'right-6 bottom-6 data-[state=closed]:slide-out-to-bottom-16 data-[state=open]:slide-in-from-bottom-16',
        tr: 'right-6 top-6 data-[state=closed]:slide-out-to-top-16 data-[state=open]:slide-in-from-top-16'
      },
      size: {
        default: 'max-w-lg',
        xxs: 'max-w-[300px]',
        xs: 'max-w-[400px]',
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-xl',
        xl: 'max-w-2xl',
        fullscreen: 'w-[97%] h-[97%]',
      },
    },
    defaultVariants: {
      variant: 'default',
      position: 'default',
      size: 'default',
    },
  }
)

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
  VariantProps<typeof dialogVariants> { }

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(
  (
    { className, variant = 'default', size, position, children, ...props },
    ref
  ) => (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(dialogVariants({ variant, size, position, className }))}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4.5 z-10 rounded-sm cursor-pointer">
          <Icon icon={'material-symbols:cancel-outline'} className="text-2xl text-[#8292AA]" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
)
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-neutral-500 dark:text-neutral-400", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
