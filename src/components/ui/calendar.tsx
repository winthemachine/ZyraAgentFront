import * as React from "react"
import { buttonVariants } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker, DropdownProps } from "react-day-picker"

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  hideNavButtons?: boolean;
};

function Calendar({ className, classNames, showOutsideDays = true, hideNavButtons = false, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-2", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium hidden",
        caption_dropdowns: "flex justify-center gap-1",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 p-0 opacity-50 hover:opacity-100",
          hideNavButtons ? "hidden" : ""
        ),
        nav_button_previous: "absolute left-1 !bg-white !shadow-none !rounded-full",
        nav_button_next: "absolute right-1 !bg-white !shadow-none !rounded-full",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-8.5 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "text-center p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "w-[30.2px] h-[26.7px] p-0 font-normal aria-selected:opacity-100 rounded text-[11px] bg-white mx-[2px] -my-[2px]"
        ),
        day_selected: "!bg-[#0C41FF] text-white hover:text-white",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        Dropdown: ({ value, onChange, children }: DropdownProps) => {
          const options = React.Children.toArray(children) as React.ReactElement<
            React.HTMLProps<HTMLOptionElement>
          >[];
          const selected = options.find((child) => child.props.value === value);
          const handleChange = (value: string) => {
            const changeEvent = {
              target: { value },
            } as React.ChangeEvent<HTMLSelectElement>;
            onChange?.(changeEvent);
          };
          return (
            <Select
              value={value?.toString()}
              onValueChange={(value: any) => {
                handleChange(value);
              }}
            >
              <SelectTrigger className="pr-1.5 focus:ring-0 shadow-none bg-white border-none font-semibold">
                <SelectValue>{selected?.props?.children}</SelectValue>
              </SelectTrigger>
              <SelectContent position="popper">
                <ScrollArea className="h-80">
                  {options.map((option, id: number) => (
                    <SelectItem key={`${option.props.value}-${id}`} value={option.props.value?.toString() ?? ""}>
                      {option.props.children}
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select>
          );
        },
        IconLeft: hideNavButtons ? () => null : () => <ChevronLeft className="h-4 w-4" />,
        IconRight: hideNavButtons ? () => null : () => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };