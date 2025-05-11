import { OrderItem } from "@/types/pocha";
import React from "react";

interface OrderTicketProps {
  orderItem: OrderItem;
}

export default function OrderTicket({ orderItem }: OrderTicketProps) {
  return <div>OrderTicket</div>;
}
