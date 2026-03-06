import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
  FieldContent,
  FieldDescription,
} from "../ui/field";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon, XIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";

import { useState } from "react";

const formSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Invalid email"),
  groupSize: z.string().min(1, "Please select group size").optional(),
  date: z
    .object({
      from: z.date(),
      to: z.date().optional(),
    })
    .optional(),
  flexibleDate: z.boolean(),
  extension: z.string().optional(),
  comment: z.string().optional(),
});

export function TourBookingForm() {
  const [open, setOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      groupSize: "",
      date: undefined,
      flexibleDate: false,
      extension: "",
      comment: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log(data);
  }

  return (
    <form id="tour-booking-form" onSubmit={form.handleSubmit(onSubmit)}>
      {/* Name input */}
      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input
              {...field}
              id="name"
              placeholder="Jane Doe"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Email input */}
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="email">
              Email
              <span className="text-xs bg-[#F0F6F8]/75 border border-medium-atmospheric-teal rounded-xl px-2 py-0.5">
                Required
              </span>
            </FieldLabel>
            <Input
              {...field}
              id="email"
              type="email"
              placeholder="Jane@example.com"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Number of guests input */}
      <Controller
        name="groupSize"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="groupSize">Number of guests</FieldLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="groupSize" aria-invalid={fieldState.invalid}>
                <SelectValue placeholder="Select group size" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n} {n === 1 ? "person" : "people"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldDescription className="text-xs ">
              More than 8 people? Mention it in Comments below.
            </FieldDescription>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Preferred date input */}
      <Controller
        name="date"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="date">Preferred date</FieldLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <CalendarIcon className="h-4 w-4" />
                  {field.value?.from
                    ? field.value.to &&
                      field.value.to.getTime() !== field.value.from.getTime()
                      ? `${format(field.value.from, "PP")} - ${format(field.value.to, "PP")}`
                      : format(field.value.from, "PP")
                    : "Pick a date"}
                  {field.value?.from && (
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        field.onChange(undefined);
                        setClickCount(0);
                      }}
                    >
                      <XIcon className="h-4 w-4" />
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="range"
                  selected={field.value}
                  onSelect={(value) => {
                    if (value) field.onChange(value);
                    const newCount = clickCount + 1;
                    setClickCount(newCount);
                    if (newCount >= 2) {
                      setOpen(false);
                      setClickCount(0);
                    }
                  }}
                  autoFocus
                  captionLayout="dropdown"
                  startMonth={new Date()}
                  endMonth={new Date(new Date().getFullYear() + 10, 11)}
                />
              </PopoverContent>
            </Popover>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </form>
  );
}
