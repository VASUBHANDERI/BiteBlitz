import Stripe from "https://esm.sh/stripe@13.10.0?target=deno&deno-std=0.132.0&no-check";

export const stripe = Stripe(
  "sk_test_51Oiw3uSHfUqzCe9D3wc62BEpIhnTjhhDetv9cbGyygXgDAOafghyVKpjgAJzMjwTaHuQ8NaFqFh3kxxVcAVIUFqI00vjElceaD",
  {
    httpClient: Stripe.createFetchHttpClient(),
  },
);
