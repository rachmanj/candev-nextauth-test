"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import * as z from "zod";
import axios from "axios";

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

const formSchema = z
  .object({
    username: z.string().min(1, "username is required").max(100),
    email: z
      .string()
      .email("invalid email")
      .min(1, "email is required")
      .max(50),
    password: z.string().min(1, "password is required").max(50),
    passwordConfirmation: z.string().min(1, "password is required").max(50),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "passwords do not match",
    path: ["passwordConfirmation"],
  });

const SignUpForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/users", values);
      toast({ variant: "success", description: "Sign up successful" });
      router.push("/sign-in");
    } catch (error) {
      toast({ variant: "destructive", description: "something went wrong" });
    }
  };

  return (
    <Form {...form}>
      <h1 className="text-3xl font-bold text-center">Sign Up</h1>
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="dalmi@example.com"
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
          <FormField
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Re-type Password</FormLabel>
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
          Sign Up
        </Button>
      </form>
      <p className="text-center text-sm text-gray-600 mt-2">
        Already have an account, please&nbsp;
        <Link href="/sign-in" className="text-blue-500 hover:underline">
          Sign In
        </Link>
      </p>
    </Form>
  );
};

export default SignUpForm;
