import type { APIRoute } from "astro";

// Interface for banner interaction
interface BannerInteraction {
  action: "dismiss" | "book";
  cookieName: string;
}

export const GET: APIRoute = ({ cookies, request }) => {
  try {
    // Get the referrer to check if it's a new visit or refresh
    const referrer = request.headers.get("referer") || "";
    const currentUrl = new URL(request.url).origin;

    // Check dismissed banner and visit tracking cookies
    const dismissedBanner = cookies.get(
      "holiday-sales-banner-dismissed",
    )?.value;
    const visitCount = parseInt(
      cookies.get("holiday-sales-visit-count")?.value || "0",
    );

    // Determine if banner should be shown
    let showBanner = false;

    // Always show banner on first few visits (e.g., first 3 visits)
    if (visitCount < 3) {
      showBanner = true;

      // Increment visit count
      cookies.set("holiday-sales-visit-count", (visitCount + 1).toString(), {
        httpOnly: true,
        secure: import.meta.env.PROD,
        sameSite: "strict",
        maxAge: 14 * 24 * 60 * 60, // 14 days
      });
    }
    // If dismissed, check time since dismissal
    else if (dismissedBanner) {
      const dismissedTimestamp = parseInt(dismissedBanner);
      const currentTime = Date.now();
      const fourteenDaysInMilliseconds = 14 * 24 * 60 * 60 * 1000;

      // Show banner if more than 14 days have passed
      showBanner =
        currentTime - dismissedTimestamp > fourteenDaysInMilliseconds;
    }

    // Special case for page refresh or same-site navigation
    if (referrer.startsWith(currentUrl)) {
      showBanner = true;
    }

    return new Response(
      JSON.stringify({
        showBanner,
        visitCount,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("Error checking banner status:", error);

    // Fallback to showing banner in case of any error
    return new Response(
      JSON.stringify({
        showBanner: true,
        visitCount: 0,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
};

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    // Parse the incoming request body
    const { action, cookieName }: BannerInteraction = await request.json();

    // Validate input
    if (!action || !cookieName) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid request parameters",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // Set a cookie based on the action
    switch (action) {
      case "dismiss":
        cookies.set("holiday-sales-banner-dismissed", Date.now().toString(), {
          httpOnly: true,
          secure: import.meta.env.PROD,
          sameSite: "strict",
          maxAge: 14 * 24 * 60 * 60, // 14 days
        });
        break;

      case "book":
        // Additional logic for booking can be added here
        // For example, tracking the booking or setting a special cookie
        cookies.set("holiday-sales-banner-booked", Date.now().toString(), {
          httpOnly: true,
          secure: import.meta.env.PROD,
          sameSite: "strict",
          maxAge: 14 * 24 * 60 * 60, // 14 days
        });
        break;

      default:
        return new Response(
          JSON.stringify({
            success: false,
            message: "Invalid action",
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message:
          action === "book"
            ? "Booking processed successfully"
            : "Banner dismissed",
      }),
      {
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error processing banner interaction:", error);

    return new Response(
      JSON.stringify({
        success: false,
        message: "Internal server error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
