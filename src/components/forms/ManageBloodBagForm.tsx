import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import LoadingButton from "../widgets/LoadingButton"
import { toast } from "sonner"
import { addBloodBag, updateBloodBag } from "@/api/bloodBag"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Separator } from "../ui/separator"

const FormSchema = z.object({
  id: z.string().optional(),
  bloodType: z.enum(["Plasma", "Platelet", "Whole Blood", "Red Blood Cells"]),
  bloodGroup: z.enum(["A", "B", "AB", "O"]),
  rhesis: z.enum(["P", "N"]),
  amountInLitres: z.preprocess((val) => {
    if (typeof val === "string") {
      return parseFloat(val); // Convert string to number
    }
    return val;
  }, z.number().default(0.35)),
  bloodBankId: z.string(),
  code: z.string().optional(),
  bloodQuality: z.enum(["Good", "Moderate", "Expired"]),
});

export type BloodBagTypes = z.infer<typeof FormSchema>;

export default function ManageBloodBagForm({ bag }: { bag?: BloodBagTypes }) {
  const [isLoading, setIsLoading] = useState(false);
  const bloodBankId = JSON.parse(localStorage.getItem("bloodbankRecorder") as string).bloodBankId;
  const navigate = useNavigate();

  const form = useForm<BloodBagTypes>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: bag?.id || "",
      bloodBankId: bloodBankId,
      amountInLitres: bag?.amountInLitres || 0.35,
      bloodGroup: bag?.bloodGroup || undefined,
      bloodQuality: bag?.bloodQuality || undefined,
      bloodType: bag?.bloodType || undefined,
      rhesis: bag?.rhesis || undefined,
    },
  })

  function onSubmit(data: BloodBagTypes) {
    setIsLoading(true);
    if (bag?.id) {
      updateBloodBag(bag.id, data)
        .then((response) => {
          toast.success(response.message);
          setIsLoading(false);
          navigate(`/dashboard/r/bags`)
        })
        .catch((error) => {
          setIsLoading(false);
          toast.error(error.message);
          console.log(error);
        })
    } else {
      addBloodBag(data)
        .then((response) => {
          form.reset();
          toast.success(response.message);
          setIsLoading(false);
          navigate(`/dashboard/r/bags`)
        })
        .catch((error) => {
          setIsLoading(false);
          toast.error(error.message);
          console.log(error);
        })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 md:space-y-0">
          <FormField
            control={form.control}
            name="bloodType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Choose blood type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Plasma" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Plasma
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Platelet" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Platelet
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Whole Blood" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Whole Blood
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Red Blood Cells" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Red Blood Cells
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amountInLitres"
            render={({ field }) => (
              <FormItem className="w-full md:w-[49%]">
                <FormLabel>Amount (litres)</FormLabel>
                <FormControl>
                  <Input placeholder="Provide the blood quantity in litres" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:space-y-0 items-start justify-between">
          <FormField
            control={form.control}
            name="bloodGroup"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Choose blood group</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="A" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        A
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="B" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        B
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="AB" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        AB
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="O" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        O
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rhesis"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Choose Rhesis</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="P" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Positive
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="N" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Negative
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bloodQuality"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Choose blood condition</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Good" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Good
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Moderate" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Moderate
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Expired" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Expired
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Separator />
        <div className="flex mt-8 justify-between items-center w-full">
          {isLoading
            ? <LoadingButton label="Submitting..." btnClass={"w-fit"} btnVariant={"default"} />
            : <Button type="submit">{bag?.id ? "Confirm changes" : "Submit"}</Button>
          }
        </div>
      </form>
    </Form>
  )
}
