// import client from '../shared/lib/axios/client';
import {
  MenuByCategory,
  PochaInfo,
  Cart,
  Orders,
  OrderHistory,
  PayInfo,
} from '../types/pocha';
/**
 * @desc Fetch pocha info, if no upcoming pocha -> empty data, if else -> unempty data
 * @route GET /pocha/status-info/?date=${date}
 */
// export async function getPochaInfo(date: Date): Promise<PochaInfo> {
//   // [TODO] change fakeDateEST to date for production
//   // const fakeDateEST = new Date("2025-01-10T21:00:00");

//   const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Detect user's time zone
//   const KST_OFFSET = 14; // KST is UTC+9, EST is UTC-5 => Difference is +14 hours

//   let convertedDate;

//   // Check if the user's time zone is KST
//   if (userTimeZone === 'Asia/Seoul') {
//     convertedDate = new Date(date.getTime() + KST_OFFSET * 60 * 60 * 1000);
//   } else {
//     convertedDate = date; // If not in KST, no adjustment
//   }

//   const url = `/pocha/status-info/?date=${date.toISOString().split('.')[0]}`;

//   try {
//     const response = await client.get(url);
//     return response.data;
//   } catch (error) {
//     throw new Error('Error fetching pocha information');
//   }
// }

export async function getPochaInfoMock(date: Date) {
  const mockPochaInfo: PochaInfo = {
    pochaID: 1,
    startDate: new Date(),
    endDate: new Date(new Date().getTime() + 4 * 60 * 60 * 1000),
    title: 'Halloween Pocha',
    description:
      '할로윈 포차 입니다. 한잔 포차에서 11월 2일 진행될 예정입니다! ^^',
    ongoing: true,
  };
  return mockPochaInfo;
}

/**
 * @desc Fetch pocha menu
 * @route GET /pocha/menu/${pochaid}
 */
// export async function getPochaMenu(
//   pochaid: number,
//   token: string,
// ): Promise<MenuByCategory[] | undefined> {
//   const url = `/pocha/menu/${pochaid}/`;
//   try {
//     const response = await client.get(url, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     return response?.data;
//   } catch (error) {
//     console.log(error);
//     return undefined;
//   }
// }

/**
 * @desc Fetch user's cart
 * @route GET /pocha/cart/${email}/${pochaid}
 */
// export async function getUserCart(
//   email: string,
//   pochaid: number,
// ): Promise<Cart | undefined> {
//   const url = `/pocha/cart/${email}/${pochaid}/`;
//   try {
//     const response = await client.get(url);

//     return response?.data;
//   } catch (error) {
//     console.log(error);
//     return undefined;
//   }
// }

/**
 * @desc Fetch active orders of user from pocha
 * @route GET /pocha/orders/${email}/${pochaid}
 * @note Assume orders are returned in descending order of waiting
 */
// export async function getUserOrders(
//   email: string,
//   pochaid: number,
//   token: string,
// ): Promise<Orders | undefined> {
//   const url = `/pocha/order/${email}/${pochaid}/`;
//   try {
//     const response = await client.get(url, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     return response?.data;
//   } catch (error) {
//     console.log(error);
//     return undefined;
//   }
// }

/**
 * @desc Fetch all orders of pocha
 * @route GET /pocha/orders/${pochaid}
 */
// export async function getPochaOrders(
//   pochaid: number,
//   token: string,
// ): Promise<Orders | undefined> {
//   const url = `/pocha/dashboard/${pochaid}/`;
//   try {
//     const response = await client.get(url, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     return response?.data;
//   } catch (error) {
//     console.log(error);
//     return undefined;
//   }
// }

/**
 * @desc Fetch user's closed orders
 * @route GET /pocha/orders/${email}/${pochaid}/closed
 */
// export async function getUserClosedOrders(
//   email: string,
//   pochaid: number,
//   token: string,
// ): Promise<OrderHistory | undefined> {
//   const url = `/pocha/order/${email}/${pochaid}/closed/`;
//   try {
//     const response = await client.get(url, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     return response?.data;
//   } catch (error) {
//     console.log(error);
//     return undefined;
//   }
// }

/**
 * @desc Fetch all closed orders
 * @route GET /pocha/orders/${pochaid}/closed
 */
// export async function getPochaClosedOrders(
//   pochaid: number,
//   token: string,
// ): Promise<OrderHistory | undefined> {
//   const url = `/pocha/dashboard/${pochaid}/closed/`;
//   try {
//     const response = await client.get(url, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     return response?.data;
//   } catch (error) {
//     console.log(error);
//     return undefined;
//   }
// }

// [TODO] change route URL
/**
 * @desc Fetch pay info by user (cart)
 * @route GET /pocha/cart/${email}/${pochaid}/checkout-info
 * @params email, token, pochaid
 */
// export async function getPayInfo(
//   email: string,
//   pochaid: number,
//   token: string,
// ): Promise<PayInfo | undefined> {
//   const url = `/pocha/cart/${email}/${pochaid}/checkout-info/`;
//   try {
//     const response = await client.get(url, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     return response?.data;
//   } catch (error) {
//     console.log(error);
//     return undefined;
//   }
// }
