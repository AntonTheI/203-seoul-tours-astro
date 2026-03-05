import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Invalid email"),
  groupSize: z.string().min(1, "Please select group size").optional(),
  date: z.date().optional(),
  flexibleDate: z.boolean().default(false),
  extension: z.string().optional(),
  comment: z.string().optional(),
});

export function BugReportForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log(data);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* ... */}
      {/* Build the form here */}
      {/* ... */}
    </form>
  );
}
