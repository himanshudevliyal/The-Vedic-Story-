// "use client";

// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
// } from "@/components/ui/sheet";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import Image from "next/image";
// import { Trash, Minus, Plus } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleCart, closeCart } from "@/lib/features/slice";
// import { useState, useEffect, useMemo } from "react";
// import { useRouter } from "next/navigation";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import {
//   deleteCartItem,
//   getCartItems,
//   updateCartItem,
// } from "@/services/cart-services";
// import { useAuth } from "@/providers/auth-provider";
// import Loader from "../loader";
// import { toast, Toaster } from "sonner";

// export default function CartSidebar() {
//   const dispatch = useDispatch();
//   const isCartOpen = useSelector((state) => state.cart.isCartOpen);
//   const [agreedToTerms, setAgreedToTerms] = useState(false);
//   const router = useRouter();
//   const queryClient = useQueryClient();
//   const { user } = useAuth();

//   const { mutate } = useMutation({
//     mutationFn: ({ id, ...data }) => updateCartItem(id, { ...data }),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["cart"]);
//       queryClient.invalidateQueries(["cart-items"]);
//     },
//   });

//   const deleteMutation = useMutation({
//     mutationFn: ({ id }) => deleteCartItem(id),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["cart"]);
//       queryClient.invalidateQueries(["cart-items"]);
//     },
//   });

//   const {
//     data: cartItems,
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ["cart-items", isCartOpen],
//     queryFn: async () => {
//       const { data } = await getCartItems();
//       return data;
//     },
//     enabled: !!user,
//   });

//   // 🧠 Automatically handle out-of-stock and over-quantity items
//   useEffect(() => {
//     if (!cartItems?.length) return;

//     let removedCount = 0;
//     let updatedCount = 0;

//     cartItems.forEach((item) => {
//       // Remove out of stock
//       if (item.stock <= 0) {
//         deleteMutation.mutate({ id: item.id });
//         removedCount++;
//       }
//       // If quantity > stock, adjust to stock
//       else if (item.quantity > item.stock) {
//         mutate({ id: item.id, quantity: item.stock });
//         updatedCount++;
//       }
//     });

//     if (removedCount > 0) {
//       toast.error(
//         `${removedCount} item${
//           removedCount > 1 ? "s" : ""
//         } removed due to out of stock.`
//       );
//     }

//     if (updatedCount > 0) {
//       toast.success(
//         `${updatedCount} item${
//           updatedCount > 1 ? "s" : ""
//         } quantity adjusted to available stock.`
//       );
//     }
//   }, [cartItems]);

//   const subtotal = useMemo(() => {
//     return (
//       cartItems?.reduce(
//         (sum, item) =>
//           sum +
//           Number(String(item.price).replace(/[^\d.-]/g, "")) * item.quantity,
//         0
//       ) ?? 0
//     );
//   }, [cartItems]);

//   if (isLoading) return <Loader />;
//   if (isError) return error?.message ?? "Error loading cart.";

//   return (
//     <>
//       <Toaster position="top-center" />
//       <Sheet
//         className="relative z-[9999]"
//         open={isCartOpen}
//         onOpenChange={(open) =>
//           open ? dispatch(toggleCart()) : dispatch(closeCart())
//         }
//       >
//         <SheetContent className="w-full sm:w-[400px] flex flex-col p-4 bg-white shadow-xl rounded-md">
//           <SheetHeader className="relative mb-4 border-b pb-2">
//             <SheetTitle className="text-xl font-bold text-gray-800">
//               Your Cart
//             </SheetTitle>
//           </SheetHeader>

//           <div className="flex-1 overflow-y-auto py-2 pr-1 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
//             {cartItems?.length === 0 ? (
//               <p className="text-center text-sm text-muted-foreground mt-8">
//                 Your cart is empty.
//               </p>
//             ) : (
//               <div className="space-y-4">
//                 {cartItems?.map((item) => (
//                   <div
//                     key={item.id}
//                     className="flex items-center gap-4 border-b pb-4 last:border-b-0 last:pb-0 transition-all"
//                   >
//                     <div className="relative w-20 h-20 flex-shrink-0 bg-blue-50 rounded-md overflow-hidden">
//                       <Image
//                         src={`${process.env.NEXT_PUBLIC_FILE_BASE}${item?.pictures?.[0]}`}
//                         alt={item?.title ?? ""}
//                         fill
//                         className="object-contain"
//                       />
//                     </div>

//                     <div className="flex-1 grid gap-1">
//                       <h3 className="font-semibold text-sm text-gray-800">
//                         {item.title}
//                       </h3>
//                       <p className="text-sm text-muted-foreground">
//                         ₹{item.price}
//                       </p>

//                       {/* 🧾 Stock Status */}
//                       {item.stock === 0 ? (
//                         <p className="text-red-600 text-xs font-bold uppercase tracking-wide">
//                           Out of stock
//                         </p>
//                       ) : item.stock <= 5 ? (
//                         <p className="text-orange-500 text-xs font-semibold">
//                           Only {item.stock} left in stock!
//                         </p>
//                       ) : null}

//                       <div className="flex items-center gap-2 mt-1">
//                         {item.stock > 0 ? (
//                           <>
//                             <Button
//                               variant="outline"
//                               size="icon"
//                               className="h-7 w-7 bg-white border hover:bg-blue-50"
//                               disabled={item.quantity <= 1}
//                               onClick={() =>
//                                 mutate({
//                                   id: item.id,
//                                   quantity: item.quantity - 1,
//                                 })
//                               }
//                             >
//                               <Minus className="h-4 w-4" />
//                             </Button>

//                             <span className="text-sm font-medium">
//                               {item.quantity}
//                             </span>

//                             <Button
//                               variant="outline"
//                               size="icon"
//                               className="h-7 w-7 bg-white border hover:bg-blue-50"
//                               disabled={item.quantity >= item.stock}
//                               onClick={() =>
//                                 mutate({
//                                   id: item.id,
//                                   quantity: item.quantity + 1,
//                                 })
//                               }
//                             >
//                               <Plus className="h-4 w-4" />
//                             </Button>
//                           </>
//                         ) : (
//                           <span className="text-red-600 text-xs font-bold">
//                             Out of stock
//                           </span>
//                         )}

//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           className="ml-auto text-red-500 hover:text-red-600"
//                           onClick={() => deleteMutation.mutate({ id: item.id })}
//                         >
//                           <Trash className="h-5 w-5" />
//                         </Button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div className="border-t pt-4 space-y-4 mt-4">
//             <div className="flex justify-between text-base font-semibold text-gray-700">
//               <span>Subtotal:</span>
//               <span>₹{subtotal}</span>
//             </div>

//             <p className="text-sm text-muted-foreground">
//               Taxes and shipping calculated at checkout
//             </p>

//             <div className="flex items-start gap-2">
//               <Checkbox
//                 id="terms"
//                 checked={agreedToTerms}
//                 onCheckedChange={(checked) => setAgreedToTerms(checked)}
//               />
//               <label
//                 htmlFor="terms"
//                 className="text-sm font-medium text-gray-700 leading-snug"
//               >
//                 I agree with the{" "}
//                 <a
//                   href="#"
//                   className="underline text-blue-600 hover:text-blue-800"
//                 >
//                   terms and conditions
//                 </a>
//               </label>
//             </div>

//             <div className="flex gap-2">
//               <Button
//                 className="flex-1 bg-primary text-white hover:bg-primary/90 transition"
//                 disabled={
//                   !agreedToTerms ||
//                   cartItems?.length === 0 ||
//                   cartItems.every((item) => item.stock === 0)
//                 }
//                 onClick={() => {
//                   dispatch(closeCart());
//                   router.push("/checkout");
//                 }}
//               >
//                 CHECK OUT
//               </Button>

//               <Button
//                 variant="outline"
//                 className="flex-1 bg-white border text-gray-700 hover:bg-blue-50"
//                 onClick={() => router.push("/checkout")}
//               >
//                 VIEW CART
//               </Button>
//             </div>
//           </div>
//         </SheetContent>
//       </Sheet>
//     </>
//   );
// }
