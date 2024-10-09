import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import ManageHospitalUserForm from "@/components/forms/ManageHospitalUserForm";

export default function AddUser() {
  const navigate = useNavigate();
  const hospitalId = JSON.parse(localStorage.getItem("hospitalAdmin") as string).hospitalId;

  return (
    <>
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/hdash/${hospitalId}/a/`}>Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/hdash/${hospitalId}/a/users`}>Pharmacists</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Add New</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Add New Pharmacist</h1>
        <Button type="button" variant={'link'} onClick={() => navigate(-1)}>Go Back</Button>
      </div>
      <div className="flex flex-1 p-4 border rounded-lg shadow-sm">
        <ManageHospitalUserForm />
      </div>
    </>
  )
}
