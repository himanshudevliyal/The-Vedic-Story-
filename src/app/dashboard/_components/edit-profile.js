"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Edit2, Trash2, X } from "lucide-react";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  getAddresses,
  updateAddress,
  deleteAddress,
} from "@/services/address-services";

// Validation schema for address editing
const addressEditSchema = z.object({
  fullname: z.string().min(1, "Full name is required"),
  street: z.string().min(1, "Street is required"),
  house: z.string().min(1, "House number is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postal_code: z.string().min(3, "Postal code is required"),
  phone: z.string().min(6).optional(),
});

export default function EditProfile() {
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(addressEditSchema),
    mode: "onChange",
  });

  // Fetch addresses
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["addresses"],
    queryFn: getAddresses,
  });

  // Update address
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateAddress(id, data),
    onSuccess: () => {
      toast.success("Address updated successfully!");
      queryClient.invalidateQueries(["addresses"]);
      setIsDialogOpen(false);
      reset();
      setEditingAddressId(null);
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to update address");
    },
  });

  // Delete address
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteAddress(id, data),
    onSuccess: () => {
      toast.success("Address deleted successfully!");
      queryClient.invalidateQueries(["addresses"]);
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to delete address");
    },
  });

  // Open dialog with prefilled values
  const handleEditClick = (address) => {
    setEditingAddressId(address.id);
    setValue("fullname", address.address.fullname);
    setValue("street", address.address.street);
    setValue("house", address.address.house);
    setValue("city", address.address.city);
    setValue("state", address.address.state);
    setValue("postal_code", address.address.postal_code);
    setValue("phone", address.address.phone || "");
    setIsDialogOpen(true);
  };

  // Submit update
  const onSubmit = (formData) => {
    if (!editingAddressId) return;
    updateMutation.mutate({ id: editingAddressId, data: formData });
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    reset();
    setEditingAddressId(null);
  };

  return (
    <div className="bg-gradient-to-br from-primary/20 to-green-100 mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-green-800 mb-2">
            Edit Your Addresses
          </h2>
          <p className="text-primary/80">
            Manage and update your saved addresses
          </p>
        </div>

        {isLoading ? (
          <Loader />
        ) : isError ? (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-red-500">
              {error?.message || "Failed to load addresses"}
            </p>
          </div>
        ) : !data?.addresses || data.addresses.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-500 text-lg">
              No saved addresses yet. Add one to get started!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {data.addresses.map((item) => (
              <Card
                key={item.id}
                className="shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardHeader className="bg-gradient-to-r from-primary/90 to-primary/80 text-white">
                  <CardTitle className="flex items-center justify-between">
                    <span>{item.address.fullname}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditClick(item)}
                        className="p-2 hover:bg-primary/200 rounded-lg transition-colors"
                        aria-label="Edit address"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => deleteMutation.mutate(item.id)}
                        className="p-2 hover:bg-red-500 rounded-lg transition-colors"
                        aria-label="Delete address"
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </CardTitle>
                </CardHeader>

                <CardContent className="pt-6 space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-primary/80 uppercase tracking-wide mb-1">
                      Street Address
                    </p>
                    <p className="text-gray-800 font-medium">
                      {item.address.house}, {item.address.street}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-primary/80 uppercase tracking-wide mb-1">
                      City & State
                    </p>
                    <p className="text-gray-800 font-medium">
                      {item.address.city}, {item.address.state}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-primary/80 uppercase tracking-wide mb-1">
                      Postal Code
                    </p>
                    <p className="text-gray-800 font-medium">
                      {item.address.postal_code}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-primary/80 uppercase tracking-wide mb-1">
                      Phone Number
                    </p>
                    <a
                      href={`tel:${item.address.phone}`}
                      className="text-primary/90 font-medium hover:text-primary/80 transition-colors"
                    >
                      {item.address.phone}
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Edit Address Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Address</DialogTitle>
            <button
              onClick={handleCloseDialog}
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {[
              "fullname",
              "street",
              "house",
              "city",
              "state",
              "postal_code",
              "phone",
            ].map((field) => (
              <div key={field} className="space-y-2">
                <Label htmlFor={field}>
                  {field.replace("_", " ").toUpperCase()}
                </Label>
                <Input
                  id={field}
                  placeholder={`Enter ${field.replace("_", " ")}`}
                  {...register(field)}
                  className="h-10"
                />
                {errors[field] && (
                  <span className="text-sm text-red-500">
                    {errors[field].message}
                  </span>
                )}
              </div>
            ))}

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseDialog}
                className="flex-1 bg-transparent"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={updateMutation.isPending}
                className="flex-1 bg-primary/80 hover:bg-primary/90 text-white"
              >
                {updateMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
