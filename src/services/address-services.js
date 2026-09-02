import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";

export const getAddresses = async () => {
  const { data } = await http().get(endpoints.addresses.getAll);
  return data;
};
export const getAddress = async (id) => {
  const { data } = await http().get(`${endpoints.addresses.getAll}/${id}`);
  return data;
};
export const postAddress = async (data) => {
  return await http().post(endpoints.addresses.getAll, data);
};

// Update an existing address
export const updateAddress = async (id, addressData) => {
  const { data } = await http().put(
    `${endpoints.addresses.getAll}/${id}`,
    addressData
  );
  return data;
};

// Delete an address
export const deleteAddress = async (id) => {
  const { data } = await http().delete(`${endpoints.addresses.getAll}/${id}`);
  return data;
};
