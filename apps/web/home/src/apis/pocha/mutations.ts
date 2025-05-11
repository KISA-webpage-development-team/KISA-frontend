import client from "@/lib/axios/client";
import { AddItemToCartBody } from "@/types/pocha";

interface ChangeItemCartResponse {
  isStocked: boolean;
  message: string;
}

/**
 * @desc Change items inside the cart
 * @route POST /pocha/cart/{email}/{pochaid}
 * @example
 * valid: { message: "Items posted successfully" }
 * invalid: 401, { message: "Items not created" }
 */
export async function changeItemInCart(
  email: string,
  pochaid: number,
  body: AddItemToCartBody
): Promise<ChangeItemCartResponse | undefined> {
  const url = `/pocha/cart/${email}/${pochaid}/`;

  try {
    const response = await client.post(url, body, {
      // headers: {
      //     Authorization: `Bearer ${token}`,
      // },
    });
    return response?.data;
  } catch (error) {
    return undefined;
  }
}

/**
 * @desc Notify the status of payment
 * @route PUT /pocha/{email}/{pochaid}/pay-result/
 * @params body: { result: "success" | "failure"}
 */
export async function notifyPayResult(
  email: string,
  pochaid: number,
  body: { result: "success" | "failure" }
) {
  const url = `/pocha/payment/${email}/${pochaid}/pay-result/`;
  try {
    const response = await client.put(url, body);
    return response?.data;
  } catch (error) {
    return undefined;
  }
}

/**
 * @desc Change Status of order item
 * @route PUT /pocha/dashboard/${orderItemId}/change-status/
 * @params no body
 */
export async function changeOrderItemStatus(orderItemId: number) {
  const url = `/pocha/dashboard/${orderItemId}/change-status/`;

  try {
    const response = await client.put(url);
    return response?.data;
  } catch (error) {
    return undefined;
  }
}

/**
 * @desc check whether user's cart contains any out-of-stock items
 * @route PUT /pocha/cart/${email}/${pochaid}/check-stock
 */
export async function checkCartStock(
  email: string,
  pochaid: number
): Promise<{ isStocked: boolean } | undefined> {
  const url = `/pocha/payment/${email}/${pochaid}/check-stock/`;
  try {
    const response = await client.put(url);

    return response?.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export async function checkCartStockMock(
  email: string,
  pochaid: number
): Promise<boolean | undefined> {
  return true;
}

interface ChangeStockBody {
  menuID: number;
  quantity: number;
}

/**
 * @desc change stock of menu item
 * @route PUT /pocha/dashboard/change-stock/
 */
export async function changeStock(body: ChangeStockBody) {
  const url = `/pocha/dashboard/change-stock/`;

  try {
    const response = await client.put(url, body);
    return response?.data;
  } catch (error) {
    return undefined;
  }
}
