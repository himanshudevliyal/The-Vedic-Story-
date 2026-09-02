"use client";

import { useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "@/services/cart-services";
import { handleError } from "@/lib/handle-error-toast";
import { useAuth } from "@/providers/auth-provider";
import { toast } from "sonner";
import { setCartItems, toggleCart } from "@/lib/features/slice";

// ===== LOCAL STORAGE =====
export const getLocalCart = () => {
  if (typeof window === "undefined") return [];
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

export const setLocalCart = (items) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("cart", JSON.stringify(items));
};

export const addToLocalCart = (product, quantity = 1) => {
  const cart = getLocalCart();

  const existingItem = cart.find(
    (item) =>
      item.id === product.id &&
      item.slug === product.slug &&
      item.product_variant_id === product.product_variant_id,
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push(product);
  }

  setLocalCart(cart);
  return cart;
};

// ===== CUSTOM HOOK =====
export const useAddToCart = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: addToCart,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["cart"]);
      queryClient.invalidateQueries(["cart-items"]);

      if (variables?.openCart) {
        dispatch(toggleCart());
      }

      toast.success("Added to cart!");
    },
    onError: handleError,
  });

  const add = ({ product, quantity = 1, openCart = true }) => {
    if (user) {
      const cartData = {
        product_variant_id: product.variant_id,
        quantity: quantity,
        openCart,
      };

      mutate(cartData);
    } else {
      const localProduct = {
        id: product.id,
        product_price: product.product_price,
        title: product.title,
        price: product.price,
        pictures: product.pictures,
        slug: product.slug,
        quantity: quantity,
        pack_size: product.pack_size,
        product_variant_id: product.variant_id,
      };

      const updatedCart = addToLocalCart(localProduct, quantity);
      dispatch(setCartItems(updatedCart));
      if (openCart) {
        dispatch(toggleCart());
      }
      toast.success("Added to cart!");
    }
  };

  return { addToCart: add, isLoading: isPending };
};
