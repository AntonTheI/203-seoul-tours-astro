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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "@/components/ui/label";

import { type Tour } from "@/lib/api";

import { useState, useEffect } from "react";

const WP_API_REQUEST =
  "http://localhost/tour-guide-site/?rest_route=/tours/v1/booking";

interface TourOption {
  value: string;
  label: string;
}

const formSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Invalid email"),
  groupSize: z.string().optional(),
  date: z
    .object({
      from: z.date(),
      to: z.date().optional(),
    })
    .optional(),
  extensions: z.array(z.string()).optional(),
  comment: z.string().optional(),
});

export function TourBookingForm({
  className,
  otherTours = [],
}: {
  className?: string;
  otherTours?: Tour[];
}) {
  const [open, setOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [selectValue, setSelectValue] = useState("");

  const [isMobile, setIsMobile] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<z.infer<typeof formSchema> | null>(
    null,
  );
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const tourExtensions: TourOption[] = otherTours.map((tour) => ({
    value: tour.slug,
    label: tour.title.rendered,
  }));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      groupSize: "",
      date: undefined,
      extensions: [],
      comment: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    setFormData(data);
    setIsDialogOpen(true);
    // Do something with the form values.
    console.log(data);
  }

  async function sendBooking() {
    setStatus("loading");
    try {
      const request = await fetch(WP_API_REQUEST, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const response = await request.json();

      if (!request.ok) {
        throw new Error(response.message || "Something went wrong.");
      }

      setStatus("success");
      setIsDialogOpen(false);
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    }
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
    <form
      id="tour-booking-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className={className}
    >
      {/* YOUR DETAILS */}
      <h3 className="text-2xl font-semibold -mb-5">Book the tour</h3>
      <div className="flex flex-col gap-4">
        {/* Name input */}
        <h4 className="accent-label">YOUR DETAILS</h4>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input {...field} id="name" aria-invalid={fieldState.invalid} />
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
              <FieldLabel htmlFor="email">Email *</FieldLabel>
              <Input
                {...field}
                id="email"
                type="email"
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
      </div>

      {/* DATE & EXPERIENCE */}
      <div className="flex flex-col gap-4">
        {/* Preferred date input */}
        <h4 className="accent-label">DATE & EXPERIENCE</h4>
        <div>
          <Controller
            name="date"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="date">Preferred date</FieldLabel>
                {isMobile ? (
                  <Drawer open={open} onOpenChange={setOpen}>
                    <DrawerTrigger asChild>
                      <Button variant="outline">
                        <CalendarIcon className="h-4 w-4" />
                        {field.value?.from
                          ? field.value.to &&
                            field.value.to.getTime() !==
                              field.value.from.getTime()
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
                    <DrawerContent className="flex items-center">
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
                        // captionLayout="dropdown"
                        // startMonth={new Date()}
                        // endMonth={new Date(new Date().getFullYear() + 10, 11)}
                        autoFocus
                      />
                    </DrawerContent>
                  </Drawer>
                ) : (
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button variant="outline">
                        <CalendarIcon className="h-4 w-4" />
                        {field.value?.from
                          ? field.value.to &&
                            field.value.to.getTime() !==
                              field.value.from.getTime()
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

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

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
                  {tourExtensions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldDescription>Add more tours to your day.</FieldDescription>

              {/* Selected tags */}
              {field.value && field.value.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {field.value.map((val) => {
                    const label = tourExtensions.find(
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
                            field.onChange(
                              field.value?.filter((v) => v !== val),
                            )
                          }
                        />
                      </span>
                    );
                  })}
                </div>
              )}

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>

      {/* Comments */}
      <div className="flex flex-col gap-4">
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
                className="field-sizing-fixed"
                placeholder="Questions, thoughts, ideas, other important information, walking restraints. Please add it here."
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>

      {/* Submit button */}
      <Button
        type="submit"
        className="rounded-4xl text-xl py-6 bg-accent-orange-23"
      >
        Send Booking Request
      </Button>

      {/* Dialog */}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ready to send your booking request?</DialogTitle>
            <DialogDescription>
              By sending this request, your information will be used solely to
              process your booking and will not be shared with third parties.
            </DialogDescription>
          </DialogHeader>

          {status === "error" && (
            <p className="text-sm text-red-600">{errorMessage}</p>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              disabled={status === "loading"}
            >
              Go back
            </Button>
            <Button
              onClick={sendBooking}
              disabled={status === "loading"}
              className="bg-accent-orange-23"
            >
              {status === "loading" ? "Sending..." : "Confirm & Send"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>
  );
}
