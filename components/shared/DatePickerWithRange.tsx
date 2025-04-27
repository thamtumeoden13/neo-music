"use client";

import * as React from "react";
import { format, setHours, setMinutes, isAfter, addHours } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import type { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

export interface DateTimeRange {
  from: Date | undefined;
  to: Date | undefined;
}

interface DatePickerWithRangeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  onChange?: (range: DateTimeRange) => void;
}

export function DatePickerWithRange({
  className,
  onChange,
}: DatePickerWithRangeProps) {
  // Initialize with current date and time, and end time 2 hours later
  const now = React.useMemo(() => {
    const date = new Date();
    // Round minutes to nearest 30 (either 00 or 30)
    const currentMinutes = date.getMinutes();
    const roundedMinutes = currentMinutes < 30 ? 0 : 30;
    date.setMinutes(roundedMinutes);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  }, []);

  const twoHoursLater = React.useMemo(() => {
    const date = new Date(now);
    date.setHours(now.getHours() + 2);
    return date;
  }, [now]);

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: now,
    to: twoHoursLater,
  });

  const [fromTime, setFromTime] = React.useState({
    hour: now.getHours().toString().padStart(2, "0"),
    minute: now.getMinutes() < 30 ? "00" : "30",
  });

  const [toTime, setToTime] = React.useState({
    hour: twoHoursLater.getHours().toString().padStart(2, "0"),
    minute: now.getMinutes() < 30 ? "00" : "30",
  });

  const fullFromDate = React.useMemo(() => {
    if (!date?.from) return undefined;
    const newDate = new Date(date.from);
    return setMinutes(
      setHours(newDate, Number.parseInt(fromTime.hour)),
      Number.parseInt(fromTime.minute)
    );
  }, [date?.from, fromTime]);

  const fullToDate = React.useMemo(() => {
    if (!date?.to) return undefined;
    const newDate = new Date(date.to);
    return setMinutes(
      setHours(newDate, Number.parseInt(toTime.hour)),
      Number.parseInt(toTime.minute)
    );
  }, [date?.to, toTime]);

  const hours = React.useMemo(
    () => Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0")),
    []
  );
  const minutes = React.useMemo(() => ["00", "30"], []);

  // Handle date changes
  const handleDateChange = React.useCallback(
    (newDate: DateRange | undefined) => {
      if (!newDate) {
        setDate(newDate);
        return;
      }

      // If only from date is selected, set it
      if (newDate.from && !newDate.to) {
        setDate(newDate);
        return;
      }

      // If both dates are selected, validate the range
      if (newDate.from && newDate.to) {
        // Create full dates with time to validate
        const newFromFull = setMinutes(
          setHours(new Date(newDate.from), Number.parseInt(fromTime.hour)),
          Number.parseInt(fromTime.minute)
        );

        const newToFull = setMinutes(
          setHours(new Date(newDate.to), Number.parseInt(toTime.hour)),
          Number.parseInt(toTime.minute)
        );

        // If dates are the same, ensure times make sense
        if (
          newDate.from.getDate() === newDate.to.getDate() &&
          newDate.from.getMonth() === newDate.to.getMonth() &&
          newDate.from.getFullYear() === newDate.to.getFullYear()
        ) {
          // If from time is after or equal to to time, adjust to time
          if (!isAfter(newToFull, newFromFull)) {
            // Set to time to be 1 hour after from time
            const adjustedToDate = addHours(newFromFull, 1);
            setToTime({
              hour: adjustedToDate.getHours().toString().padStart(2, "0"),
              minute: adjustedToDate.getMinutes() < 30 ? "00" : "30",
            });

            toast({
              title: "Time adjusted",
              description:
                "End time has been adjusted to ensure it's after start time.",
              duration: 3000,
            });
          }
        }

        setDate(newDate);

        // Call onChange with validated dates
        if (onChange) {
          onChange({
            from: newFromFull,
            to: isAfter(newToFull, newFromFull)
              ? newToFull
              : addHours(newFromFull, 1),
          });
        }
        return;
      }

      setDate(newDate);
    },
    [fromTime, toTime, onChange]
  );

  // Handle from time changes
  const handleFromTimeChange = React.useCallback(
    (type: "hour" | "minute", value: string) => {
      setFromTime((prev) => {
        const newTime = { ...prev, [type]: value };

        // Calculate new from date with updated time
        if (date?.from) {
          const newFromDate = new Date(date.from);
          const fromDateWithTime = setMinutes(
            setHours(
              newFromDate,
              Number.parseInt(type === "hour" ? value : prev.hour)
            ),
            Number.parseInt(type === "minute" ? value : prev.minute)
          );

          // If to date exists, validate the range
          if (date.to && fullToDate) {
            // If from time is now after or equal to to time, adjust to time
            if (!isAfter(fullToDate, fromDateWithTime)) {
              // Set to time to be 1 hour after from time
              const adjustedToDate = addHours(fromDateWithTime, 1);
              setToTime({
                hour: adjustedToDate.getHours().toString().padStart(2, "0"),
                minute: adjustedToDate.getMinutes() < 30 ? "00" : "30",
              });

              toast({
                title: "Time adjusted",
                description:
                  "End time has been adjusted to ensure it's after start time.",
                duration: 3000,
              });

              // Call onChange with adjusted values
              if (onChange) {
                onChange({
                  from: fromDateWithTime,
                  to: adjustedToDate,
                });
              }
              return newTime;
            }
          }

          // Call onChange with updated values
          if (onChange && date?.to) {
            onChange({
              from: fromDateWithTime,
              to: fullToDate,
            });
          }
        }

        return newTime;
      });
    },
    [date, fullToDate, onChange]
  );

  // Handle to time changes
  const handleToTimeChange = React.useCallback(
    (type: "hour" | "minute", value: string) => {
      setToTime((prev) => {
        const newTime = { ...prev, [type]: value };

        // Calculate new to date with updated time
        if (date?.to) {
          const newToDate = new Date(date.to);
          const toDateWithTime = setMinutes(
            setHours(
              newToDate,
              Number.parseInt(type === "hour" ? value : prev.hour)
            ),
            Number.parseInt(type === "minute" ? value : prev.minute)
          );

          // If from date exists, validate the range
          if (date.from && fullFromDate) {
            // If to time is now before or equal to from time, show error
            if (!isAfter(toDateWithTime, fullFromDate)) {
              toast({
                title: "Invalid time range",
                description: "End time must be after start time.",
                variant: "destructive",
                duration: 3000,
              });
              return prev; // Return previous time to prevent invalid selection
            }
          }

          // Call onChange with updated values
          if (onChange && date?.from) {
            onChange({
              from: fullFromDate,
              to: toDateWithTime,
            });
          }
        }

        return newTime;
      });
    },
    [date, fullFromDate, onChange]
  );

  // Initial call to onChange with default values
  React.useEffect(() => {
    if (onChange && fullFromDate && fullToDate) {
      onChange({
        from: fullFromDate,
        to: fullToDate,
      });
    }
    // Only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[350px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {fullFromDate ? (
              fullToDate ? (
                <>
                  {format(fullFromDate, "LLL dd, y HH:mm")} -{" "}
                  {format(fullToDate, "LLL dd, y HH:mm")}
                </>
              ) : (
                format(fullFromDate, "LLL dd, y HH:mm")
              )
            ) : (
              <span>Pick a date and time range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4 bg-slate-50" align="start">
          <div className="space-y-4">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={handleDateChange}
              numberOfMonths={2}
            />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  <Label>From Time</Label>
                </div>
                <div className="flex space-x-2">
                  <Select
                    value={fromTime.hour}
                    onValueChange={(value) =>
                      handleFromTimeChange("hour", value)
                    }
                  >
                    <SelectTrigger className="w-[80px]">
                      <SelectValue placeholder="Hour" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-50">
                      {hours.map((hour) => (
                        <SelectItem key={hour} value={hour}>
                          {hour}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span className="flex items-center">:</span>
                  <Select
                    value={fromTime.minute}
                    onValueChange={(value) =>
                      handleFromTimeChange("minute", value)
                    }
                  >
                    <SelectTrigger className="w-[80px]">
                      <SelectValue placeholder="Minute" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-50">
                      {minutes.map((minute) => (
                        <SelectItem key={minute} value={minute}>
                          {minute}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  <Label>To Time</Label>
                </div>
                <div className="flex space-x-2">
                  <Select
                    value={toTime.hour}
                    onValueChange={(value) => handleToTimeChange("hour", value)}
                  >
                    <SelectTrigger className="w-[80px]">
                      <SelectValue placeholder="Hour" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-50">
                      {hours.map((hour) => (
                        <SelectItem key={hour} value={hour}>
                          {hour}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span className="flex items-center">:</span>
                  <Select
                    value={toTime.minute}
                    onValueChange={(value) =>
                      handleToTimeChange("minute", value)
                    }
                  >
                    <SelectTrigger className="w-[80px]">
                      <SelectValue placeholder="Minute" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-50">
                      {minutes.map((minute) => (
                        <SelectItem key={minute} value={minute}>
                          {minute}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
