import { getReceivedRequestsByHospital } from "@/api/request";
import { RequestTypes } from "@/components/forms/ManageBloodRequestForm";
import { RecievedBloodRequestsTable } from "@/components/tables/RecievedBloodRequestsTable/RecievedBloodRequestsTable";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import LoadingSkeleton from "@/components/widgets/LoadingSkeleton";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function ReceivedRequests() {
  const params = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [requests, setRequests] = useState<RequestTypes[]>([]);
  let hospitalId = "";

  if (params.userType === "a") {
    hospitalId = JSON.parse(localStorage.getItem("hospitalAdmin") as string).hospitalId;
  } else if (params.userType === "r") {
    hospitalId = JSON.parse(localStorage.getItem("hospitalWorker") as string).hospitalId;
  }

  useEffect(() => {
    setIsLoading(true);
    getReceivedRequestsByHospital(hospitalId)
      .then((response) => {
        console.log(response.bloodRequests);
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
  }, [hospitalId, params]);

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
            <BreadcrumbPage>Received Requests</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Received Requests</h1>
        {params.requestType === "sent" && <Button variant={'default'} className="ml-4" onClick={() => navigate(`/hdash/${hospitalId}/${params.userType}/requests/sent/new`)}>Create New</Button>}
      </div>
      <div className="flex flex-1 p-4 border rounded-lg shadow-sm">
        {!isLoading && <RecievedBloodRequestsTable bloodRequests={requests as RequestTypes[]} />}
        {isLoading && <LoadingSkeleton />}
      </div>
    </>
  )
}
