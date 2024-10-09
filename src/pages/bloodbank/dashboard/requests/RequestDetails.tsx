import { Button } from "@/components/ui/button";
import LoadingSkeleton from "@/components/widgets/LoadingSkeleton";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { RequestTypes } from "@/components/forms/ManageBloodRequestForm";
import { getRequestById } from "@/api/request";
import DeleteRequestDialog from "@/components/widgets/DeleteRequestDialog";
import RequestDataTable from "@/components/tables/RequestDataTable";
import ChangeRequestStatusForm from "@/components/forms/ChangeRequestStatusForm";

export default function RequestDetails() {
    const params = useParams();
    const navigate = useNavigate();
    const [request, setRequest] = useState<RequestTypes>();
    const [isLoading, setIsLoading] = useState(false);

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
                            <Link to={`/dashboard/${params.userType}`}>Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to={`/dashboard/${params.userType}/requests`}>Requests</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Details</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <h1 className="text-lg font-semibold md:text-2xl">Update Request from <span className="text-slate-500">{request?.hospital?.name}</span></h1>
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
                        <ChangeRequestStatusForm request={request} setRequest={setRequest} />
                    </div>
                }
            </div>
        </>
    )
}