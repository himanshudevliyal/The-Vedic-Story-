"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Package, LogOut, Home, Menu, X } from "lucide-react";
import { handleLogout } from "@/providers/auth-provider";

export function UserSidebar({ user, activeSection, onSectionChange }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}

      <div className="relative">
        <div className="lg:hidden    absolute  top-0 right-0   z-99">
          {!isOpen && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsOpen(true)}
              className="bg-white shadow-md"
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          )}
        </div>

        <div
          className={`fixed lg:static top-0 left-0 z-40 h-full   bg-sidebar border-r border-sidebar-border flex flex-col w-full lg:64 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
        >
          {/* User Info */}
          <div className="p-6 border-b border-sidebar-border mt-20 lg:mt-0 flex justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 shadow-md ring-2 ring-green-200">
                <AvatarFallback className="bg-green-100 text-primary/90 text-xl">
                  {user?.firstName ? user?.fullname[0].toUpperCase() : "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-sidebar-foreground truncate">
                  {user?.fullname}
                </h2>
                <p className="text-sm text-muted-foreground truncate">
                  {user?.email}
                </p>
              </div>
            </div>
            <div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="bg-white shadow-md lg:hidden"
              >
                {isOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Nav Links */}
          <div className="flex-1 p-4">
            <nav className="space-y-2">
              <Button
                variant={activeSection === "profile" ? "default" : "ghost"}
                className="w-full justify-start gap-3"
                onClick={() => {
                  onSectionChange("profile");
                  setIsOpen(false);
                }}
              >
                <User className="h-4 w-4" />
                Profile
              </Button>
              <Button
                variant={activeSection === "orders" ? "default" : "ghost"}
                className="w-full justify-start gap-3"
                onClick={() => {
                  onSectionChange("orders");
                  setIsOpen(false);
                }}
              >
                <Package className="h-4 w-4" />
                Orders
              </Button>
              <Button
                variant={activeSection === "address" ? "default" : "ghost"}
                className="w-full justify-start gap-3"
                onClick={() => {
                  onSectionChange("address");
                  setIsOpen(false);
                }}
              >
                <Package className="h-4 w-4" />
                Save Address
              </Button>
            </nav>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-sidebar-border">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>

        {isOpen && (
          <div
            className="fixed inset-0 bg-black/40 lg:hidden z-30"
            onClick={() => setIsOpen(false)}
          ></div>
        )}
      </div>
    </>
  );
}
