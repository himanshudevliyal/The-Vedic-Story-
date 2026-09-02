import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";

export const createOrder = async (item) => {
  const { data } = await http().post(endpoints.orders.getAll, item);
  return data;
};

export const updateOrder = async (id, item) => {
  return await http().put(`${endpoints.orders.getAll}/${id}`, item);
};

export const deleteOrder = async (id) => {
  return await http().delete(`${endpoints.orders.getAll}/${id}`);
};
export const getOrder = async (id) => {
  return await http().get(`${endpoints.orders.getAll}/${id}`);
};

export const getOrders = async () => {
  return await http().get(endpoints.orders.getAll);
};

export const getOrderItems = async (orderId) => {
  return await http().get(`${endpoints.orders.getAll}/${orderId}/items`);
};

export const fetchOrderInvoice = async (orderId) => {
  const response = await http().getFull(
    `${endpoints.orders.getAll}/${orderId}/invoice`,
    { responseType: "blob" },
  );

  const disposition = response.headers["content-disposition"];
  const match = disposition?.match(/filename="?([^"]+)"?/);
  const filename = match?.[1] || "order-invoice.pdf";

  return { blob: response.data, filename };
};

export const fetchOrderShippingLabel = async (orderId) => {
  const response = await http().getFull(
    `${endpoints.orders.getAll}/${orderId}/shipping-label`,
    { responseType: "blob" },
  );

  const disposition = response.headers["content-disposition"];
  const match = disposition?.match(/filename="?([^"]+)"?/);
  const filename = match?.[1] || "order-shipping-details.pdf";

  return { blob: response.data, filename };
};
