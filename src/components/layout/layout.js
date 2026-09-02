"use client";

import CartSidebar from "@/components/ui/cart-sidebar";
import { usePathname } from "next/navigation";
import RoleContext from "@/providers/role-context-provider";
import AuthProvider from "@/providers/auth-provider";
import Navbar from "../navbar";
import Footer from "../footer";

export default function Layout({ children }) {
  const path = usePathname();
  const pathName = ["/login", "/signup"];
  if (pathName.includes(path)) return children;

  return (
    <AuthProvider>
      <RoleContext>
        <Navbar></Navbar>
        {children}
        <CartSidebar></CartSidebar>
        <Footer></Footer>
      </RoleContext>
    </AuthProvider>
  );
}
