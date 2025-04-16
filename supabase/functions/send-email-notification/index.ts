
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string[];
  subject: string;
  body: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, subject, body }: EmailRequest = await req.json();
    
    // Log the email request - in a real environment this would send an actual email
    console.log("Email notification request:");
    console.log(`To: ${to.join(", ")}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body: ${body.substring(0, 100)}...`);
    
    // For now, we'll just log the request and return success
    // In a production environment, you would integrate with an email service like SendGrid, Mailgun, etc.
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "Notification logged successfully",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error processing email notification:", error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
