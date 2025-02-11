import type { ReactElement, ReactNode } from 'react'
import React, { forwardRef } from 'react'

import { clsxTwMerge } from '@app/utils'

interface DropdownMenuProps {
  children: ReactNode
  show?: boolean
  className?: string
}

interface DropdownMenuTriggerPropsBase {
  onToggle?: () => void
  className?: string
}

interface DropdownMenuTriggerWithAs extends DropdownMenuTriggerPropsBase {
  as: ReactElement<React.HTMLProps<HTMLButtonElement>>
  children?: never
}

interface DropdownMenuTriggerWithChildren extends DropdownMenuTriggerPropsBase {
  as?: never
  children: ReactNode
}

type DropdownMenuTriggerProps = DropdownMenuTriggerWithAs | DropdownMenuTriggerWithChildren

interface DropdownMenuOptionsProps {
  children: ReactNode
  className?: string
}

function DropdownMenu({ className, children, show }: DropdownMenuProps) {
  const trigger = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === DropdownMenu.Trigger
  ) as ReactElement

  const content = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === DropdownMenu.Content
  ) as ReactElement

  return (
    <div className={clsxTwMerge('relative flex text-left', className)}>
      {trigger}

      {show && content}
    </div>
  )
}

DropdownMenu.Trigger = forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(
  function DropdownMenuTrigger({ children, onToggle, className, as }, ref) {
    if (as) {
      return React.cloneElement(as, {
        onClick: onToggle,
        ref,
        className: clsxTwMerge(as.props.className, className)
      })
    }

    return (
      <button type="button" onClick={onToggle} className={className} ref={ref}>
        {children}
      </button>
    )
  }
)

DropdownMenu.Content = function DropdownMenuContent({
  children,
  className
}: DropdownMenuOptionsProps) {
  return (
    <div
      className={clsxTwMerge(
        'absolute top-40 z-50 mt-2 w-fit origin-top-right rounded-md border border-primary-60 bg-primary-70 shadow-lg ring-1 ring-black ring-opacity-5 transition duration-1000 ease-in-out focus:outline-none ltr:left-auto ltr:right-0 rtl:left-0 rtl:right-auto',
        className
      )}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="dropdown-content"
    >
      {children}
    </div>
  )
}

export default DropdownMenu
