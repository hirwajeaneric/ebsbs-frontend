import { getRequestsForBloodBank } from "@/api/request";
import { RequestTypes } from "@/components/forms/ManageBloodRequestForm";
import { BloodBankRequestsTable } from "@/components/tables/bloodBankRequestsTable/BloodBankRequestsTable";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import LoadingSkeleton from "@/components/widgets/LoadingSkeleton";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function Requests() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [requests, setRequests] = useState<RequestTypes[]>([]);
  let bloodbankId = "";

  if (params.userType === "a") {
    bloodbankId = JSON.parse(localStorage.getItem("bloodbankAdmin") as string).bloodBankId;
  } else if (params.userType === "r") {
    bloodbankId = JSON.parse(localStorage.getItem("bloodbankRecorder") as string).bloodBankId;
  }

  useEffect(() => {
    setIsLoading(true);
    getRequestsForBloodBank(bloodbankId)
      .then((response) => {
        response.bloodRequests.map((bloodRequest: RequestTypes) => {
          bloodRequest.hospitalName = bloodRequest.hospital?.name
        })
        setRequests(response.bloodRequests);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [bloodbankId, params]);

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
            <BreadcrumbPage>Requests</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Requests</h1>
      </div>
      <div className="flex flex-1 p-4 border rounded-lg shadow-sm">
        {!isLoading && <BloodBankRequestsTable bloodRequests={requests as RequestTypes[]} />}
        {isLoading && <LoadingSkeleton />}
      </div>
    </>
  )
}
