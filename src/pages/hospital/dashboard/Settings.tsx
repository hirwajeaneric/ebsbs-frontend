import { getHospitalById } from "@/api/hospital";
import LoadingSkeleton from "@/components/widgets/LoadingSkeleton";
import { useEffect, useState } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link, useParams } from "react-router-dom";
import HospitalSettingsForm, { HospitalDataTypes } from "@/components/forms/HospitalSettingsForm";

export default function Settings() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const hospitalId = JSON.parse(localStorage.getItem("hospitalAdmin") as string).hospitalId;
  const [hospital, setHospital] = useState<HospitalDataTypes>();

  useEffect(() => {
    setIsLoading(true);
    getHospitalById(hospitalId)
      .then(response => {
        setHospital(response.hospital);
        setIsLoading(false);
      })
  }, [hospitalId])

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
          {!isLoading && <HospitalSettingsForm hospital={hospital} />}
        </div>
      </div>
    </>
  )
}
