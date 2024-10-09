import { Button } from "@/components/ui/button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import ManageBloodRequestForm from "@/components/forms/ManageBloodRequestForm";
import { useEffect, useState } from "react";
import { getBloodBanks } from "@/api/bloodBank";
import { listActiveHospitals } from "@/api/hospital";
import { BloodBankDataTypes } from "@/components/forms/SettingsForm";
import { HospitalDataTypes } from "@/components/forms/HospitalSettingsForm";
import LoadingSkeleton from "@/components/widgets/LoadingSkeleton";

export default function AddNewBloodbag() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const hospitalId = JSON.parse(localStorage.getItem("hospitalWorker") as string).hospitalId;
  const params = useParams();
  const [bloodBanks, setBloodBanks] = useState<BloodBankDataTypes[]>([]);
  const [hospitals, setHospitals] = useState<HospitalDataTypes[]>([]);

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
              <Link to={`/hdash/${hospitalId}/${params.userType}/requests/sent`}>Sent Requests</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Create</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Create Blood Request</h1>
        <Button type="button" variant={'link'} onClick={() => navigate(-1)}>Go Back</Button>
      </div>
      <div className="flex flex-1 p-4 border rounded-lg shadow-sm">
        {!isLoading && <ManageBloodRequestForm hospitals={hospitals} bloodBanks={bloodBanks} />}
        {isLoading && <LoadingSkeleton />}
      </div>
    </>
  )
}