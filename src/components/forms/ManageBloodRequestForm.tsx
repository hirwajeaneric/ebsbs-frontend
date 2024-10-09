import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import LoadingButton from "../widgets/LoadingButton"
import { toast } from "sonner"
import { Separator } from "../ui/separator"
import { addRequest, updateRequest } from "@/api/request"
import { HospitalDataTypes } from "./HospitalSettingsForm"
import { BloodBankDataTypes } from "./SettingsForm"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

export const RequestFormSchema = z.object({
  id: z.string().optional(),
  hospitalId: z.string(),
  hospitalName: z.string().optional(),
  hospital: z.object({ id: z.string(), name: z.string() }).optional(),
  recipientName: z.string().optional(),
  bloodBank: z.object({ id: z.string(), name: z.string() }).optional(),
  otherHospital: z.object({ id: z.string(), name: z.string() }).optional(),
  idOfOtherHospital: z.string().optional(),
  recipientType: z.enum(["Hospital", "Blood Bank"]).optional(),
  status: z.string().default('Pending'),
  rhP_O: z.string().default("0"),
  rhP_A: z.string().default("0"),
  rhP_B: z.string().default("0"),
  rhP_AB: z.string().default("0"),
  rhN_O: z.string().default("0"),
  rhN_A: z.string().default("0"),
  rhN_B: z.string().default("0"),
  rhN_AB: z.string().default("0"),
  plasmaRhP_O: z.string().default("0"),
  plasmaRhP_A: z.string().default("0"),
  plasmaRhP_B: z.string().default("0"),
  plasmaRhP_AB: z.string().default("0"),
  plasmaRhN_O: z.string().default("0"),
  plasmaRhN_A: z.string().default("0"),
  plasmaRhN_B: z.string().default("0"),
  plasmaRhN_AB: z.string().default("0"),
  plateletRhP_O: z.string().default("0"),
  plateletRhP_A: z.string().default("0"),
  plateletRhP_B: z.string().default("0"),
  plateletRhP_AB: z.string().default("0"),
  plateletRhN_O: z.string().default("0"),
  plateletRhN_A: z.string().default("0"),
  plateletRhN_B: z.string().default("0"),
  plateletRhN_AB: z.string().default("0"),
  rbcP_O: z.string().default("0"),
  rbcP_A: z.string().default("0"),
  rbcP_B: z.string().default("0"),
  rbcP_AB: z.string().default("0"),
  rbcN_O: z.string().default("0"),
  rbcN_A: z.string().default("0"),
  rbcN_B: z.string().default("0"),
  rbcN_AB: z.string().default("0"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  bloodBankId: z.string().optional(),
});

export type RequestTypes = z.infer<typeof RequestFormSchema>;

type Props = {
  request?: RequestTypes,
  hospitals: HospitalDataTypes[],
  bloodBanks: BloodBankDataTypes[],
}

export default function ManageBloodRequestForm({ request, hospitals, bloodBanks }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const hospitalId = JSON.parse(localStorage.getItem("hospitalWorker") as string).hospitalId;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const form = useForm<RequestTypes>({
    resolver: zodResolver(RequestFormSchema),
    defaultValues: {
      id: request?.id || "",
      hospitalId: request?.hospitalId || hospitalId,
      bloodBankId: request?.bloodBankId !== null && request?.bloodBankId || searchParams.get("bloodBank") || undefined,
      idOfOtherHospital: request?.idOfOtherHospital !== null && request?.idOfOtherHospital || searchParams.get("hospital") || undefined,
      status: request?.status.toString() || 'Pending',
      rhP_O: request?.rhP_O.toString() || "0",
      rhP_A: request?.rhP_A.toString() || "0",
      rhP_B: request?.rhP_B.toString() || "0",
      rhP_AB: request?.rhP_AB.toString() || "0",
      rhN_O: request?.rhN_O.toString() || "0",
      rhN_A: request?.rhN_A.toString() || "0",
      rhN_B: request?.rhN_B.toString() || "0",
      rhN_AB: request?.rhN_AB.toString() || "0",
      plasmaRhP_O: request?.plasmaRhP_O.toString() || "0",
      plasmaRhP_A: request?.plasmaRhP_A.toString() || "0",
      plasmaRhP_B: request?.plasmaRhP_B.toString() || "0",
      plasmaRhP_AB: request?.plasmaRhP_AB.toString() || "0",
      plasmaRhN_O: request?.plasmaRhN_O.toString() || "0",
      plasmaRhN_A: request?.plasmaRhN_A.toString() || "0",
      plasmaRhN_B: request?.plasmaRhN_B.toString() || "0",
      plasmaRhN_AB: request?.plasmaRhN_AB.toString() || "0",
      plateletRhP_O: request?.plateletRhP_O.toString() || "0",
      plateletRhP_A: request?.plateletRhP_A.toString() || "0",
      plateletRhP_B: request?.plateletRhP_B.toString() || "0",
      plateletRhP_AB: request?.plateletRhP_AB.toString() || "0",
      plateletRhN_O: request?.plateletRhN_O.toString() || "0",
      plateletRhN_A: request?.plateletRhN_A.toString() || "0",
      plateletRhN_B: request?.plateletRhN_B.toString() || "0",
      plateletRhN_AB: request?.plateletRhN_AB.toString() || "0",
      rbcP_O: request?.rbcP_O.toString() || "0",
      rbcP_A: request?.rbcP_A.toString() || "0",
      rbcP_B: request?.rbcP_B.toString() || "0",
      rbcP_AB: request?.rbcP_AB.toString() || "0",
      rbcN_O: request?.rbcN_O.toString() || "0",
      rbcN_A: request?.rbcN_A.toString() || "0",
      rbcN_B: request?.rbcN_B.toString() || "0",
      rbcN_AB: request?.rbcN_AB.toString() || "0",
    },
  })

  function onSubmit(data: RequestTypes) {
    setIsLoading(true);
    if (request?.id) {
      updateRequest(request.id, data)
        .then((response) => {
          toast.success(response.message);
          setIsLoading(false);
          navigate(`/hdash/${hospitalId}/r/requests/sent`)
        })
        .catch((error) => {
          setIsLoading(false);
          toast.error(error.message);
          console.log(error);
        })
    } else {
      if (data.bloodBankId === undefined && data.idOfOtherHospital === undefined) {
        toast.error("Please select a blood bank or hospital to send a request");
        setIsLoading(false);
        return;
      }

      addRequest(data)
        .then((response) => {
          form.reset();
          toast.success(response.message);
          setIsLoading(false);
          navigate(`/hdash/${hospitalId}/r/requests/sent`)
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
        <span>Choose Request Recipient</span>
        <Tabs defaultValue={searchParams.get("hospital") ? "otherHospital" : "bloodBank"} className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="bloodBank">Blood Bank</TabsTrigger>
            <TabsTrigger value="otherHospital">Other Hospital</TabsTrigger>
          </TabsList>
          <TabsContent value="bloodBank">
            <FormField
              control={form.control}
              name="bloodBankId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a blood bank" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {bloodBanks.map((bloodBank) => (
                        <SelectItem key={bloodBank.id} value={bloodBank.id}>{bloodBank.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
          <TabsContent value="otherHospital">
            <FormField
              control={form.control}
              name="idOfOtherHospital"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a hospital to send the request" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {hospitals.map((hospital) => {
                        if (hospital.id === hospitalId) return null;
                        return (
                          <SelectItem key={hospital.id} value={hospital.id}>{hospital.name}</SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
        </Tabs>
        <Separator />
        <div className="w-full flex flex-col space-y-2">
          <span className="font-bold">Whole Blood</span>
          <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-4 md:space-y-0">
            <FormField
              control={form.control}
              name="rhP_O"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group O +</FormLabel>
                  <FormControl>
                    <Input type="string" disabled={request?.status === "Recieved/In Process"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rhP_A"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group A +</FormLabel>
                  <FormControl>
                    <Input type="string" disabled={request?.status === "Recieved/In Process"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rhP_B"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group B +</FormLabel>
                  <FormControl>
                    <Input type="string" disabled={request?.status === "Recieved/In Process"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rhP_AB"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group AB +</FormLabel>
                  <FormControl>
                    <Input type="string" disabled={request?.status === "Recieved/In Process"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-4 md:space-y-0">
            <FormField
              control={form.control}
              name="rhN_O"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group O -</FormLabel>
                  <FormControl>
                    <Input type="string" disabled={request?.status === "Recieved/In Process"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rhN_A"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group A -</FormLabel>
                  <FormControl>
                    <Input type="string" disabled={request?.status === "Recieved/In Process"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rhN_B"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group B -</FormLabel>
                  <FormControl>
                    <Input type="string" disabled={request?.status === "Recieved/In Process"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rhN_AB"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group AB -</FormLabel>
                  <FormControl>
                    <Input type="string" disabled={request?.status === "Recieved/In Process"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Separator />
        <div className="w-full flex flex-col space-y-2">
          <span className="font-bold">Plasma</span>
          <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-4 md:space-y-0">
            <FormField
              control={form.control}
              name="plasmaRhP_O"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group O +</FormLabel>
                  <FormControl>
                    <Input type="string" disabled={request?.status === "Recieved/In Process"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="plasmaRhP_A"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group A +</FormLabel>
                  <FormControl>
                    <Input type="string" disabled={request?.status === "Recieved/In Process"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="plasmaRhP_B"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group B +</FormLabel>
                  <FormControl>
                    <Input type="string" disabled={request?.status === "Recieved/In Process"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="plasmaRhP_AB"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group AB +</FormLabel>
                  <FormControl>
                    <Input type="string" disabled={request?.status === "Recieved/In Process"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-4 md:space-y-0">
            <FormField
              control={form.control}
              name="plasmaRhN_O"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group O -</FormLabel>
                  <FormControl>
                    <Input type="string" disabled={request?.status === "Recieved/In Process"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="plasmaRhN_A"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group A -</FormLabel>
                  <FormControl>
                    <Input type="string" disabled={request?.status === "Recieved/In Process"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="plasmaRhN_B"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group B -</FormLabel>
                  <FormControl>
                    <Input type="string" disabled={request?.status === "Recieved/In Process"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="plasmaRhN_AB"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group AB -</FormLabel>
                  <FormControl>
                    <Input type="string" disabled={request?.status === "Recieved/In Process"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Separator />
        <div className="w-full flex flex-col space-y-2">
          <span className="font-bold">Platelets</span>
          <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-4 md:space-y-0">
            <FormField
              control={form.control}
              name="plateletRhP_O"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group O +</FormLabel>
                  <FormControl>
                    <Input type="string" disabled={request?.status === "Recieved/In Process"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="plateletRhP_A"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group A +</FormLabel>
                  <FormControl>
                    <Input type="string" disabled={request?.status === "Recieved/In Process"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="plateletRhP_B"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group B +</FormLabel>
                  <FormControl>
                    <Input type="string" disabled={request?.status === "Recieved/In Process"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="plateletRhP_AB"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group AB +</FormLabel>
                  <FormControl>
                    <Input type="string" disabled={request?.status === "Recieved/In Process"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-4 md:space-y-0">
            <FormField
              control={form.control}
              name="plateletRhN_O"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group O -</FormLabel>
                  <FormControl>
                    <Input type="string" disabled={request?.status === "Recieved/In Process"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="plateletRhN_A"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group A -</FormLabel>
                  <FormControl>
                    <Input type="string" disabled={request?.status === "Recieved/In Process"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="plateletRhN_B"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group B -</FormLabel>
                  <FormControl>
                    <Input type="string" disabled={request?.status === "Recieved/In Process"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="plateletRhN_AB"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group AB -</FormLabel>
                  <FormControl>
                    <Input type="string" disabled={request?.status === "Recieved/In Process"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Separator />
        <div className="w-full flex flex-col space-y-2">
          <span className="font-bold">Red Blood Cells</span>
          <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-4 md:space-y-0">
            <FormField
              control={form.control}
              name="rbcP_O"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group O +</FormLabel>
                  <FormControl>
                    <Input type="string" disabled={request?.status === "Recieved/In Process"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rbcP_A"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group A +</FormLabel>
                  <FormControl>
                    <Input type="string" disabled={request?.status === "Recieved/In Process"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rbcP_B"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group B +</FormLabel>
                  <FormControl>
                    <Input type="string" disabled={request?.status === "Recieved/In Process"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rbcP_AB"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group AB +</FormLabel>
                  <FormControl>
                    <Input type="string" disabled={request?.status === "Recieved/In Process"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-4 md:space-y-0">
            <FormField
              control={form.control}
              name="rbcN_O"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group O -</FormLabel>
                  <FormControl>
                    <Input type="string" disabled={request?.status === "Recieved/In Process"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rbcN_A"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group A -</FormLabel>
                  <FormControl>
                    <Input type="string" disabled={request?.status === "Recieved/In Process"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rbcN_B"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group B -</FormLabel>
                  <FormControl>
                    <Input type="string" disabled={request?.status === "Recieved/In Process"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rbcN_AB"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group AB -</FormLabel>
                  <FormControl>
                    <Input type="string" disabled={request?.status === "Recieved/In Process"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Separator />
        <div className="flex mt-8 justify-between items-center w-full">
          {isLoading
            ? <LoadingButton label="Submitting..." btnClass={"w-fit"} btnVariant={"default"} />
            : <Button type="submit">{request?.id ? "Confirm changes" : "Submit"}</Button>
          }
        </div>
      </form>
    </Form>
  )
}
