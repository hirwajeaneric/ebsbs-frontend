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
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import LoadingButton from "../widgets/LoadingButton"
import { ApplyForHospital } from "@/api/hospital"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

const FormSchema = z.object({
  name: z.string().min(2, { message: "Hospital name must be provided." }),
  googleLocation: z.string().min(2, { message: "Google location must be provided." }),
  province: z.string().min(2, { message: "Province must be provided." }),
  town: z.string().min(2, { message: "Town must be provided." }),
  specialization: z.string().min(2, { message: "Specialization must be provided." }),
  hospitalType: z.string().min(2, { message: "Hospital type must be provided." }),
  hospitalAdminId: z.string().min(1, { message: "Hospital admin ID must be provided." }),
});

export type HospitalApplicantionTypes = z.infer<typeof FormSchema>;

export default function ApplyForHospitalForm() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const form = useForm<HospitalApplicantionTypes>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      googleLocation: "",
      province: "",
      town: "",
      specialization: "",
      hospitalType: "",
      hospitalAdminId: params.applicantId
    },
  });

  function onSubmit(data: HospitalApplicantionTypes) {
    setIsLoading(true);
    ApplyForHospital(data)
      .then((response) => {
        form.reset();
        toast.success(response.message);
        setIsLoading(false);
        navigate(`/`)
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
        toast.error(error.message);
      })
  }

  return (
    <div className="w-full flex flex-col justify-start space-y-4">
      <h1 className="text-2xl font-bold">Apply For Hospital</h1>
      <div className="flex justify-between w-full items-center">
        <h2 className="text-lg font-bold">Submit Hospital Information</h2>
        <span>Step 2</span>
      </div>
      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name of hospital" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex flex-wrap space-y-4 items-start md:space-y-0 justify-between">
            <FormField
              control={form.control}
              name="googleLocation"
              render={({ field }) => (
                <FormItem className="w-full md:w-[32%]">
                  <FormLabel>Google Maps Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Google Maps Location" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem className="w-full md:w-[32%]">
                  <FormLabel>Province</FormLabel>
                  <FormControl>
                    <Input placeholder="Province" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="town"
              render={({ field }) => (
                <FormItem className="w-full md:w-[32%]">
                  <FormLabel>Town</FormLabel>
                  <FormControl>
                    <Input placeholder="Town" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex flex-wrap space-y-4 md:space-y-0 md:space-x-6 items-start justify-start">
            <FormField
              control={form.control}
              name="hospitalType"
              render={({ field }) => (
                <FormItem className="w-full md:w-[32%]">
                  <FormLabel>Type of hospital</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Private">Private</SelectItem>
                      <SelectItem value="Public">Public</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="specialization"
              render={({ field }) => (
                <FormItem className="w-full md:w-[32%]">
                  <FormLabel>Specialization</FormLabel>
                  <FormControl>
                    <Input placeholder="Specialization" type="text" {...field} />
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
