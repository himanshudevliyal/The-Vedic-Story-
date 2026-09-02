"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getOrder, getOrderItems } from "@/services/order-services";
import { Train } from "lucide-react";
import { Check } from "lucide-react";
import { Truck } from "lucide-react";

import { useOrderInvoice } from "@/hooks/use-orders";

import {
  Package,
  Calendar,
  Download,
  Receipt,
  ClipboardCheck,
  PackageSearch,
  BookX,
  CircleX,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Loader from "@/components/loader";
import { downloadPdf } from "@/utils/download-odf";

const STATUS_STEPS = [
  { label: "Order Accepted", icon: ClipboardCheck },
  { label: "Order Processing", icon: PackageSearch },
  { label: "In Transit", icon: Train },
  { label: "Out For Delivery", icon: Truck },
  { label: "Delivered", icon: Check },
];

export default function OrderDetailsPage({}) {
  const { id } = useParams();
  const { data, isLoading, isError, error, isPending } = useQuery({
    queryKey: ["order-items", id],
    queryFn: () => getOrderItems(id),
  });

  const {
    data: order,
    isLoading: isOrderLoading,
    isError: isOrderError,
    error: orderError,
  } = useQuery({
    queryKey: ["orders", id],
    queryFn: () => getOrder(id),
  });
  const downloadInvoiceMutation = useOrderInvoice(id);

  const handleDownloadInvoice = async () => {
    try {
      const { blob, filename } = await downloadInvoiceMutation.mutateAsync();
      downloadPdf(blob, filename);
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <Loader></Loader>;
  if (isError) return <p className="p-6 text-red-500">{error.message}</p>;

  const orderData = data?.data;
  const items = orderData?.items || [];

  if (!items.length) {
    return <p className="p-6 text-red-500">No items found for this order</p>;
  }

  const currentStatus = order?.data?.order_status;
  const currentStatusIndex = STATUS_STEPS.findIndex(
    (step) => step.label.toLowerCase() === currentStatus?.toLowerCase(),
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 section">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-8">
          {isOrderLoading ? (
            <Loader />
          ) : isOrderError ? (
            <p className="text-red-500">
              {orderError?.message ?? "Something went wrong"}
            </p>
          ) : (
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div className="mb-4 md:mb-0">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Order #{order?.data?.order_no}
                </h1>
                <div className="flex items-center text-gray-600 text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Placed on{" "}
                  {new Date(items[0]?.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
              {order?.data.is_paid && (
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleDownloadInvoice}
                    disabled={downloadInvoiceMutation.isPending}
                    className={`btn flex items-center gap-2 w-full text-nowrap ${
                      downloadInvoiceMutation.isPending
                        ? "opacity-70 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {downloadInvoiceMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Downloading...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        Download Invoice
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Status Stepper UI */}

          {currentStatus == "Canceled" ? (
            <div className="rounded-4xl gap-6 p-10 mx-auto  flex justify-center  items-center  flex-col">
              <CircleX size={60} className="text-red-500" />
              <p className="text-4xl"> Order Canceled</p>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row items-center justify-center mt-6 lg:px-4">
              {STATUS_STEPS.map((step, index) => {
                const isCompleted = index <= currentStatusIndex;
                const isUpcoming = index > currentStatusIndex;

                return (
                  <div
                    key={index}
                    className="flex flex-col items-center relative z-2 w-full lg:w-1/4 mt-10 lg:mt-0"
                  >
                    {/* Circle */}
                    <div
                      className={`
                      w-10 h-10 md:w-16 md:h-16 rounded-full flex items-center justify-center
                      transition-all duration-500 shadow-lg
                      ${
                        isCompleted
                          ? "bg-primary/200 text-white scale-100"
                          : "bg-gray-300 text-white scale-90"
                      }
                    `}
                    >
                      <step.icon size={22} />
                    </div>

                    {/* Label */}
                    <p
                      className={`
                      mt-3 text-xs md:text-sm font-semibold text-center
                      ${isCompleted ? "text-primary/200" : "text-gray-400"}
                    `}
                    >
                      {step.label}
                    </p>

                    {/* Connector Line */}
                    {index < STATUS_STEPS.length - 1 && (
                      <div
                        className="
                        absolute
                        lg:top-8 lg:left-1/2 lg:w-full lg:h-0.5
                        top-full left-1/2 h-12 w-0.5
                        -z-10
                      "
                      >
                        <div className="relative w-full h-full">
                          {/* Base Line */}
                          <div className="absolute inset-0 bg-gray-300 rounded-full" />

                          {/* Progress */}
                          <div
                            className={`
                            absolute inset-0 bg-primary/200 rounded-full transition-all duration-500
                            ${isCompleted ? "w-full h-full" : "w-0 lg:h-0"}
                          `}
                          />

                          {/* Dotted for Upcoming */}
                          {isUpcoming && (
                            <div className="absolute inset-0 flex items-center justify-center gap-1 flex-col lg:flex-row">
                              {[...Array(6)].map((_, i) => (
                                <div
                                  key={i}
                                  className="w-1.5 h-1.5 rounded-full bg-gray-400"
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Order Items */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Package className="w-5 h-5 mr-3 text-primary/80" />
                Order Items
              </h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                  >
                    {item?.pictures?.[0] && (
                      <Image
                        width={200}
                        height={200}
                        src={`${process.env.NEXT_PUBLIC_FILE_BASE}${item?.pictures[0]}`}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-lg mr-4 shadow-sm"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>

                      <p className="text-sm text-gray-600">
                        Pack Size: {item.pack_size}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ₹
                        {(
                          parseFloat(item.product_price) * item.quantity
                        ).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        ₹{parseFloat(item.product_price).toLocaleString()} each
                      </p>
                      {/* <div className="bg-green-200 rounded-[20px] px-3 py-1 text-xs">
                        {item.status}
                      </div> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Receipt className="w-5 h-5 mr-3 text-primary/80" />
                Order Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Items</span>
                  <span className="font-medium">{items.length}</span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between py-2">
                    <span className="text-lg font-semibold text-gray-900">
                      Total
                    </span>
                    <span className="text-lg font-bold text-primary/80">
                      ₹
                      {items
                        .reduce((sum, i) => sum + parseFloat(i.total || 0), 0)
                        .toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
