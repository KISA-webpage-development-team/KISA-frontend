import {STRIPE_SECRET_KEY} from '@env';
// import Stripe from 'stripe';

// const stripe = new Stripe(STRIPE_SECRET_KEY as string);

export const create_customer = async (email: string, name: string) => {
  // 1. Check if a customer with the given email already exists.
  const listUrl = `https://api.stripe.com/v1/customers?limit=1&email=${encodeURIComponent(
    email,
  )}`;
  const listResponse = await fetch(listUrl, {
    headers: {
      Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
    },
  });
  const listData = await listResponse.json();

  if (listData.data && listData.data.length > 0) {
    console.log('[stripe.ts] Customer Already Exists: ', listData.data[0]);
    // 2. If an existing customer is found, optionally update the name if needed.
    const existingCustomer = listData.data[0];
    if (existingCustomer.name !== name) {
      const updateUrl = `https://api.stripe.com/v1/customers/${existingCustomer.id}`;
      const updateBody = new URLSearchParams();
      updateBody.append('name', name);

      const updateResponse = await fetch(updateUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: updateBody.toString(),
      });
      const updatedCustomer = await updateResponse.json();
      return updatedCustomer;
    }
    return existingCustomer;
  }

  // 3. If no existing customer, create a new one.
  const createUrl = 'https://api.stripe.com/v1/customers';
  const body = new URLSearchParams();
  body.append('email', email);
  body.append('name', name);

  const createResponse = await fetch(createUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  const data = await createResponse.json();

  if (!createResponse.ok) {
    throw new Error(data.error?.message || 'Error creating customer');
  }

  return data; // Includes the new customer's ID in data.id
};
//https://api.stripe.com/v1/ephemeral_keys
export const create_ephemeral_key = async (customerID: string) => {
  const url = 'https://api.stripe.com/v1/ephemeral_keys';
  const body = new URLSearchParams();
  body.append('customer', customerID);
  // body.append('api_version', '2025-02-24.acacia');

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Stripe-Version': '2025-02-24.acacia',
    },
    body: body.toString(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || 'Error creating ephemeral key');
  }

  return data;
};

export const create_paymentIntent = async (
  amount: number,
  customerID: string,
) => {
  const amountInCents = amount * 100;
  const url = 'https://api.stripe.com/v1/payment_intents';

  const body = new URLSearchParams();
  body.append('amount', amountInCents.toString());
  body.append('currency', 'usd');
  body.append('customer', customerID);
  body.append('setup_future_usage', 'off_session');
  // Enable automatic payment methods:
  body.append('automatic_payment_methods[enabled]', 'true');

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || 'Error creating payment intent');
  }

  return data; // This will include the client_secret (data.client_secret)
};

// export const createPaymentSheet = async (
//   amount: number,
//   email: string,
//   name: string,
// ) => {
//   let stripeCustomer;

//   const existingCustomer = await stripe.customers.list({
//     email: email,
//     limit: 1,
//   });

//   if (existingCustomer.data.length === 0) {
//     // Create a new customer if none exists
//     stripeCustomer = await stripe.customers.create({
//       email: email,
//       name: name, // Pass the name when creating the customer
//     });
//   } else {
//     stripeCustomer = existingCustomer.data[0];

//     // Optionally update the customer's name if it's missing or outdated
//     if (stripeCustomer.name !== name) {
//       await stripe.customers.update(stripeCustomer.id, {
//         name: name,
//       });
//     }
//   }

//   // const ephemeralKey = await stripe.ephemeralKeys.create(
//   //   {customer: customer.id},
//   //   {apiVersion: '2025-02-24.acacia'},
//   // );

//   // const paymentIntent = await stripe.paymentIntents.create({
//   //   amount: amount,
//   //   currency: 'usd',
//   //   customer: customer.id,
//   //   // In the latest version of the API, specifying the `automatic_payment_methods` parameter
//   //   // is optional because Stripe enables its functionality by default.
//   //   automatic_payment_methods: {
//   //     enabled: true,
//   //   },
//   // });

//   // return {
//   //   paymentIntent,
//   //   ephemeralKey,
//   //   customer,
//   // };
//   return {
//     stripeCustomer,
//   };
// };
