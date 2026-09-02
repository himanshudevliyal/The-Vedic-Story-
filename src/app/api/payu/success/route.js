import { endpoints } from "@/utils/endpoints";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    // console.log({ cookieStore });
    // return;
    let token = cookieStore.get("token")?.value;
    const refresh_token = cookieStore.get("refresh_token")?.value;
    // Token refresh logic
    if (!token && refresh_token) {
      try {
        const refreshResponse = await axios.post(
          `${API_URL}${endpoints.auth.refresh}`,
          { refresh_token },
          { headers: { "Content-Type": "application/json" } },
        );

        const newTokenData = refreshResponse.data;
        if (newTokenData?.token) {
          token = newTokenData.token;

          const maxAge = Math.floor(
            (new Date(newTokenData.expire_time).getTime() - Date.now()) / 1000,
          );

          cookieStore.set("token", token, {
            path: "/",
            maxAge: maxAge,
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
          });
        } else {
          throw new Error("No token in refresh response");
        }
      } catch (refreshError) {
        console.error(
          "Token refresh failed:",
          refreshError?.response?.data || refreshError?.message,
        );
        cookieStore.delete("token");
        cookieStore.delete("refresh_token");
        return NextResponse.json(
          { message: "Refresh token expired, please login again" },
          { status: 401 },
        );
      }
    }

    if (!token) {
      return NextResponse.json(
        { message: "No user logged in" },
        { status: 401 },
      );
    }

    // Parse URL-encoded payment data
    const body = await request.text();
    const params = new URLSearchParams(body);

    const data = {};
    for (const [key, value] of params) {
      data[key] = value;
    }

    try {
      // OPTION 1: If your backend expects GET with query params
      const res = await axios.post(`${API_URL}/payments/success`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      return NextResponse.json(
        {
          success: true,
          message: "Payment verified successfully",
          data: res.data,
        },
        { status: 200 },
      );
    } catch (paymentError) {
      console.error(
        "Payment verification error:",
        paymentError?.response?.data,
      );

      if (paymentError?.response?.status === 401) {
        cookieStore.delete("token");
        cookieStore.delete("refresh_token");
      }

      return NextResponse.json(
        {
          success: false,
          message:
            paymentError?.response?.data?.message ?? "Failed to verify payment",
        },
        { status: paymentError?.response?.status || 500 },
      );
    }
  } catch (error) {
    console.error("Payment callback error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
