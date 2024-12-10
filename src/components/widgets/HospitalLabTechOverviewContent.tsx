import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import LoadingSkeleton from "./LoadingSkeleton";
import { RequestTypes } from "../forms/ManageBloodRequestForm";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useReactToPrint } from "react-to-print"
import { Button } from "../ui/button";
import { File } from "lucide-react";
import { BloodInTransactionsTable, BloodInTransactionsTypes } from "../tables/BloodInTransactionsTable/BloodInTransactionTable";
import { getLabTechnitianOverviewData } from "@/api/hospital";
import { HospitalDataTypes } from "../forms/HospitalSettingsForm";
import { getMonthName } from "@/lib/months";
import { BloodInTransactionsReportToPrint } from "./BloodInTransactionsReportToPrint";

export default function HospitalLabTechOverviewContent() {
  // Report configurations 
  const bloodInTransactionReportRef = useRef(null);

  const handlePrintBloodInTransactionsReport = useReactToPrint({
    content: () => bloodInTransactionReportRef.current,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filterYear, setFilterYear] = useState<string>(new Date().getFullYear().toString());
  const [filterMonth, setFilterMonth] = useState<string>(new Date().getMonth().toString());
  const [hospital, setHospital] = useState<HospitalDataTypes>();
  const [bloodRequests, setBloodRequests] = useState<RequestTypes[]>();
  const [receivedBloodRequests, setReceivedBloodRequests] = useState<RequestTypes[]>();
  const [bloodInTransactions, setBloodInTransactions] = useState<BloodInTransactionsTypes[]>();

  const handleMonthChange = (month: string) => {
    setFilterMonth(month);
  };

  const handleYearChange = (year: string) => {
    setFilterYear(year);
  };

  const hospitalId = JSON.parse(localStorage.getItem("hospitalWorker") as string).hospitalId;

  useEffect(() => {
    setIsLoading(true);
    getLabTechnitianOverviewData({
      hospitalId: hospitalId,
      month: Number(filterMonth),
      year: Number(filterYear)
    })
      .then((response) => {
        setNotifications(response.hospital.notifications);
        setBloodRequests(response.sentBloodRequests);
        setReceivedBloodRequests(response.receivedBloodRequests)
        setBloodInTransactions(response.bloodInTransactions);
        setHospital(response.hospital);
        setFilterYear(response.filters.year.toString());
        setFilterMonth(response.filters.month.toString());
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      })
  }, [hospitalId, filterMonth, filterYear])

  if (isLoading) {
    return <LoadingSkeleton />
  }

  return (
    <div className="grid auto-rows-max items-start gap-4 w-full">
      <div className="flex justify-start md:justify-end items-center gap-4 w-full flex-wrap">
        <div className="flex justify-end items-center gap-3">
          <span className="font-semibold text-sm">Filter</span>
          <div className="flex items-end gap-2">
            <Select name="filterYear" onValueChange={(value) => handleYearChange(value)}>
              <SelectTrigger className="w-fit">
                <SelectValue placeholder={filterYear} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Year</SelectLabel>
                  <SelectItem value={new Date().getFullYear().toString()}>{new Date().getFullYear()}</SelectItem>
                  <SelectItem value={(new Date().getFullYear() - 1).toString()}>{new Date().getFullYear() - 1}</SelectItem>
                  <SelectItem value={(new Date().getFullYear() - 2).toString()}>{new Date().getFullYear() - 2}</SelectItem>
                  <SelectItem value={(new Date().getFullYear() - 3).toString()}>{new Date().getFullYear() - 3}</SelectItem>
                  <SelectItem value={(new Date().getFullYear() - 4).toString()}>{new Date().getFullYear() - 4}</SelectItem>
                  <SelectItem value={(new Date().getFullYear() - 5).toString()}>{new Date().getFullYear() - 5}</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select name="filterMonth" onValueChange={(value) => handleMonthChange(value)}>
              <SelectTrigger className="w-fit">
                <SelectValue placeholder={getMonthName(Number(filterMonth)+1)} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Months</SelectLabel>
                  <SelectItem value="0">January</SelectItem>
                  <SelectItem value="1">February</SelectItem>
                  <SelectItem value="2">March</SelectItem>
                  <SelectItem value="3">April</SelectItem>
                  <SelectItem value="4">May</SelectItem>
                  <SelectItem value="5">June</SelectItem>
                  <SelectItem value="6">July</SelectItem>
                  <SelectItem value="7">August</SelectItem>
                  <SelectItem value="8">September</SelectItem>
                  <SelectItem value="9">October</SelectItem>
                  <SelectItem value="10">November</SelectItem>
                  <SelectItem value="11">December</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end gap-2">
          </div>
        </div>
        <div className="flex justify-end items-center gap-2">
          <span className="font-semibold text-sm">Reports</span>
          <Button onClick={handlePrintBloodInTransactionsReport} size={"sm"} variant="outline">
            <File size={20} className="mr-2" />
            Blood In Transactions Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 w-full md:grid-cols-4">
        <Card className="">
          <CardHeader className="pb-2">
            <CardDescription>Received Requests</CardDescription>
            <CardTitle className="text-4xl">{receivedBloodRequests?.length || 0}</CardTitle>
          </CardHeader>
          <CardContent>
            <Link className="text-sm text-primary hover:underline" to={`/hdash/${hospitalId}/r/requests/incoming`}>View More</Link>
          </CardContent>
        </Card>
        <Card >
          <CardHeader className="pb-2">
            <CardDescription>Sent Requests</CardDescription>
            <CardTitle className="text-4xl">{bloodRequests?.length || 0}</CardTitle>
          </CardHeader>
          <CardContent>
            <Link className="text-sm text-primary hover:underline" to={`/hdash/${hospitalId}/r/requests/sent`}>View More</Link>
          </CardContent>
        </Card>
        <Card >
          <CardHeader className="pb-2">
            <CardDescription>Blood In Transactions</CardDescription>
            <CardTitle className="text-4xl">{bloodInTransactions?.length || 0}</CardTitle>
          </CardHeader>
          <CardContent>
            <Link className="text-sm text-primary hover:underline" to={`/hdash/${hospitalId}/r/requests/sent`}>View More</Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Notifications</CardDescription>
            <CardTitle className="text-4xl">{notifications?.length || 0}</CardTitle>
          </CardHeader>
          <CardContent>
          </CardContent>
        </Card>
      </div>
      {bloodInTransactions &&
        <div className="flex-col mt-2">
          <h3 className="text-xl font-semibold">{hospital?.name}'s Blood In Transactions</h3>
          <BloodInTransactionsTable bloodInTransactions={bloodInTransactions} />
        </div>
      }
      <div className="hidden">
        <BloodInTransactionsReportToPrint 
          ref={bloodInTransactionReportRef}
          bloodInTransactions={bloodInTransactions} 
          filterYear={Number(filterYear)} 
          filterMonth={Number(filterMonth)}        
          hospital={hospital}
        />
      </div>
    </div>
  )
}