import { getInactiveHospitals } from "@/api/hospital";
import { ApplicationsTable } from "@/components/tables/applicationTable/ApplicationsTable";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import LoadingSkeleton from "@/components/widgets/LoadingSkeleton";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export type ApplicationsTypes = {
    name: string;
    province: string;
    town: string;
    id: string;
    hospitalType: "Public" | "Private";
    specialization: string;
    accessStatus: "Active" | "Inactive";
    createdAt: Date
}

export default function Applications() {
    const [isLoading, setIsLoading] = useState(false);
    const [applications, setApplications] = useState<ApplicationsTypes[]>([]);
    const params = useParams();

    useEffect(() => {
        setIsLoading(true);
        getInactiveHospitals()
            .then(response => {
                setIsLoading(false);
                setApplications(response.hospitals);
            })
            .catch(error => {
                console.error(error);
                setIsLoading(false);
            });
    }, []);

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
                        <BreadcrumbPage>Applications</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Hospital Applications</h1>
            </div>
            <div
                className="flex flex-1 p-4 border rounded-lg shadow-sm"
            >
                {!isLoading && <ApplicationsTable applications={applications} />}
                {isLoading && <LoadingSkeleton />}
            </div>
        </>
    )
}
