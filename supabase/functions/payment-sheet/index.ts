// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { stripe } from "../_utils/stripe.ts";
import { createOrRetrieveProfile } from "../_utils/supabase.ts";

console.log("Hello from Functions!");
console.log(stripe);
serve(async (req: Request) => {
  try {
    const { amount } = await req.json();

    const customer = await createOrRetrieveProfile(req);

    console.log("Customer: ", customer);

    // Create an ephermeralKey so that the Stripe SDK can fetch the customer's stored payment methods.
    const ephemeralKey = stripe
      ? await (stripe as any).ephemeralKeys.create(
        { customer: customer },
        { apiVersion: "2020-08-27" },
      )
      : null;

    const paymentIntent = await (stripe as any).paymentIntents.create({
      amount: amount,
      currency: "usd",
      customer: customer,
      payment_method_types: ["card"],
    });

    console.log("payment-sheet-> index.ts =>> PaymentIntent: ", paymentIntent);

    const res = {
      paymentIntent: paymentIntent.client_secret,
      publishableKey:
        "pk_test_51Oiw3uSHfUqzCe9DDiNNf0IFMubMevsaFGbbohh66EQjBMpDZVIUHHNYI5DevarvPxLAgxdZBdilcECgZg2C9z1W00gdj72awv",
      customer: customer,
      ephemeralKey: ephemeralKey.secret,
    };

    console.log("payment-sheet-> index.ts =>> response", res);

    return new Response(JSON.stringify(res), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }
});
