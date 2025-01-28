import { getBloodBankRequestsData } from "@/api/bloodBank";
import { RequestTypes } from "@/components/forms/ManageBloodRequestForm";
import { BloodBankDataTypes } from "@/components/forms/SettingsForm";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import LoadingSkeleton from "@/components/widgets/LoadingSkeleton";
import { RequestReportToPrintRangeChooser } from "@/components/widgets/RequestReportToPrintRangeChooser";
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
  const bloodBankId = JSON.parse(localStorage.getItem("bloodbankRecorder") as string).bloodBankId;
  const [bloodBank, setBloodBank] = useState<BloodBankDataTypes>({ id: '', name: '', googleLocation: '', province: '', town: '', email: '', phone: '', POBox: '' });
  const [allRequests, setAllRequests] = useState<RequestTypes[]>([]);
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date('2024-07-01').toUTCString(),
    to: new Date('2025-01-31').toUTCString(),
  });
  const requestReportRef = useRef(null);
  const handlePrintRequestReport = useReactToPrint({
    content: () => requestReportRef.current,
  });

  const handleDateRangeChange = (dateRange: DateRange) => {
    setDateRange(dateRange);
    setIsLoading(true);
    fetchData(bloodBankId, dateRange);
  };

  const fetchData = (bloodBankId: string, dateRange: DateRange) => {
    getBloodBankRequestsData(bloodBankId, dateRange.from, dateRange.to)
      .then((res) => {
        setAllRequests(res.requests);
        setBloodBank(res.bloodBank);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData(bloodBankId, dateRange);
  }, [bloodBankId, dateRange]);

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
              <div className="flex  items- center space-x-4 w-full">
                <div className="flex flex-col items-start">
                  <h2 className="text-lg font-semibold md:text-xl">Blood Requests</h2>
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
              <RequestReportToPrintRangeChooser
                ref={requestReportRef}
                allRequests={allRequests}
                pendingRequests={allRequests.filter((request) => request.status === "Pending")}
                bloodBank={bloodBank}
                from={dateRange.from}
                to={dateRange.to as string}
              />
            </div>
          </>
        }
      </div>
    </>
  )
}
