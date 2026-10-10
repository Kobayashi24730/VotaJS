import * as React from "react"
import { FormProvider, Controller } from "react-hook-form"

const Form = ({ ...props }) => {
  return <FormProvider {...props} />
}
const FormField = ({ ...props }) => {
  return <Controller {...props} />
}

const FormItem = React.forwardRef(({ className, ...props }, ref) => {
  return <div ref={ref} className={`space-y-2 ${className || ""}`} {...props} />
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className || ""}`}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef(({ ...props }, ref) => {
  return <div ref={ref} className="mt-1" {...props} />
})
FormControl.displayName = "FormControl"

const FormMessage = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={`text-xs font-medium text-red-500 ${className || ""}`}
      {...props}
    >
      {children}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
}