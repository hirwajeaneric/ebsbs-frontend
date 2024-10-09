import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { Link, useParams } from "react-router-dom";
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
import { resetPassword } from "@/api/authentication";

const FormSchema = z.object({
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export type ResetPasswordTypes = z.infer<typeof FormSchema>;

export default function ResetPassword() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();

  const form = useForm<ResetPasswordTypes>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
    },
  });

  function onSubmit(data: ResetPasswordTypes) {
    setIsLoading(true);
    resetPassword(data, params.token as string)
      .then((response) => {
        form.reset();
        toast.success(response.message);
        setIsLoading(false);
        window.location.replace(`/hauth/signin`)
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      })
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <span className="text-2xl font-bold sm:text-3xl flex items-center gap-2">
          <img src="/vecteezy_round-medical-cross-symbol-on-transparent-background_17177954.png" alt="logo" className="h-8 rounded-full w-auto sm:h-10" />
          <span className="">EBSDS</span>
        </span>
        <span className="text-sm text-red-600">Blood Bank</span>
        <Separator />
        <CardTitle className="text-2xl mt-8">Create a New Password</CardTitle>
        <CardDescription>Enter your new password</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
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
                    <Input type={isPasswordVisible ? "text" : "password"} placeholder="Create password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full justify-end">
              <Link to={"/hauth/signin"} className="text-sm text-right w-fit underline">Go to Login</Link>
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
