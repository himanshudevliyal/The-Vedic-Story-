import { useState } from "react";
import Loader from "@/components/loader";
import AddressForm from "@/components/address-form";
import { deleteAddress, getAddresses } from "@/services/address-services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Building2,
  Edit2,
  Home,
  MapPin,
  Phone,
  Plus,
  Trash2,
  User,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export default function Addresses() {
  const queryClient = useQueryClient();

  // ===== STATES =====
  const [editAddressId, setEditAddressId] = useState(null);
  const [confirmEditId, setConfirmEditId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [isAddressModal, setIsAddressModal] = useState(false);

  // ===== FETCH ADDRESSES =====
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["addresses"],
    queryFn: getAddresses,
  });

  // ===== DELETE MUTATION =====
  const deleteMutation = useMutation({
    mutationFn: deleteAddress,
    onSuccess: () => {
      toast.success("Address deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
    onError: (err) => {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Failed to delete address";
      toast.error(message);
    },
  });

  // ===== UI STATES =====
  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <p className="text-red-500 text-center mt-10">
        {error?.message || "Something went wrong"}
      </p>
    );
  }

  return (
    <>
      <div className="bg-gradient-to-br from-primary/20 to-green-100 h-full">
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* HEADER */}
          <div className="mb-10">
            <div className="  flex justify-between">
              <div>
                <h1 className="text-4xl font-bold text-green-800">
                  Saved Addresses
                </h1>
                <p className="text-primary/80 mt-1">
                  Total addresses: {data?.total || 0}
                </p>
              </div>

              <Button
                type="button"
                className="btn"
                onClick={() => {
                  setIsAddressModal(true);
                }}
              >
                <Plus className="w-4 h-4" />
                Add New Address
              </Button>
              <Dialog open={isAddressModal} onOpenChange={setIsAddressModal}>
                <DialogContent className="max-w-md">
                  <DialogHeader className="sr-only">
                    <DialogTitle>Add Address</DialogTitle>
                  </DialogHeader>
                  <AddressForm
                    type="create"
                    callback={() => setIsAddressModal(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* ADDRESS LIST */}
          <div className="grid md:grid-cols-2 gap-6">
            {data?.addresses?.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition overflow-hidden"
              >
                {/* CARD HEADER */}
                <div className="bg-gradient-to-r from-primary/90 to-primary/80 px-6 py-5 flex justify-between items-center">
                  <div className="flex items-center gap-3 text-white">
                    <User className="w-6 h-6" />
                    <h2 className="text-xl font-semibold">
                      {item.address.fullname}
                    </h2>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setConfirmEditId(item.id)}
                      className="p-2 hover:bg-primary/200 rounded-lg"
                      aria-label="Edit address"
                    >
                      <Edit2 className="w-5 h-5 text-white" />
                    </button>

                    <button
                      onClick={() => setConfirmDeleteId(item.id)}
                      className="p-2 hover:bg-red-500 rounded-lg"
                      aria-label="Delete address"
                    >
                      <Trash2 className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>

                {/* CARD BODY */}
                <div className="p-6 grid gap-5 md:grid-cols-2">
                  <AddressItem
                    icon={<Home />}
                    label="Street Address"
                    value={`${item.address.house}, ${item.address.street}`}
                  />

                  <AddressItem
                    icon={<Building2 />}
                    label="City & State"
                    value={`${item.address.city}, ${item.address.state}`}
                  />

                  <AddressItem
                    icon={<MapPin />}
                    label="Postal Code"
                    value={item.address.postal_code}
                  />

                  <AddressItem
                    icon={<Phone />}
                    label="Phone Number"
                    value={item.address.phone}
                    isLink
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== EDIT CONFIRM DIALOG ===== */}
      <Dialog
        open={!!confirmEditId}
        onOpenChange={() => setConfirmEditId(null)}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit Address?</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-gray-600">
            Are you sure you want to edit this address?
          </p>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setConfirmEditId(null)}>
              Cancel
            </Button>

            <Button
              onClick={() => {
                setEditAddressId(confirmEditId);
                setConfirmEditId(null);
              }}
            >
              Yes, Edit
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ===== DELETE CONFIRM DIALOG ===== */}
      <Dialog
        open={!!confirmDeleteId}
        onOpenChange={() => setConfirmDeleteId(null)}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Address?</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-gray-600">
            This action cannot be undone. Are you sure?
          </p>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setConfirmDeleteId(null)}>
              Cancel
            </Button>

            <Button
              variant="destructive"
              onClick={() => {
                deleteMutation.mutate(confirmDeleteId);
                setConfirmDeleteId(null);
              }}
              disabled={deleteMutation.isPending}
            >
              Yes, Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ===== EDIT FORM DIALOG ===== */}
      <Dialog
        open={!!editAddressId}
        onOpenChange={() => setEditAddressId(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Address</DialogTitle>
            <button
              onClick={() => setEditAddressId(null)}
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </DialogHeader>

          <AddressForm
            type="edit"
            id={editAddressId}
            callback={() => {
              setEditAddressId(null);
              setIsAddressModal(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

/* ===== REUSABLE ADDRESS ITEM ===== */
function AddressItem({ icon, label, value, isLink }) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-1 p-2 bg-green-100 rounded-lg text-primary/90">
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold text-primary/200 uppercase mb-1">
          {label}
        </p>
        {isLink ? (
          <a
            href={`tel:${value}`}
            className="text-green-800 font-medium hover:text-primary/80"
          >
            {value}
          </a>
        ) : (
          <p className="text-green-800 font-medium">{value}</p>
        )}
      </div>
    </div>
  );
}
