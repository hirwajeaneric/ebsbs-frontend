import { getHospitalSentRequests } from "@/api/request";
import { RequestTypes } from "@/components/forms/ManageBloodRequestForm";
import { SentBloodRequestsTable } from "@/components/tables/sentBloodRequestsTable/SentBloodRequestsTable";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import LoadingSkeleton from "@/components/widgets/LoadingSkeleton";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function SentRequests() {
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
    getHospitalSentRequests(hospitalId)
      .then((response) => {
        response.bloodRequests.map((bloodRequest: RequestTypes) => {
          if (bloodRequest.idOfOtherHospital?.toString()) {
            bloodRequest.recipientName = bloodRequest.otherHospital?.name ?? ''
            bloodRequest.recipientType = 'Hospital'
          } else if (bloodRequest.bloodBankId?.toString()) {
            bloodRequest.recipientName = bloodRequest.bloodBank?.name ?? ''
            bloodRequest.recipientType = 'Blood Bank'
          }
        });
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
            <BreadcrumbPage>Sent Requests</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Sent Requests</h1>
        <Button variant={'default'} className="ml-4" onClick={() => navigate(`/hdash/${hospitalId}/${params.userType}/requests/sent/new`)}>Create New</Button>
      </div>
      <div className="flex flex-1 p-4 border rounded-lg shadow-sm">
        {!isLoading && <SentBloodRequestsTable bloodRequests={requests as RequestTypes[]} />}
        {isLoading && <LoadingSkeleton />}
      </div>
    </>
  )
}
