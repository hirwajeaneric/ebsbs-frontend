import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import LoadingButton from "@/components/widgets/LoadingButton";
import { Separator } from "@/components/ui/separator";
import { forgotPassword } from "@/api/authentication";

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

export type ForgotPasswordTypes = z.infer<typeof FormSchema>;

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ForgotPasswordTypes>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: ForgotPasswordTypes) {
    setIsLoading(true);
    forgotPassword(data)
      .then((response) => {
        form.reset();
        toast.success(response.message);
        window.location.replace(`/bauth/signin`)
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
        <CardTitle className="text-2xl mt-8">Forgot Password?</CardTitle>
        <CardDescription>
          Enter your email to recieve a password reset link.
        </CardDescription>
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
            <div className="flex w-full justify-end">
              <Link to={"/bauth/signin"} className="text-sm text-right w-fit underline">Go back to Sign In</Link>
            </div>

            {isLoading
              ? <LoadingButton label="Submitting..." btnClass={"w-full"} btnVariant={"default"} />
              : <Button className="w-full" type="submit">Submit</Button>
            }
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
