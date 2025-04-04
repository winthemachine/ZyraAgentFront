import type React from "react"

import { Check } from "lucide-react"
import { forwardRef } from "react"

interface CustomCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const CustomCheckbox = forwardRef<HTMLInputElement, CustomCheckboxProps>(
  ({ checked, onChange, className, ...props }, ref) => {
    return (
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          ref={ref}
          checked={checked}
          onChange={onChange}
          className="sr-only" 
          {...props}
        />
        <div
          className={`flex h-5 w-5 items-center justify-center rounded-sm border ${
            checked ? "border-[#9c46eb] bg-[#9c46eb]" : "border-[#9c46eb]/40 bg-transparent"
          }`}
        >
          {checked && <Check className="h-3.5 w-3.5 text-white" />}
        </div>
      </div>
    )
  },
)

CustomCheckbox.displayName = "CustomCheckbox"

