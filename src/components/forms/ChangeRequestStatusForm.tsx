import { updateRequest } from "@/api/request";
import { RequestFormSchema, RequestTypes } from "./ManageBloodRequestForm";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner";
import { useState } from "react";
import LoadingButton from "../widgets/LoadingButton";
import { Button } from "../ui/button";

type Props = {
    request: RequestTypes;
    setRequest: (request: RequestTypes) => void;
};

export default function ChangeRequestStatusForm({ request, setRequest }: Props) {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<RequestTypes>({
        resolver: zodResolver(RequestFormSchema),
        defaultValues: {
            id: request?.id || "",
            hospitalId: request?.hospitalId || "",
            bloodBankId: request?.bloodBankId !== null ? request?.bloodBankId : "",
            idOfOtherHospital: request?.idOfOtherHospital !== null ? request?.idOfOtherHospital : "",
            status: request?.status || 'Pending',
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
        }
    })

    function onSubmit(data: RequestTypes) {
        setIsLoading(true);
        updateRequest(request.id as string, data)
            .then((response) => {
                setRequest(response.updatedRequest);
                toast.success(response.message);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                toast.error(error.message);
                setIsLoading(false);
            });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-fit space-y-6">
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Change Request Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Pending">Pending</SelectItem>
                                    <SelectItem value="Recieved/In Process">Received/In Process</SelectItem>
                                    <SelectItem value="Delivered">Delivered</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                Change the request status to facilitate communication.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {isLoading
                    ? <LoadingButton label="Submitting..." btnClass={"w-fit"} btnVariant={"default"} />
                    : <Button type="submit">{request?.id ? "Confirm changes" : "Submit"}</Button>
                }
            </form>
        </Form>
    )
}
