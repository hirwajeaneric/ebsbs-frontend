import { getBloodBagsInBloodBank } from "@/api/bloodBag";
import { BloodBagsTable } from "@/components/tables/bloodBagsTable/BloodBagsTable";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import LoadingSkeleton from "@/components/widgets/LoadingSkeleton";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function BloodBags() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [bags, setBags] = useState([]);
  const bloodBankId = JSON.parse(localStorage.getItem("bloodbankRecorder") as string).bloodBankId;
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getBloodBagsInBloodBank(bloodBankId)
      .then((response) => {
        setIsLoading(false);
        console.log(response.bloodBags);
        setBags(response.bloodBags);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  }, [bloodBankId]);

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
            <BreadcrumbPage>Blood Bags</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Blood Bags</h1>
        <Button type="button" variant={'default'} onClick={() => navigate('/dashboard/r/bags/add')}>Add Bag</Button>
      </div>
      <div className="flex flex-1 p-4 border rounded-lg shadow-sm">
        {!isLoading && <BloodBagsTable bloodBags={bags} />}
        {isLoading && <LoadingSkeleton />}
      </div>
    </>
  )
}
