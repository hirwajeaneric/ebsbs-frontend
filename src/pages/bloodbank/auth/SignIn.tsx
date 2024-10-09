import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Cookies from 'js-cookie';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { BloodBankSignInRequest } from "@/api/authentication";
const environment = import.meta.env.VITE_ENVIRONMENT;
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import LoadingButton from "@/components/widgets/LoadingButton";
import { Separator } from "@/components/ui/separator";

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export type SignInTypes = z.infer<typeof FormSchema>;

export default function SignIn() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const form = useForm<SignInTypes>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: SignInTypes) {
    setIsLoading(true);
    BloodBankSignInRequest(data)
      .then((response) => {
        form.reset();
        toast.success(response.message);
        if (response.user) {
          localStorage.setItem(response.user.role === "Blood Bank Admin" ? "bloodbankAdminToken":"bloodbankRecorderToken" , response.token);
          localStorage.setItem(response.user.role === "Blood Bank Admin" ? "bloodbankAdmin" : "bloodbankRecorder", JSON.stringify(response.user));
          Cookies.set(
            response.user.role === "Blood Bank Admin" ? 'admin-access-token' : 'recorder-access-token',
            response.token,
            {
              secure: environment === "production" ? true : false,
              expires: 1
            });
        }
        const userType = response.user.role === "Blood Bank Admin" ? "a" : "r";
        setIsLoading(false);
        window.location.replace(`/dashboard/${userType}/`)
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      })
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <span className="text-2xl font-bold sm:text-3xl flex items-center flex-col gap-2">
          <img src="https://cpts-nk.org/wp-content/uploads/2024/06/CPTS-NK-logo.png" alt="logo" className="h-20 w-auto" />
          <span className="">C.P.T.S</span>
        </span>
        <span className="text-sm text-red-600">Blood Bank</span>
        <Separator />
        <CardTitle className="text-2xl mt-8">Login</CardTitle>
        <CardDescription>Enter your email and password below to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input placeholder="Your email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="flex justify-between items-center">
                    <span>Password</span>
                    <span className="text-sm" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                      {isPasswordVisible ? "Hide" : "Show"} Password
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input type={isPasswordVisible ? "text" : "password"} placeholder="Your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full justify-end">
              <Link to={"/bauth/forgotpassword"} className="text-sm text-right w-fit underline">Forgot Password?</Link>
            </div>
            {isLoading
              ? <LoadingButton label="Submitting..." btnClass={"w-full"} btnVariant={"default"} />
              : <Button className="w-full" type="submit">Login</Button>
            }
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
