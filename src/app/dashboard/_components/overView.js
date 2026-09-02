import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Package, DollarSign } from "lucide-react";

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Dashboard Overview
        </h2>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s what&apos;s happening with your account.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-green-200 bg-primary/20/50 py-5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary/90">
              Total Orders
            </CardTitle>
            <Package className="h-10 w-10 text-primary/80" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">24</div>
            <p className="text-xs text-primary/80">+2 from last month</p>
          </CardContent>
        </Card>

        <Card className="border-cyan-200 bg-cyan-50/50 py-5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-cyan-700">
              Total Spent
            </CardTitle>
            <DollarSign className="h-10 w-10 text-cyan-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cyan-900">$1,234</div>
            <p className="text-xs text-cyan-600">+15% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-indigo-200 bg-indigo-50/50 py-5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-indigo-700">
              Account Status
            </CardTitle>
            <Users className="h-10 w-10 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-900">Premium</div>
            <p className="text-xs text-indigo-600">Active since 2023</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-primary/20/50 py-5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary/90">
              Growth
            </CardTitle>
            <TrendingUp className="h-10 w-10 text-primary/80" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">+12%</div>
            <p className="text-xs text-primary/80">+4% from last month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
