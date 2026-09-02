import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Mail,
  MapPin,
  Calendar,
  Phone,
  BadgeUser,
  Loader,
  Loader2,
  BadgePoundSterling,
} from "lucide-react";
import { useAuth } from "@/providers/auth-provider";
import { useMutation } from "@tanstack/react-query";
import auth from "@/services/auth";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneSelect from "@/components/ui/phone-input";
import { isValidPhoneNumber } from "react-phone-number-input";
const userSchema = z
  .object({
    fullname: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.email("Invalid email address"),

    mobile_number: z.string().regex(/^\+?\d{10,13}$/, "Invalid mobile number"),

    gstin: z
      .string()
      .regex(
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
        "Invalid GST number",
      )
      .optional()
      .or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    // Phone validation
    if (!isValidPhoneNumber(data.mobile_number)) {
      ctx.addIssue({
        code: z.custom,
        path: ["mobile_number"],
        message: "Invalid phone number",
      });
    }

    // Password match
    // if (data.password !== data.confirm_password) {
    //   ctx.addIssue({
    //     code: z.custom,
    //     path: ["confirm_password"],
    //     message: "Passwords do not match",
    //   });
    // }
  });
export function ProfileDetails({}) {
  const { user, setUser, isUserLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
    getValues,
    control,
  } = useForm({
    defaultValues: {
      fullname: user.fullname,
      email: user.email,
      mobile_number: user.mobile_number,
      gstin: user.gstin,
    },
    resolver: zodResolver(userSchema),
  });

  const updateMutation = useMutation({
    mutationFn: (data) => auth.updateProfile(user.id, data),
    onSuccess: (data) => {
      toast.success("Profile updated");
      setUser({
        ...user,
        ...getValues(),
      });
    },
    onError: (error) => {},
  });

  const onSubmit = (data) => {
    updateMutation.mutate({ ...data, gstin: data.gstin.toUpperCase() });
  };

  if (isUserLoading) return "Loading...";

  return (
    <div className="space-y-0  lg:space-y-6 section">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold mb-2 text-blue-900">
          Profile Details
        </h2>
        <p className="text-muted-foreground">
          Manage your personal information and account settings.
        </p>
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-full lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <Card className="p-4  border flex pt-10 justify-items-center items-center shadow-sm rounded-xl bg-gradient-to-b from-blue-50 to-white ">
          <div className="flex flex-col items-center justify-center w-auto lg:w-100  text-center">
            <Avatar className="h-24 w-24 mb-4 shadow-md ring-2 ring-blue-200">
              {user.avatar ? (
                <AvatarImage src={user.avatar} alt={user.fullname} />
              ) : (
                <AvatarFallback className="bg-blue-100 text-blue-700 text-xl">
                  {user.firstName ? user.fullname[0].toUpperCase() : "U"}
                </AvatarFallback>
              )}
            </Avatar>

            <CardTitle className="text-blue-900 text-xl">
              {user.fullname}
            </CardTitle>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </Card>

        {/* Details */}
        <div className="lg:col-span-2 border shadow-sm rounded-xl bg-white">
          <CardContent className="space-y-6 py-8 px-6">
            <CardTitle className="text-blue-900">
              Personal & Account Details
            </CardTitle>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-sm text-muted-foreground">
                  Full Name
                </label>
                <input
                  type="text"
                  {...register("fullname")}
                  className="w-full rounded-lg border px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.fullname && (
                  <p className="text-sm text-red-500">
                    {errors.fullname.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-sm text-muted-foreground flex items-center gap-1">
                  <Mail className="h-4 w-4" /> Email Address
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full rounded-lg border px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label className="text-sm text-muted-foreground flex items-center gap-1">
                  <Phone className="h-4 w-4" /> Phone Number
                </label>
                <Controller
                  name="mobile_number"
                  control={control}
                  render={({ field }) => {
                    return (
                      <PhoneSelect
                        onChange={field.onChange}
                        value={field.value}
                      />
                    );
                  }}
                />
                {/* <input
                  type="number"
                  {...register("mobile_number")}
                  className="w-full rounded-lg border px-4 py-2 text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                /> */}
                {errors.mobile_number && (
                  <p className="text-sm text-red-500">
                    {errors.mobile_number.message}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm text-muted-foreground flex items-center gap-1">
                  <BadgePoundSterling className="h-4 w-4" /> GST Number
                </label>

                <input
                  type="text"
                  {...register("gstin")}
                  className="w-full rounded-lg border px-4 py-2"
                />

                {errors.gstin && (
                  <p className="text-sm text-red-500">{errors.gstin.message}</p>
                )}
              </div>
              <div className="col-span-full">
                <Button disabled={!isDirty || updateMutation.isPending}>
                  {updateMutation.isPending && (
                    <Loader2 className="animate-spin" />
                  )}
                  Submit
                </Button>
              </div>
            </form>
          </CardContent>
        </div>
      </div>
    </div>
  );
}
