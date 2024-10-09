import { getBloodBankById } from "@/api/bloodBank";
import StockTable from "@/components/tables/StockTable";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import LoadingSkeleton from "@/components/widgets/LoadingSkeleton";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export type StockTypes = {
  id: string;
  name: string;
  googleLocation: string;
  province: string;
  town: string;
  createdAt: Date;
  updatedAt: Date;
  rhP_O: number;
  rhP_A: number;
  rhP_B: number;
  rhP_AB: number;
  rhN_O: number;
  rhN_A: number;
  rhN_B: number;
  rhN_AB: number;
  plasmaRhP_O: number;
  plasmaRhP_A: number;
  plasmaRhP_B: number;
  plasmaRhP_AB: number;
  plasmaRhN_O: number;
  plasmaRhN_A: number;
  plasmaRhN_B: number;
  plasmaRhN_AB: number;
  plateletRhP_O: number;
  plateletRhP_A: number;
  plateletRhP_B: number;
  plateletRhP_AB: number;
  plateletRhN_O: number;
  plateletRhN_A: number;
  plateletRhN_B: number;
  plateletRhN_AB: number;
  rbcP_O: number;
  rbcP_A: number;
  rbcP_B: number;
  rbcP_AB: number;
  rbcN_O: number;
  rbcN_A: number;
  rbcN_B: number;
  rbcN_AB: number;
};


export default function Stock() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [stock, setStock] = useState<StockTypes | undefined>();

  useEffect(() => {
    setIsLoading(true);
    getBloodBankById(JSON.parse(localStorage.getItem("bloodbankRecorder") as string).bloodBankId)
      .then((response) => {
        setStock(response.bloodBank);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

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
            <BreadcrumbPage>Stock</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Stock</h1>
      </div>
      <div className="flex flex-1 p-4 border rounded-lg shadow-sm">
        {!isLoading && stock && <StockTable stock={stock}/>}
        {isLoading && <LoadingSkeleton />}
      </div>
    </>
  )
}