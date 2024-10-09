import { Button } from "@/components/ui/button";
import LoadingSkeleton from "@/components/widgets/LoadingSkeleton";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import ManageBloodRequestForm, { RequestTypes } from "@/components/forms/ManageBloodRequestForm";
import { getRequestById } from "@/api/request";
import DeleteRequestDialog from "@/components/widgets/DeleteRequestDialog";
import { BloodBankDataTypes } from "@/components/forms/SettingsForm";
import { HospitalDataTypes } from "@/components/forms/HospitalSettingsForm";
import { getBloodBanks } from "@/api/bloodBank";
import { listActiveHospitals } from "@/api/hospital";
import RequestDataTable from "@/components/tables/RequestDataTable";

export default function SentRequestsDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState<RequestTypes>();
  const [requestRecipient, setRequestRecipient] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const hospitalId = JSON.parse(localStorage.getItem("hospitalWorker") as string).hospitalId;
  const [bloodBanks, setBloodBanks] = useState<BloodBankDataTypes[]>([]);
  const [hospitals, setHospitals] = useState<HospitalDataTypes[]>([]);

  useEffect(() => {
    setIsLoading(true);
    if (params.requestId as string) {
      getRequestById(params.requestId as string)
        .then((res) => {
          if (res) {
            setIsLoading(false);
            setRequest(res.bloodRequest);
            if (res.bloodRequest.idOfOtherHospital) {
              setRequestRecipient(res.bloodRequest.otherHospital.name);
            } else {
              setRequestRecipient(res.bloodRequest.bloodBank.name);
            }
          }
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        })
    }
  }, [params.requestId]);

  useEffect(() => {
    setIsLoading(true);
    getBloodBanks()
      .then((response) => {
        setBloodBanks(response.bloodBanks);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });

    listActiveHospitals()
      .then((response) => {
        setHospitals(response.hospitals);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });

  }, [])

  if (isLoading) {
    return <LoadingSkeleton />;
  }

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
            <BreadcrumbLink asChild>
              <Link to={`/hdash/${hospitalId}/${params.userType}/requests/sent`}>Requests</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Details</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-lg font-semibold md:text-2xl">Update Request sent to <span className="text-slate-500">{requestRecipient}</span></h1>
        <div className="flex justify-between w-full md:w-fit gap-12 items-center">
          {params.requestId && request && (
            <DeleteRequestDialog request={request} />
          )}
          <Button type="button" variant={'link'} onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
      <div className="flex flex-1 p-4 border rounded-lg shadow-sm">
        {isLoading && <LoadingSkeleton />}
        {(!isLoading && request) &&
          <div className="w-full flex flex-1 flex-col space-y-6">
            {request.status === "Pending" ?
              <ManageBloodRequestForm request={request} hospitals={hospitals} bloodBanks={bloodBanks} /> :
              <RequestDataTable request={request} />
            }
          </div>
        }
      </div>
    </>
  )
}