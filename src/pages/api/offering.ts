import type { APIRoute } from "astro";
import Plunk from "@plunk/node";

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
  // console.log(
  //   `name: ${name} email: ${email} message: ${message} package: ${selectedPackage}\n`,
  // );
  // Validate the data - you'll probably want to do more than this
  if (!name || !email || !message || !selectedPackage) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields",
      }),
      { status: 400 },
    );
  }
  const key = import.meta.env.SECRET_PLUNK_API_KEY;
  const businessEmail = import.meta.env.SECRET_HONEY_NECTAR_ASTROLOGY_EMAIL;
  // console.log(`key: ${key}`);
  // console.log(`email: ${businessEmail}`);
  if (!key || !businessEmail) {
    return new Response(
      JSON.stringify({
        message: "failed sending email, please try again later",
      }),
      { status: 500 },
    );
  }
  try {
    const bussinessEmailResult = await fetch(
      "https://api.useplunk.com/v1/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          to: businessEmail,
          subject: "New Honey Nectar Astrology Booking!",
          body: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
            body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .header { background-color: #6a0dad; color: #ffffff; padding: 20px; text-align: center; }
            .header h1 { margin: 0; font-size: 24px; }
            .content { padding: 20px; }
            .booking-details { background-color: #f9f5ff; padding: 15px; border-radius: 5px; margin: 15px 0; }
            .cta-button { 
            display: inline-block; 
            background-color: #6a0dad; 
            color: #ffffff; 
            padding: 12px 25px; 
            text-decoration: none; 
            border-radius: 5px; 
            margin: 20px 0;
            text-align: center;
            }
            .footer { 
            text-align: center; 
            font-size: 12px; 
            color: #777; 
            padding: 20px;
            background-color: #f4f4f4;
            }
            @media screen and (max-width: 600px) {
            .container { width: 100%; }
            }
            </style>
            </head>
            <body>
            <div class="container">
            <div class="header">
            <h1>Honey Nectar Astology Booking Confirmation</h1>
            </div>
            <div class="content">
            <div class="booking-details">
            <h3>Booking Details:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Package:</strong> ${selectedPackage}</p>
            <p><strong>Your Message:</strong> ${message}</p>
            </div>
            </div>
            <div class="footer">
            <p>© ${new Date().getFullYear()} Honey Nectar Astrology. All rights reserved.</p>
            <p>Illuminate your path, one star at a time.</p>
            </div>
            </div>
            </body>
            </html>
            `,
        }),
      },
    );

    if (bussinessEmailResult.ok) {
      await fetch("https://api.useplunk.com/v1/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          to: email.toString(),
          subject: "Honey Nectar Astrology Welcoming!",
          body: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
            body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .header { background-color: #6a0dad; color: #ffffff; padding: 20px; text-align: center; }
            .header h1 { margin: 0; font-size: 24px; }
            .content { padding: 20px; }
            .booking-details { background-color: #f9f5ff; padding: 15px; border-radius: 5px; margin: 15px 0; }
            .cta-button { 
            display: inline-block; 
            background-color: #6a0dad; 
            color: #ffffff; 
            padding: 12px 25px; 
            text-decoration: none; 
            border-radius: 5px; 
            margin: 20px 0;
            text-align: center;
            }
            .footer { 
            text-align: center; 
            font-size: 12px; 
            color: #777; 
            padding: 20px;
            background-color: #f4f4f4;
            }
            @media screen and (max-width: 600px) {
            .container { width: 100%; }
            }
            </style>
            </head>
            <body>
            <div class="container">
            <div class="header">
            <h1>Honey Nectar Astology Booking Confirmation</h1>
            </div>
            <div class="content">
            <p>Hello ${name},</p>

            <p>Thank you for booking your astrology consultation. We're excited to guide you through your cosmic journey!</p>

            <div class="booking-details">
            <h3>Booking Details:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Package:</strong> ${selectedPackage}</p>
            <p><strong>Your Message:</strong> ${message}</p>
            </div>

            <p>Our team will review your booking and contact you within 24-48 hours to confirm your session details and schedule.</p>
            <p>If you have any questions or need to modify your booking, please reply to this email.</p>
            </div>
            <div class="footer">
            <p>© ${new Date().getFullYear()} Honey Nectar Astrology. All rights reserved.</p>
            <p>Illuminate your path, one star at a time.</p>
            </div>
            </div>
            </body>
            </html>
            `,
        }),
      });
    }
    return new Response(
      JSON.stringify({
        message: "Booking successful",
      }),
      { status: 200 },
    );
  } catch (err) {
    return new Response("Failed to send booking email, try again later", {
      status: 500,
    });
  }
};
