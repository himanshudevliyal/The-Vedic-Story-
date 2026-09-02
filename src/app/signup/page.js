"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Eye, EyeOff, Heart } from "lucide-react";
import Image from "next/image";
import { ChefHat, ShoppingBag, Gift, ShieldCheck } from "lucide-react";
import SignupForm from "@/components/form/signup-form";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen overflow-hidden justify-evenly bg-white">
      {/* Left - Signup Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-2xl space-y-6">
          <Link href="/" className="flex justify-center items-center">
            <Image src="/logo.png" width={200} height={200} alt="logo" />
          </Link>

          <Card className="shadow-0 bg-transparent">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-semibold">Sign Up</CardTitle>
              <CardDescription>
                Create your account to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SignupForm callback={() => router.push("/")}></SignupForm>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Side - Educational Content */}
      <div className="hidden flex-1 bg-gradient-to-r from-[#8A5A24] to-[#B88945] education-pattern lg:flex items-center justify-center p-8 text-white">
        <div className="max-w-lg space-y-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full backdrop-blur-sm">
              <ChefHat className="w-8 h-8" />
            </div>

            <h2 className="text-3xl font-bold text-balance">
              Pure Nourishment as Nature Intended
            </h2>

            <p className="text-amber-100 text-lg text-balance">
              The Vedic Story brings you traditionally handcrafted A2 Gir Cow
              Bilona Ghee, made in small batches with the timeless Vedic process
              and the sacred principles of Ahimsa.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <ShoppingBag className="w-5 h-5" />
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Traditional Bilona Ghee
                </h3>

                <p className="text-amber-100">
                  Made from whole A2 Gir Cow curd and traditionally churned
                  using a wooden Bilona for its rich aroma and naturally
                  granular texture.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Heart className="w-5 h-5" />
              </div>

              <div>
                <h3 className="font-semibold text-lg">Ahimsa & Cow Care</h3>

                <p className="text-amber-100">
                  Calves come first. Our approach is rooted in compassion,
                  responsible cow care, and respect for the natural life of
                  every cow.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <ShieldCheck className="w-5 h-5" />
              </div>

              <div>
                <h3 className="font-semibold text-lg">Purity You Can Verify</h3>

                <p className="text-amber-100">
                  Crafted in small batches and supported by laboratory testing,
                  with batch reports available for complete transparency and
                  trust.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
