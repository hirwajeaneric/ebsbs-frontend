import { getHospitalWorkers } from "@/api/authentication";
import { Button } from "@/components/ui/button";
import LoadingSkeleton from "@/components/widgets/LoadingSkeleton";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { HospitalUsersTable } from "@/components/tables/hospitalEmployeesTable/HospitalUsersTable";
import { HospitalUserDataTypes } from "@/components/forms/ManageHospitalUserForm";

export default function Users() {
  const params = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<HospitalUserDataTypes[]>([]);
  const hospitalId = JSON.parse(localStorage.getItem("hospitalAdmin") as string).hospitalId;

  useEffect(() => {
    setIsLoading(true);
    getHospitalWorkers(hospitalId)
      .then((response) => {
        setIsLoading(false);
        setUsers(response.hospitalWorkers);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      })
  }, [hospitalId]);

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
            <BreadcrumbPage>Pharmacists</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Pharmacists</h1>
        <Button type="button" variant={'default'} onClick={() => navigate(`/hdash/${hospitalId}/a/users/new`)}>Add New Pharmacist</Button>
      </div>
      <div className="flex flex-1 p-4 border rounded-lg shadow-sm">
        {!isLoading && <HospitalUsersTable users={users} />}
        {isLoading && <LoadingSkeleton />}
      </div>
    </>
  )
}
