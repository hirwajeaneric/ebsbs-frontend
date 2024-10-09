import { getBloodBagDetails } from "@/api/bloodBag";
import AddBloodBagForm, { BloodBagTypes } from "@/components/forms/ManageBloodBagForm";
import { Button } from "@/components/ui/button";
import LoadingSkeleton from "@/components/widgets/LoadingSkeleton";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function UpdateBloodbag() {
    const navigate = useNavigate();
    const [bag, setBag] = useState<BloodBagTypes>();
    const [isLoading, setIsLoading] = useState(false);
    const params = useParams();

    useEffect(() => {
        setIsLoading(true);
        if (params.bagId as string) {
            getBloodBagDetails(params.bagId as string)
                .then((res) => {
                    if (res) {
                        setIsLoading(false);
                        setBag(res.bloodBag);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setIsLoading(false);
                })
        }
    }, [params.bagId])

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
                            <Link to={`/dashboard/${params.userType}/bags`}>Bags</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Details</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <h1 className="text-lg font-semibold md:text-2xl">Update Blood Bag - <span className="text-slate-500">{bag?.code}</span></h1>
                <div className="flex justify-between w-full md:w-fit gap-12 items-center">
                    {bag?.id && <>
                        {/* <DeleteDialog user={user} /> */}
                    </>}
                    <Button type="button" variant={'link'} onClick={() => navigate(-1)}>Go Back</Button>
                </div>
            </div>
            <div className="flex flex-1 p-4 border rounded-lg shadow-sm">
                <AddBloodBagForm bag={bag} />
            </div>
        </>
    )
}
