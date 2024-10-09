import LoadingSkeleton from "@/components/widgets/LoadingSkeleton";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { HospitalUserDataTypes } from "@/components/forms/ManageHospitalUserForm";
import HospitalUserAccountForm from "@/components/forms/HospitalUserAccountForm";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<HospitalUserDataTypes>();
  const params = useParams();

  useEffect(() => {
    setIsLoading(true);
    if (params.userType === 'a') {
      setUser(JSON.parse(localStorage.getItem("hospitalAdmin") as string));
    } else if (params.userType === 'r') {
      setUser(JSON.parse(localStorage.getItem("hospitalWorker") as string));
    }
    setIsLoading(false);
  }, [params.userType]);

  return (
    <>
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/hdash/${user?.hospitalId}/${params.userType}`}>Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Profile</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Profile</h1>
      </div>
      <div
        className="flex flex-1 p-4 border rounded-lg shadow-sm"
      >
        {!isLoading && <HospitalUserAccountForm user={user} />}
        {isLoading && <LoadingSkeleton />}
      </div>
    </>
  )
}
