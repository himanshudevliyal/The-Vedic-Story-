"use client";

import { useForm } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postAddress, updateAddress } from "@/services/address-services";
import { handleError } from "@/lib/handle-error-toast";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import Loader from "./loader";
import { useEffect } from "react";
import { useOrder } from "@/hooks/use-orders";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";

export default function AddressForm({ type, id, callback }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      address: {
        fullname: "",
        phone: "",
        house: "",
        street: "",
        city: "",
        state: "",
        postal_code: "",
        country: "",
      },
    },
  });

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: postAddress,
    onSuccess: () => {
      toast.success("Address added");
      queryClient.invalidateQueries(["addresses"]);
    },
    onError: (error) => {
      handleError(error);
    },
  });
  const updateMutation = useMutation({
    mutationFn: (data) => updateAddress(id, data),
    onSuccess: () => {
      toast.success("Address updated successfully!");
      queryClient.invalidateQueries(["addresses"]);
      reset();
      callback?.();
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to update address");
    },
  });

  const { data, isLoading, isError, error } = useQuery({
    queryFn: async () => {
      const { data } = await http().get(`${endpoints.addresses.getAll}/${id}`);
      return data;
    },
    queryKey: ["addresses", id],
    enabled: !!id,
  });

  const onSubmit = (data) => {
    type === "create"
      ? createMutation.mutate(data)
      : updateMutation.mutate(data);
  };

  useEffect(() => {
    if (!data) return;
    console.log({ data });
    reset({ ...data });
  }, [data, reset]);

  if (type === "edit" && isLoading) return <Loader />;
  if (type === "edit" && isError) return "Something went wrong.";

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="rounded-xl border-none py-5">
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* House Number */}

            <div>
              <Input
                placeholder="Full Name"
                className="h-12 text-base"
                {...register("address.fullname", {
                  required: " required",
                })}
              />
              {errors.address?.fullname && (
                <span className="text-red-500 text-sm">
                  {errors.address.fullname.message}
                </span>
              )}
            </div>

            <div>
              <Input
                placeholder="Phone Number"
                className="h-12 text-base"
                {...register("address.phone", {
                  required: " required",
                })}
              />
              {errors.address?.phone && (
                <span className="text-red-500 text-sm">
                  {errors.address.phone.message}
                </span>
              )}
            </div>

            <div>
              <Input
                placeholder="House Number"
                className="h-12 text-base"
                {...register("address.house", {
                  required: "House number is required",
                })}
              />
              {errors.address?.house && (
                <span className="text-red-500 text-sm">
                  {errors.address.house.message}
                </span>
              )}
            </div>

            {/* Street Address */}
            <div>
              <Input
                placeholder="Street Address"
                className="h-12 text-base"
                {...register("address.street", {
                  required: "Street address is required",
                })}
              />
              {errors.address?.street && (
                <span className="text-red-500 text-sm">
                  {errors.address.street.message}
                </span>
              )}
            </div>

            {/* City */}
            <div>
              <Input
                placeholder="City"
                className="h-12 text-base"
                {...register("address.city", {
                  required: "City is required",
                })}
              />
              {errors.address?.city && (
                <span className="text-red-500 text-sm">
                  {errors.address.city.message}
                </span>
              )}
            </div>

            {/* State */}
            <div>
              <Input
                placeholder="State"
                className="h-12 text-base"
                {...register("address.state", {
                  required: "State is required",
                })}
              />
              {errors.address?.state && (
                <span className="text-red-500 text-sm">
                  {errors.address.state.message}
                </span>
              )}
            </div>

            {/* Pincode */}
            <div>
              <Input
                placeholder="Postal code"
                type="number"
                className="h-12 text-base"
                {...register("address.postal_code", {
                  required: "Postal code is required",
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "Enter a valid 6-digit postal_code",
                  },
                })}
              />
              {errors.address?.postal_code && (
                <span className="text-red-500 text-sm">
                  {errors.address.postal_code.message}
                </span>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button type="submit" className="">
              {createMutation.isPending && <Loader2 className="animate-spin" />}{" "}
              Save Address
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
