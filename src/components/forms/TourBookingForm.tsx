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
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "../ui/textarea";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";

import { useState, useEffect } from "react";

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
  extensions: z.array(z.string()).optional(),
  comment: z.string().optional(),
});

export const TOUR_EXTENSIONS = [
  { value: "wall", label: "City wall tour" },
  { value: "sewing", label: "Sewing District tour " },
  // etc
];

export function TourBookingForm() {
  const [open, setOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [selectValue, setSelectValue] = useState("");

  const [isSelectingRange, setIsSelectingRange] = useState(false);
  const [hoveredDate, setHoveredDate] = useState<Date | undefined>();

  const [isMobile, setIsMobile] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      groupSize: "",
      date: undefined,
      flexibleDate: false,
      extensions: [],
      comment: "",
    },
  });

  const isFlexibleDate = form.watch("flexibleDate");

  function onSubmit(data: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log(data);
  }

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);

    return () => {
      window.removeEventListener("resize", check);
    };
  }, []);

  return (
    <form id="tour-booking-form" onSubmit={form.handleSubmit(onSubmit)}>
      {/* Name input */}
      <h4 className="accent-label">YOUR DETAILS</h4>
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
      <h4 className="accent-label">DATE & EXPERIENCE</h4>
      <Controller
        name="date"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="date">Preferred date</FieldLabel>
            {isMobile ? (
              <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                  <Button
                    className="flex"
                    variant="outline"
                    disabled={isFlexibleDate}
                  >
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
                </DrawerTrigger>
                <DrawerContent>
                  <Calendar
                    mode="range"
                    resetOnSelect
                    selected={field.value}
                    onSelect={(value) => {
                      if (value) field.onChange(value);
                      if (value?.from && value?.to) {
                        setOpen(false);
                      }
                    }}
                    captionLayout="dropdown"
                    startMonth={new Date()}
                    endMonth={new Date(new Date().getFullYear() + 10, 11)}
                    autoFocus
                  />
                </DrawerContent>
              </Drawer>
            ) : (
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" disabled={isFlexibleDate}>
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
                <PopoverContent align="center" avoidCollisions={false}>
                  <Calendar
                    mode="range"
                    resetOnSelect
                    selected={field.value}
                    onSelect={(value) => {
                      if (value) field.onChange(value);
                      if (value?.from && value?.to) {
                        setOpen(false);
                      }
                    }}
                    captionLayout="dropdown"
                    startMonth={new Date()}
                    endMonth={new Date(new Date().getFullYear() + 10, 11)}
                    autoFocus
                  />
                </PopoverContent>
              </Popover>
            )}

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Flexible with dates checkbox */}
      <Controller
        name="flexibleDate"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <div className="flex items-center gap-2">
              <Checkbox
                id="flexibleDate"
                checked={field.value}
                onCheckedChange={(checked) => {
                  field.onChange(checked);
                  if (checked) form.setValue("date", undefined);
                }}
                aria-invalid={fieldState.invalid}
              />
              <FieldLabel htmlFor="flexibleDate">
                I'm flexible with my dates
              </FieldLabel>
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Extend your tour */}
      <Controller
        name="extensions"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Extend your tour</FieldLabel>
            <Select
              value={selectValue}
              onValueChange={(value) => {
                setSelectValue("");
                if (!field.value?.includes(value)) {
                  field.onChange([...(field.value || []), value]);
                }
              }}
            >
              <SelectTrigger aria-invalid={fieldState.invalid}>
                <SelectValue placeholder="Add an extension" />
              </SelectTrigger>
              <SelectContent>
                {TOUR_EXTENSIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Selected tags */}
            {field.value && field.value.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {field.value.map((val) => {
                  const label = TOUR_EXTENSIONS.find(
                    (o) => o.value === val,
                  )?.label;
                  return (
                    <span
                      key={val}
                      className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md text-sm"
                    >
                      {label}
                      <XIcon
                        className="h-3 w-3 cursor-pointer text-accent-orange-23"
                        onClick={() =>
                          field.onChange(field.value?.filter((v) => v !== val))
                        }
                      />
                    </span>
                  );
                })}
              </div>
            )}

            <FieldDescription>Add more tours to your day.</FieldDescription>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Comments */}
      <h4 className="accent-label">COMMENTS</h4>
      <Controller
        name="comment"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="comment">Additional information</FieldLabel>
            <Textarea
              {...field}
              id="comment"
              rows={4}
              placeholder="Questions, thoughts, ideas, other important information, walking restraints. Please add it here."
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Submit button */}
      <Button type="submit">Send Booking Request</Button>
    </form>
  );
}
