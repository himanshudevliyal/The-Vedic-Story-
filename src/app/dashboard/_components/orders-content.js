import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CheckCircle, Truck, Settings, Package } from "lucide-react";
import Image from "next/image";

const statusIcons = {
  pending: Clock,
  processing: Settings,
  shipped: Truck,
  delivered: CheckCircle,
};

const statusColors = {
  pending:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  processing:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  shipped:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  delivered:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
};

export function OrdersContent({ orders }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">
            Track and manage your order history
          </p>
        </div>
        <Badge variant="secondary" className="text-sm">
          {orders.length} total orders
        </Badge>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
            <p className="text-muted-foreground text-center">
              When you place your first order, it will appear here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => {
            const StatusIcon = statusIcons[order.status];
            return (
              <Card
                key={order.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <StatusIcon className="h-5 w-5 text-muted-foreground" />
                      Order #{order.id}
                    </CardTitle>
                    <Badge
                      className={`capitalize ${statusColors[order.status]}`}
                    >
                      {order.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-4 p-3 bg-muted/50 rounded-lg">
                    <div className="relative h-16 w-16 rounded-md overflow-hidden bg-background">
                      <Image
                        src={order.productImage || "/placeholder.svg"}
                        alt={order.productTitle}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-base leading-tight">
                        {order.productTitle}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {order.items} item{order.items !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">
                        Total Amount
                      </span>
                      <div className="font-semibold text-lg">
                        ${order.total.toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Status</span>
                      <div className="font-semibold text-lg capitalize">
                        {order.status}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Order Date</span>
                      <div className="font-semibold text-lg">{order.date}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
