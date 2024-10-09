import { Button } from "@/components/ui/button";
import LoadingSkeleton from "@/components/widgets/LoadingSkeleton";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { RequestFormSchema, RequestTypes } from "@/components/forms/ManageBloodRequestForm";
import { getRequestById, updateRequest } from "@/api/request";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import DeleteRequestDialog from "@/components/widgets/DeleteRequestDialog";
import RequestDataTable from "@/components/tables/RequestDataTable";
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

export default function RecievedRequestDetails() {
    const params = useParams();
    const navigate = useNavigate();
    const [request, setRequest] = useState<RequestTypes>();
    const [isLoading, setIsLoading] = useState(false);
    const hospitalId = JSON.parse(localStorage.getItem("hospitalWorker") as string).hospitalId;

    const form = useForm<RequestTypes>({
        resolver: zodResolver(RequestFormSchema),
        defaultValues: {
            id: request?.id || "",
            hospitalId: request?.hospitalId || "",
            idOfOtherHospital: request?.idOfOtherHospital || "",
            status: request?.status || 'Pending',
            rhP_O: request?.rhP_O || "0",
            rhP_A: request?.rhP_A || "0",
            rhP_B: request?.rhP_B || "0",
            rhP_AB: request?.rhP_AB || "0",
            rhN_O: request?.rhN_O || "0",
            rhN_A: request?.rhN_A || "0",
            rhN_B: request?.rhN_B || "0",
            rhN_AB: request?.rhN_AB || "0",
            plasmaRhP_O: request?.plasmaRhP_O || "0",
            plasmaRhP_A: request?.plasmaRhP_A || "0",
            plasmaRhP_B: request?.plasmaRhP_B || "0",
            plasmaRhP_AB: request?.plasmaRhP_AB || "0",
            plasmaRhN_O: request?.plasmaRhN_O || "0",
            plasmaRhN_A: request?.plasmaRhN_A || "0",
            plasmaRhN_B: request?.plasmaRhN_B || "0",
            plasmaRhN_AB: request?.plasmaRhN_AB || "0",
            plateletRhP_O: request?.plateletRhP_O || "0",
            plateletRhP_A: request?.plateletRhP_A || "0",
            plateletRhP_B: request?.plateletRhP_B || "0",
            plateletRhP_AB: request?.plateletRhP_AB || "0",
            plateletRhN_O: request?.plateletRhN_O || "0",
            plateletRhN_A: request?.plateletRhN_A || "0",
            plateletRhN_B: request?.plateletRhN_B || "0",
            plateletRhN_AB: request?.plateletRhN_AB || "0",
            rbcP_O: request?.rbcP_O || "0",
            rbcP_A: request?.rbcP_A || "0",
            rbcP_B: request?.rbcP_B || "0",
            rbcP_AB: request?.rbcP_AB || "0",
            rbcN_O: request?.rbcN_O || "0",
            rbcN_A: request?.rbcN_A || "0",
            rbcN_B: request?.rbcN_B || "0",
            rbcN_AB: request?.rbcN_AB || "0",
        }
    })

    function onSubmit(data: RequestTypes) {
        setIsLoading(true);
        updateRequest(params.requestId as string, data)
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

    useEffect(() => {
        setIsLoading(true);
        if (params.requestId as string) {
            getRequestById(params.requestId as string)
                .then((res) => {
                    if (res) {
                        setIsLoading(false);
                        setRequest(res.bloodRequest);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setIsLoading(false);
                })
        }
    }, [params.requestId]);

    if (isLoading) {
        return <LoadingSkeleton />;
    }

    return (
        <>
            <Breadcrumb className="hidden md:flex">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to={`/hdash/${hospitalId}/${params.userType}`}>Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to={`/hdash/${hospitalId}/${params.userType}/requests/incoming`}>Requests</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Details</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <h1 className="text-lg font-semibold md:text-2xl">Request from <span className="text-slate-500">{request?.hospital?.name}</span></h1>
                <div className="flex justify-between w-full md:w-fit gap-12 items-center">
                    {params.requestId && request && (
                        <DeleteRequestDialog request={request} />
                    )}
                    <Button type="button" variant={'link'} onClick={() => navigate(-1)}>Go Back</Button>
                </div>
            </div>
            <div className="flex flex-1 p-4 border rounded-lg shadow-sm">
                {isLoading && <LoadingSkeleton />}
                {(!isLoading && request) &&
                    <div className="w-full flex flex-1 flex-col space-y-6">
                        <RequestDataTable request={request} />
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
                                <Button type="submit">Submit</Button>
                            </form>
                        </Form>
                    </div>
                }
            </div>
        </>
    )
}