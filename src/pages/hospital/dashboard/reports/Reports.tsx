import { getHospitalRequestsData } from "@/api/hospital";
import { HospitalDataTypes } from "@/components/forms/HospitalSettingsForm";
import { BloodInTransactionsTypes } from "@/components/tables/BloodInTransactionsTable/BloodInTransactionTable";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { BloodInTransactionsReportToPrintRangeChooser } from "@/components/widgets/BloodInTransactionsReportToPrintRangeChooser";
import LoadingSkeleton from "@/components/widgets/LoadingSkeleton";
import { File } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

type DateRange = {
  from: string;
  to?: string | undefined;
}

export default function Reports() {
  const [isLoading, setIsLoading] = useState(false);
  const hospitalId = JSON.parse(localStorage.getItem("hospitalWorker") as string).hospitalId;
  const [hospital, setHospital] = useState<HospitalDataTypes>();
  const [bloodInTransactions, setBloodInTransactions] = useState<BloodInTransactionsTypes[]>([]);
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date('2024-07-01').toUTCString(),
    to: new Date('2025-01-31').toUTCString(),
  });
  const requestReportRef = useRef(null);
  const handlePrintRequestReport = useReactToPrint({
    content: () => requestReportRef.current,
  });

  const handleDateRangeChange = (values: DateRange) => {
    setDateRange(values);
    setIsLoading(true);
    fetchData(hospitalId, values);
  };

  const fetchData = (hospitalId: string, dateRange: { from: string, to?: string | undefined }) => {
    getHospitalRequestsData(hospitalId, dateRange.from, dateRange.to)
      .then((res) => {
        res.bloodInTransactions?.forEach((transaction: BloodInTransactionsTypes) => {
          let plasmas = 0;
          let platelets = 0;
          let redBloodCells = 0;
          let wholeBlood = 0;

          plasmas += transaction.plasmaRhN_A + transaction.plasmaRhN_B + transaction.plasmaRhN_O + transaction.plasmaRhP_A + transaction.plasmaRhP_B + transaction.plasmaRhP_O + transaction.plasmaRhP_AB + transaction.plasmaRhN_AB;
          platelets += transaction.plateletRhN_A + transaction.plateletRhN_B + transaction.plateletRhN_O + transaction.plateletRhP_A + transaction.plateletRhP_B + transaction.plateletRhP_O + transaction.plateletRhP_AB + transaction.plateletRhN_AB;
          redBloodCells += transaction.rbcN_A + transaction.rbcN_B + transaction.rbcN_O + transaction.rbcN_AB + transaction.rbcP_A + transaction.rbcP_B + transaction.rbcP_O + transaction.rbcP_AB;
          wholeBlood += transaction.rhN_A + transaction.rhN_B + transaction.rhN_O + transaction.rhP_A + transaction.rhP_B + transaction.rhP_O + transaction.rhP_AB + transaction.rhN_AB;

          transaction.totalPlasmas = plasmas;
          transaction.totalPlatelets = platelets;
          transaction.totalRedBloodCells = redBloodCells;
          transaction.totalWholeBlood = wholeBlood;
          transaction.totalBags = plasmas + platelets + redBloodCells + wholeBlood;
        })
        setBloodInTransactions(res.bloodInTransactions);
        setHospital(res.hospital);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData(hospitalId, dateRange);
  }, [hospitalId, dateRange]);

  return (
    <>
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/dashboard/r`}>Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Reports</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Report</h1>
      </div>
      <div className="flex flex-1 p-4 border rounded-lg shadow-sm">
        {isLoading ? <LoadingSkeleton /> :
          <>
            <div className="flex flex-col items-start space-y-4 w-full">
              <div className="flex items-center justify-start w-full space-x-6">
                <div className="flex flex-col items-start">
                  <h2 className="text-lg font-semibold md:text-xl">Blood In Transactions</h2>
                  <p>Pick a date range or report period.</p>
                </div>
                <DateRangePicker
                  onUpdate={(value) => handleDateRangeChange({ from: value.range.from.toString(), to: value.range.to?.toString() })}
                  initialDateFrom="2024-07-01"
                  initialDateTo="2025-01-31"
                  align="start"
                  locale="en-GB"
                  showCompare={false}
                />
              </div>
              <Button onClick={handlePrintRequestReport} size={"sm"} variant="outline">
                <File size={20} className="mr-2" />
                Download Report
              </Button>
            </div>
            <div className="hidden">
              <BloodInTransactionsReportToPrintRangeChooser
                ref={requestReportRef}
                from={dateRange.from}
                to={dateRange.to as string}
                bloodInTransactions={bloodInTransactions}
                hospital={hospital}
              />
            </div>
          </>
        }
      </div>
    </>
  )
}
