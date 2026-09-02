import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CalendarCheck, ShieldCheck } from "lucide-react";

export function ProfileContent({ user, orders }) {
  return (
    <div className="space-y-6 p-4">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-green-900">
          Profile
        </h1>
        <p className="text-muted-foreground">
          Manage your account information and preferences
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Card */}
        <Card className="bg-gradient-to-b from-primary/20 to-white border-none shadow-md">
          <CardHeader className="text-center flex flex-col items-center space-y-2">
            <Avatar className="h-24 w-24 mb-4 shadow-md ring-2 ring-green-200">
              {user.avatar ? (
                <AvatarImage src={user.avatar} alt={user.name} />
              ) : (
                <AvatarFallback className="bg-green-100 text-primary/90 text-xl">
                  {user.firstName ? user.firstName[0].toUpperCase() : "U"}
                </AvatarFallback>
              )}
            </Avatar>
            <CardTitle className="text-xl text-green-900 font-semibold">
              {user?.name || "Unknown User"}
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              {user?.email || "-"}
            </p>
          </CardHeader>

          <CardContent className="space-y-4 px-6 pb-6">
            <Separator />
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <CalendarCheck className="h-4 w-4" />
                  Member since
                </span>
                <span className="text-sm font-medium text-foreground">
                  {user?.joinDate || "January 2024"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <ShieldCheck className="h-4 w-4" />
                  Account Status
                </span>
                <span className="text-sm font-medium text-primary/80">
                  {user?.status || "Active"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-green-900">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-primary/20 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-green-900">
                  {orders?.length || 0}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Orders
                </div>
              </div>
              <div className="text-center p-4 bg-primary/20 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-primary/90">
                  {orders?.filter((o) => o.status === "delivered")?.length || 0}
                </div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
