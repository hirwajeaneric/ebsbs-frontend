import { getBloodBankWorkers } from "@/api/authentication";
import { BloodBankUsersTable } from "@/components/tables/bloodBankEmployeesTable/BloodBankUsersTable";
import { Button } from "@/components/ui/button";
import LoadingSkeleton from "@/components/widgets/LoadingSkeleton";
import { UserDataTypes } from "@/components/forms/ManageUserForm";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

export default function Users() {
  const params = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<UserDataTypes[]>([]);
  const bloodBankId = JSON.parse(localStorage.getItem("bloodbankAdmin") as string).bloodBankId;

  useEffect(() => {
    setIsLoading(true);
    getBloodBankWorkers(bloodBankId)
      .then((response) => {
        setIsLoading(false);
        setUsers(response.bloodBankRecorders);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      })
  }, [bloodBankId]);

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
            <BreadcrumbPage>Lab Technicians</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Lab Technicians</h1>
        <Button type="button" variant={'default'} onClick={() => navigate("/dashboard/a/users/new")}>Add New Lab Technician</Button>
      </div>
      <div
        className="flex flex-1 p-4 border rounded-lg shadow-sm"
      >
        {!isLoading && <BloodBankUsersTable users={users} />}
        {isLoading && <LoadingSkeleton />}
      </div>
    </>
  )
}
