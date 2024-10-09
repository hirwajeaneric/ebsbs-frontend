import { getBloodBankById } from "@/api/bloodBank";
import LoadingSkeleton from "@/components/widgets/LoadingSkeleton";
import SettingsForm, { BloodBankDataTypes } from "@/components/forms/SettingsForm";
import { useEffect, useState } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link, useParams } from "react-router-dom";

export default function Settings() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const bloodBankId = JSON.parse(localStorage.getItem("bloodbankAdmin") as string).bloodBankId;
  const [bloodBank, setBloodBank] = useState<BloodBankDataTypes>();

  useEffect(() => {
    setIsLoading(true);
    getBloodBankById(bloodBankId)
      .then(response => {
        console.log(response);
        setBloodBank(response.bloodBank);
        setIsLoading(false);
      })
  }, [bloodBankId])

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
            <BreadcrumbPage>Settings</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Settings</h1>
      </div>
      <div
        className="flex flex-1 p-4 border rounded-lg shadow-sm"
      >
        <div
          className="flex flex-1"
        >
          {isLoading && <LoadingSkeleton />}
          {!isLoading && <SettingsForm bloodBank={bloodBank} />}
        </div>
      </div>
    </>
  )
}
