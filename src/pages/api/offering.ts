import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const honeyPot = data.get("honeypot");
  if (honeyPot) {
    return new Response(
      JSON.stringify({
        message: "Bad request",
      }),
      { status: 400 },
    );
  }
  const name = data.get("name");
  const email = data.get("email");
  const message = data.get("message");
  const selectedPackage = data.get("selectedPackage");
  console.log(
    `name: ${name} email: ${email} message: ${message} package: ${selectedPackage}\n`,
  );
  // Validate the data - you'll probably want to do more than this
  if (!name || !email || !message || !selectedPackage) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields",
      }),
      { status: 400 },
    );
  }
  // Do something with the data, then return a success response
  return new Response(
    JSON.stringify({
      message: "Success!",
    }),
    { status: 200 },
  );
};
