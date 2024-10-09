import { listAllHospitals } from "@/api/hospital";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { HospitalsTable } from "@/components/tables/hospitalsTable/HospitalsTable";
import LoadingSkeleton from "@/components/widgets/LoadingSkeleton";
import { HospitalDataTypes } from "@/components/forms/HospitalSettingsForm";

export default function Hospitals() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [hospitals, setHospitals] = useState<HospitalDataTypes[]>([])

  useEffect(() => {
    setIsLoading(true);
    listAllHospitals()
      .then((response) => {
        setHospitals(response.hospitals);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [])

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
            <BreadcrumbPage>Hospitals</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Hospitals</h1>
      </div>
      <div className="flex flex-1 p-4 border rounded-lg shadow-sm">
        {!isLoading && <HospitalsTable hospitals={hospitals} />}
        {isLoading && <LoadingSkeleton />}
      </div>
    </>
  )
}