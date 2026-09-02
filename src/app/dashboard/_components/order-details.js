"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { Download, Loader2 } from "lucide-react";
import { downloadPdf } from "@/utils/download-odf";
import { useOrderInvoice } from "@/hooks/use-orders";

const statusMap = {
  completed: "bg-green-100 text-primary/90",
  pending: "bg-yellow-100 text-yellow-700",
  cancelled: "bg-red-100 text-red-700",
};

const ORDERS_PER_PAGE = 5;

export function OrdersDetails({ orders }) {
  const [page, setPage] = useState(1);
  const [id, setId] = useState(null);

  const downloadInvoiceMutation = useOrderInvoice(id);
  const handleDownloadInvoice = async () => {
    try {
      const { blob, filename } = await downloadInvoiceMutation.mutateAsync();
      downloadPdf(blob, filename);
    } catch (err) {
      console.error(err);
    }
  };

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center text-gray-500 text-lg mt-10">
        No orders yet.
      </div>
    );
  }

  const pageCount = Math.ceil(orders.length / ORDERS_PER_PAGE);
  const paginatedOrders = orders.slice(
    (page - 1) * ORDERS_PER_PAGE,
    page * ORDERS_PER_PAGE,
  );

  return (
    <div className="bg-white shadow rounded-xl overflow-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">All Orders</h2>

      <div className="overflow-x-auto w-full">
        <table className="min-w-full text-sm text-left bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gradient-to-r from-green-100 to-primary/20 text-gray-700 uppercase text-xs border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 font-semibold tracking-wide">Order #</th>
              <th className="px-6 py-3 font-semibold tracking-wide">
                Customer
              </th>
              <th className="px-6 py-3 font-semibold tracking-wide">City</th>
              <th className="px-6 py-3 font-semibold tracking-wide">Address</th>
              <th className="px-6 py-3 font-semibold tracking-wide">Date</th>
              <th className="px-6 py-3 font-semibold tracking-wide">Total</th>
              <th className="px-6 py-3 font-semibold tracking-wide">Status</th>
              <th className="px-6 py-3 font-semibold tracking-wide  ">
                Invoice
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 text-gray-700">
            {paginatedOrders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-primary/20 hover:shadow-sm transition-all duration-200 ease-in-out"
              >
                <td className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap">
                  <Link href={`/dashboard/orders/${order.id}`}>
                    <span className="hover:underline text-primary/80 cursor-pointer">
                      {order.order_no}
                    </span>
                  </Link>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {order.shipping_address?.fullname}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.shipping_address?.city}
                </td>
                <td className="px-6 py-4 min-w-[200px]">
                  {order.shipping_address?.street},{" "}
                  {order.shipping_address?.state} -{" "}
                  {order.shipping_address?.postal_code}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(order.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">
                  ₹{order.total}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge
                    className={cn(
                      "text-xs font-medium px-3 py-1 rounded-full shadow-sm capitalize",
                      statusMap[order.order_status] || statusMap.pending,
                    )}
                  >
                    {order.order_status}
                  </Badge>
                </td>

                {order.is_paid && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-x-2">
                      {["invoice"].map((doc, ind) => {
                        const isPending =
                          id === order.id &&
                          doc === "invoice" &&
                          downloadInvoiceMutation.isPending;

                        return (
                          <Button
                            key={ind}
                            disabled={isPending}
                            onClick={() => {
                              setId(order.id);
                              setTimeout(() => {
                                handleDownloadInvoice();
                              });
                            }}
                            className={cn(
                              buttonVariants({ variant: "default" }),
                              "capitalize",
                            )}
                            target="_blank"
                          >
                            {doc}{" "}
                            {isPending ? (
                              <Loader2 className="animate-spin" />
                            ) : (
                              <Download />
                            )}
                          </Button>
                        );
                      })}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pageCount > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          {[...Array(pageCount)].map((_, i) => (
            <Button
              key={i}
              size="sm"
              variant={page === i + 1 ? "default" : "outline"}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(p + 1, pageCount))}
            disabled={page === pageCount}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
