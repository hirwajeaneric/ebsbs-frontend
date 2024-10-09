import { getBloodBagsInHospital } from "@/api/bloodBag";
import { BloodBagsTable } from "@/components/tables/bloodBagsTable/BloodBagsTable";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import LoadingSkeleton from "@/components/widgets/LoadingSkeleton";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function BloodBags() {
  const [isLoading, setIsLoading] = useState(false);
  const [bags, setBags] = useState([]);
  const hospitalId = JSON.parse(localStorage.getItem("hospitalWorker") as string).hospitalId;
  
  useEffect(() => {
    setIsLoading(true);
    getBloodBagsInHospital(hospitalId)
      .then((response) => {
        setIsLoading(false);
        setBags(response.bloodBags);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  }, [hospitalId]);

  return (
    <>
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/hdash/${hospitalId}/r`}>Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Blood Bags</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Blood Bags</h1>
      </div>
      <div className="flex flex-1 p-4 border rounded-lg shadow-sm">
        {!isLoading && <BloodBagsTable bloodBags={bags} />}
        {isLoading && <LoadingSkeleton />}
      </div>
    </>
  )
}
