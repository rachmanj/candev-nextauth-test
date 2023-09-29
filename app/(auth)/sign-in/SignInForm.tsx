"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { signIn } from "next-auth/react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  username: z.string().min(1, "username is required").max(20),
  password: z.string().min(1, "password is required").max(50),
});

const SignInForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const signInData = await signIn("credentials", {
      username: values.username,
      password: values.password,
      redirect: false,
    });
    console.log("SignInData: ", signInData);

    if (signInData?.error) {
      toast({
        variant: "destructive",
        description: "Credentials might be invalid",
      });
    } else {
      router.refresh();
      router.push("/");
    }
  };

  return (
    <Form {...form}>
      <h1 className="text-3xl font-bold text-center">Sign In</h1>
      <div className="w-full h-px bg-gray-300 my-4" />
      <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <FormField
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Your Username"
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Your password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" size="sm" className="w-full mt-6">
          Sign In
        </Button>
      </form>
      <p className="text-center text-sm text-gray-600 mt-2">
        Don&apos;t have an account, please&nbsp;
        <Link href="/sign-up" className="text-blue-500 hover:underline">
          Sign Up
        </Link>
      </p>
    </Form>
  );
};

export default SignInForm;
