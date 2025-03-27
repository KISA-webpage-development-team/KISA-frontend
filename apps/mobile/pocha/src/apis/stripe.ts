import {STRIPE_SECRET_KEY} from '@env';

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

export const create_paymentIntent = async (
  amount: number,
  customerID: string,
) => {
  const url = 'https://api.stripe.com/v1/payment_intents';

  const body = new URLSearchParams();
  body.append('amount', amount.toString());
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

