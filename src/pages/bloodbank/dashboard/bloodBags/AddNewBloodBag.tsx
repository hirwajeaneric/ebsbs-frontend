import AddBloodBagForm from "@/components/forms/ManageBloodBagForm";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function AddNewBloodbag() {
    const navigate = useNavigate();
    const params = useParams();

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
                            <Link to={`/dashboard/${params.userType}/bags`}>Blood Bags</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Add</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Add New Blood Bag</h1>
                <Button type="button" variant={'link'} onClick={() => navigate(-1)}>Go Back</Button>
            </div>
            <div className="flex flex-1 p-4 border rounded-lg shadow-sm">
                <AddBloodBagForm />
            </div>
        </>
    )
}
