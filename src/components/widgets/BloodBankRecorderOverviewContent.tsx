import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { getBloodBankRecorderOverviewData } from "@/api/bloodBank";
import LoadingSkeleton from "./LoadingSkeleton";
import { RequestTypes } from "../forms/ManageBloodRequestForm";
import { BloodBagTypes } from "../forms/ManageBloodBagForm";
import RequestsLineChart from "./RequestsLineChart";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useReactToPrint } from "react-to-print"
import { RequestReportToPrint } from "./RequestReportToPrint";
import { Button } from "../ui/button";
import { BloodBankDataTypes } from "../forms/SettingsForm";
import { File } from "lucide-react";
import { getMonthName } from "@/lib/months";

export default function BloodBankRecorderOverviewContent() {
  // Report configurations 
  const requestReportRef = useRef(null);
  // const stockReportRef = useRef(null);
  const handlePrintRequestReport = useReactToPrint({
    content: () => requestReportRef.current,
  });
  // const handlePrintStockReport = useReactToPrint({
  //   content: () => stockReportRef.current,
  // });

  const [isLoading, setIsLoading] = useState(false);
  const [allRequests, setAllRequests] = useState<RequestTypes[]>([]);
  const [pendingRequests, setPendingRequests] = useState<RequestTypes[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [bloodBags, setBloodBags] = useState<BloodBagTypes[]>([]);
  const [chartData, setChartData] = useState([]);
  const [filterYear, setFilterYear] = useState<string>(new Date().getFullYear().toString());
  const [filterMonth, setFilterMonth] = useState<string>(new Date().getMonth().toString());
  const [bloodBank, setBloodBank] = useState<BloodBankDataTypes>({ id: '', name: '', googleLocation: '', province: '', town: '', email: '', phone: '', POBox: '' });

  const handleMonthChange = (month: string) => {
    setFilterMonth(month);
  };

  const handleYearChange = (year: string) => {
    setFilterYear(year);
  };

  const bloodBankId = JSON.parse(localStorage.getItem("bloodbankRecorder") as string).bloodBankId;

  useEffect(() => {
    setIsLoading(true);
    getBloodBankRecorderOverviewData({
      bloodBankId,
      month: Number(filterMonth),
      year: Number(filterYear)
    })
      .then((response) => {
        console.log(response);
        setAllRequests(response.requests);
        setPendingRequests(response.requests.filter((request: RequestTypes) => request.status === "Pending"));
        setBloodBags(response.bloodBags);
        setNotifications(response.notifications);
        setFilterYear(response.filters.year);
        setFilterMonth(response.filters.month);
        setBloodBank(response.bloodBank || {
          id: '',
          name: '',
          googleLocation: '',
          province: '',
          town: '',
          email: '',
          phone: '',
          POBox: ''
        });
        setChartData(response.chartData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      })
  }, [bloodBankId, filterMonth, filterYear])

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
                <SelectValue placeholder={getMonthName(Number(filterMonth) + 1)} />
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
          <Button onClick={handlePrintRequestReport} size={"sm"} variant="outline">
            <File size={20} className="mr-2" />
            Requests Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 w-full md:grid-cols-4">
        <Card className="">
          <CardHeader className="pb-2">
            <CardDescription>All Received Requests</CardDescription>
            <CardTitle className="text-4xl">{allRequests?.length || 0}</CardTitle>
          </CardHeader>
          <CardContent>
            <Link className="text-sm text-primary hover:underline" to={'/dashboard/r/requests'}>View More</Link>
          </CardContent>
        </Card>
        <Card >
          <CardHeader className="pb-2">
            <CardDescription>Pending Requests</CardDescription>
            <CardTitle className="text-4xl">{pendingRequests?.length || 0}</CardTitle>
          </CardHeader>
          <CardContent>
            <Link className="text-sm text-primary hover:underline" to={'/dashboard/r/requests'}>View More</Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Blood Bags in Stock</CardDescription>
            <CardTitle className="text-4xl">{bloodBags?.length || 0}</CardTitle>
          </CardHeader>
          <CardContent>
            <Link className="text-sm text-primary hover:underline" to={'/dashboard/r/bags'}>View More</Link>
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
      <RequestsLineChart data={chartData} filterMonth={Number(filterMonth)} filterYear={Number(filterYear)} />
      <div className="hidden">
        <RequestReportToPrint
          ref={requestReportRef}
          allRequests={allRequests}
          pendingRequests={pendingRequests}
          filterYear={Number(filterYear)}
          filterMonth={Number(filterMonth)}
          bloodBank={bloodBank}
        />
      </div>
    </div>
  )
}