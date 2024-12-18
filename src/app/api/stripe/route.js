import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51QXN7FGvYRutQDiHpVAbmV068Tuao64eKomZtAwyVY6PqekvhNEtT2wkareRCkCDF7Abdk0FALpuiL9GmiZ0R66800aJrBROx9', {
  apiVersion: '2022-11-15',
});

export async function GET(request) {
  try {
    console.log('Allah Hu Akbar');

    // Hardcoded or fallback client URL
    const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

    const priceId = 'price_1QXO0xGvYRutQDiH4bA5FrPz'; // Replace with actual Price ID

    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${CLIENT_URL}/cancel`,
    });

    console.log('Stripe Checkout URL:', session.url);

    // Return the session URL to the frontend
    return new Response(
      JSON.stringify({ url: session.url }),
      {
        status: 200,
        // headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error creating Stripe session:', error.message);
    return new Response(
      JSON.stringify({ error: 'Failed to create Stripe session.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
