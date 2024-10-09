import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Separator } from "../ui/separator"
import { useState } from "react"
import { SignUpForHospital } from "@/api/authentication";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../widgets/LoadingButton"

const FormSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be provided." }),
  lastName: z.string().min(2, { message: "Last name must be provided." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
});

export type HospitalApplicantSignUpTypes = z.infer<typeof FormSchema>;

export default function CreateHospitalAdminAccountForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const form = useForm<HospitalApplicantSignUpTypes>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
    },
  });

  function onSubmit(data: HospitalApplicantSignUpTypes) {
    setIsLoading(true);
    SignUpForHospital(data)
    .then((response) => {
      form.reset();
      toast.success(response.message);
      setIsLoading(false);
      navigate(`/apply/${response.userId}`)
    })
    .catch ((error) => {
      setIsLoading(false);
      toast.error(error.message);
    })
  }

  return (
    <div className="w-full flex flex-col justify-start space-y-4">
      <h1 className="text-2xl font-bold">Apply For Hospital</h1>
      <div className="flex justify-between w-full items-center">
        <h2 className="text-lg font-bold">Create Account</h2>
        <span>Step 1</span>
      </div>
      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
          <div className="w-full flex flex-wrap space-y-4 items-start md:space-y-0 justify-between">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full md:w-[49%]">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your first name" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-full md:w-[49%]">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your last name" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input placeholder="Your email address" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex flex-wrap space-y-4 md:space-y-0 items-start justify-between">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="w-full md:w-[49%]">
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input placeholder="Your phone number" type="tel" maxLength={10} minLength={10} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full md:w-[49%]">
                  <FormLabel className="flex justify-between items-center">
                    <span>Password</span>
                    <span className="text-sm text-gray-800 dark:text-foreground" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
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
          </div>
          {isLoading 
            ? <LoadingButton label="Submitting..." btnClass={"w-fit"} btnVariant={"default"} /> 
            : <Button type="submit">Submit</Button>
          }
        </form>
      </Form>
    </div>
  )
}
