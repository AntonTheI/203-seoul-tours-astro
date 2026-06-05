import type { EventContext } from "@cloudflare/workers-types";

export async function onRequestPost(context: EventContext<any, any, any>) {
  const body = await context.request.json();
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
        subject: "Test booking",
        html: "<p>Test</p>",
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
