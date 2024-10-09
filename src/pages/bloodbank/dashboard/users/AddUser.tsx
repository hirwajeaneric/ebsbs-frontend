import { Button } from "@/components/ui/button";
import ManageUserForm from "@/components/forms/ManageUserForm";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function AddUser() {
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
              <Link to={`/dashboard/${params.userType}/users`}>Lab Technicians</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Add New</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Add New Lab Technician</h1>
        <Button type="button" variant={'link'} onClick={() => navigate(-1)}>Go Back</Button>
      </div>
      <div
        className="flex flex-1 p-4 border rounded-lg shadow-sm"
      >
        <ManageUserForm />
      </div>
    </>
  )
}
