import type { EventContext } from "@cloudflare/workers-types";

export async function onRequestPost(context: EventContext<any, any, any>) {
  const body = (await context.request.json()) as {
    name?: string;
    email: string;
    tourSlug: string;
    dateFrom?: string;
    dateTo?: string;
    groupSize?: string;
    extensions?: string[];
    comment?: string;
  };
  const apiKey = context.env.RESEND_API_KEY;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: "anton333mai@gmail.com",
        subject: `New booking request — ${body.tourSlug}`,
        html: `
    <h2>New Booking Request</h2>
    <p><strong>Name:</strong> ${body.name || "Not provided"}</p>
    <p><strong>Email:</strong> ${body.email}</p>
    <p><strong>Tour:</strong> ${body.tourSlug}</p>
    <p><strong>Date from:</strong> ${body.dateFrom || "Not provided"}</p>
    <p><strong>Date to:</strong> ${body.dateTo || "Not provided"}</p>
    <p><strong>Group size:</strong> ${body.groupSize || "Not provided"}</p>
    <p><strong>Add-on tours:</strong> ${body.extensions?.join(", ") || "None"}</p>
    <p><strong>Comments:</strong> ${body.comment || "None"}</p>
  `,
        reply_to: body.email,
      }),
    });

    if (!response.ok) {
      return new Response("error", { status: 500 });
    }

    return new Response("ok", { status: 200 });
  } catch (error) {
    return new Response(`something went wrong: ${error}`, { status: 500 });
  }
}
