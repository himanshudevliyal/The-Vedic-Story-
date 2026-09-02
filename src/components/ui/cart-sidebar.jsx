"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { Trash, Minus, Plus, Package } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart, closeCart } from "@/lib/features/slice";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  updateCartItem,
  deleteCartItem,
  getCartItems,
} from "@/services/cart-services";

import { useAuth } from "@/providers/auth-provider";
import Loader from "../loader";
import { getLocalCart, setLocalCart } from "@/hooks/useAddToCart";

export default function CartSidebar() {
  const { user } = useAuth();
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [localCartItems, setLocalCartItems] = useState(() =>
    !user && isCartOpen ? getLocalCart() : []
  );

  const dispatch = useDispatch();
  const router = useRouter();
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: ({ id, ...data }) => updateCartItem(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["cart-items"]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ id }) => deleteCartItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["cart-items"]);
    },
  });

  /* =========================
     API Cart (Logged In)
  ========================= */
  const {
    data: apiCartItems = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["cart-items", isCartOpen],
    queryFn: async () => {
      const { data } = await getCartItems();
      return data;
    },
    enabled: !!user,
  });

  /* =========================
     Load Local Cart (Guest)
  ========================= */
  useEffect(() => {
    if (!user && isCartOpen) {
      setLocalCartItems(getLocalCart());
    }
  }, [user, isCartOpen]);

  /* =========================
     Final Cart Source
  ========================= */
  const cartItems = user ? apiCartItems : localCartItems;
  /* =========================
     Subtotal
  ========================= */
  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (sum, item) =>
        sum +
        Number(String(item.product_price).replace(/[^\d.-]/g, "")) *
          (item.quantity ?? 1),
      0
    );
  }, [cartItems]);

  if (isLoading && user) return <Loader />;
  if (isError) return error?.message ?? "Error loading cart";

  return (
    <Sheet
      open={isCartOpen}
      onOpenChange={(open) =>
        open ? dispatch(toggleCart()) : dispatch(closeCart())
      }
    >
      <SheetContent className="w-full sm:w-[400px] z-[99999] flex flex-col p-4 bg-white">
        <SheetHeader className="mb-4 border-b pb-2">
          <SheetTitle className="text-xl font-bold">Your Cart</SheetTitle>
        </SheetHeader>

        {/* =========================
           CART ITEMS
        ========================= */}
        <div className="flex-1 overflow-y-auto space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground mt-8">
              Your cart is empty
            </p>
          ) : (
            cartItems.map((item, index) => (
              <div
                key={user ? item.id : index}
                className="flex gap-4 border-b pb-4"
              >
                <div className="relative w-20 h-20 bg-gray-100 rounded">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_FILE_BASE}${item?.pictures?.[0]}`}
                    alt={item?.title ?? ""}
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{item.title}</h3>
                  <p className="text-sm">₹{item.product_price}</p>

                  <p className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full w-fit">
                    <Package size={14} className="text-primary-500" />
                    <span className="font-medium">{item.pack_size}</span>
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    {/* MINUS */}
                    <Button
                      size="icon"
                      variant="outline"
                      disabled={item.quantity <= 1}
                      onClick={() => {
                        if (user) {
                          updateMutation.mutate({
                            id: item.id,
                            quantity: item.quantity - 1,
                          });
                        } else {
                          const updated = [...localCartItems];
                          updated[index].quantity -= 1;
                          setLocalCart(updated);
                          setLocalCartItems(updated);
                        }
                      }}
                    >
                      <Minus size={14} />
                    </Button>

                    <span>{item.quantity ?? 1}</span>

                    {/* PLUS */}
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => {
                        if (user) {
                          updateMutation.mutate({
                            id: item.id,
                            quantity: item.quantity + 1,
                          });
                        } else {
                          const updated = [...localCartItems];
                          updated[index].quantity =
                            (updated[index].quantity ?? 1) + 1;
                          setLocalCart(updated);
                          setLocalCartItems(updated);
                        }
                      }}
                    >
                      <Plus size={14} />
                    </Button>

                    {/* DELETE */}
                    <Button
                      size="icon"
                      variant="ghost"
                      className="ml-auto text-red-500"
                      onClick={() => {
                        if (user) {
                          deleteMutation.mutate({ id: item.id });
                        } else {
                          const updated = localCartItems.filter(
                            (_, i) => i !== index
                          );
                          setLocalCart(updated);
                          setLocalCartItems(updated);
                        }
                      }}
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* =========================
           FOOTER
        ========================= */}
        <div className="border-t pt-4 space-y-4">
          <div className="flex justify-between font-semibold">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          <div className="flex items-start gap-2">
            <Checkbox
              checked={agreedToTerms}
              onCheckedChange={setAgreedToTerms}
            />
            <span className="text-sm">I agree with terms & conditions</span>
          </div>

          <Button
            disabled={!agreedToTerms || cartItems.length === 0}
            onClick={() => {
              dispatch(closeCart());
              router.push("/checkout");
            }}
            className="w-full"
          >
            CHECKOUT
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
