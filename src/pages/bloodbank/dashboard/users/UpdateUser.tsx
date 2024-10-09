import { getBloodBankRecorderById } from "@/api/authentication";
import { Button } from "@/components/ui/button";
import ManageUserForm, { UserDataTypes } from "@/components/forms/ManageUserForm";
import LoadingSkeleton from "@/components/widgets/LoadingSkeleton";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DeleteDialog from "@/components/widgets/DeleteDialog";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

export default function AddUser() {
  const params = useParams();
  const [user, setUser] = useState<UserDataTypes>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (params.userId as string) {
      getBloodBankRecorderById(params.userId as string)
        .then((res) => {
          if (res) {
            setIsLoading(false);
            setUser(res);
          }
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        })
    }
  }, [params.userId]);

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
              <Link to={`/dashboard/${params.userType}/users`}>Users</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Details</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-lg font-semibold md:text-2xl">User Info</h1>
        <div className="flex justify-between w-full md:w-fit gap-12 items-center">
          {user?.id && <>
            <DeleteDialog user={user} />
          </>}
          <Button type="button" variant={'link'}>
            <Link to="/dashboard/a/users">Go Back</Link>
          </Button>
        </div>
      </div>
      <div className="flex flex-1 p-4 border rounded-lg shadow-sm">
        <ManageUserForm user={user} />
      </div>
    </>
  )
}
