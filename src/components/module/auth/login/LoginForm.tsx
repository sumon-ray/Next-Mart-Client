"use client";
import Logo from "@/app/assets/svgs/Logo";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { loginSchema } from "./loginValidation";
import { loginUser } from "@/services/AuthService";
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const LoginForm = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const redirect = searchParams.get("redirectPath")
  const form = useForm({ resolver: zodResolver(loginSchema) });
  const {
    formState: { isSubmitting },
  } = form;
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log(data)
    try {
      const res = await loginUser(data);
    //   console.log(res)
      if (res?.success) {
        toast.success(res?.message);
        if (redirect) {
          router.push(redirect)
          
        }else{
          router.push("/profile")
        }
      } else {
        toast.error(res?.message);
      }
    } catch (error: any) {
      console.error(error);
    }
  };
  return (
    <div className="border-2 space-y-10 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
      <div className="flex items-center space-x-4 ">
        <Logo />
        <div>
          <h1 className="text-xl font-semibold">Login</h1>
          <p className="font-extralight text-sm text-gray-600">
            Welcome Back!!
          </p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email </FormLabel>
                <FormControl>
                  {/* Your form field */}
                  <Input type="email" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password </FormLabel>
                <FormControl>
                  {/* Your form field */}
                  <Input type="password" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="flex flex-col mx-auto w-full" type="submit"> {isSubmitting ? <LoaderIcon /> : "Login"}</Button>
          <p className="text-center"> do not have a account? <span className="underline text-blue-600"><Link href="/register"> register</Link></span>  </p>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
