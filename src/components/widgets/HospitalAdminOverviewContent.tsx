import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { UserDataTypes } from "../forms/UserAccountForm";
import LoadingSkeleton from "./LoadingSkeleton";
import { getAdminOverviewData } from "@/api/hospital";
import { HospitalDataTypes } from "../forms/HospitalSettingsForm";
import { RequestTypes } from "../forms/ManageBloodRequestForm";
import { BloodInTransactionsTypes } from "../tables/BloodInTransactionsTable/BloodInTransactionTable";

export default function HospitalAdminOverviewContent() {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<UserDataTypes[]>();
  const hospitalId = JSON.parse(localStorage.getItem("hospitalAdmin") as string).hospitalId;
  const [hospital, setHospital] = useState<HospitalDataTypes>();
  const [bloodRequests, setBloodRequests] = useState<RequestTypes[]>();
  const [bloodInTransactions, setBloodInTransactions] = useState<BloodInTransactionsTypes[]>();

  useEffect(() => {
    setIsLoading(true);
    getAdminOverviewData(hospitalId)
      .then((response) => {
        console.log(response);
        setHospital(response.hospital);
        setUsers(response.hospital.workers);
        setBloodRequests(response.hospital.bloodRequests);
        setBloodInTransactions(response.hospital.bloodInTransactions);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      })
  }, [hospitalId])

  if (isLoading) {
    return <LoadingSkeleton />
  }

  return (
    <>
      <div className="flex flex-col space-y-1">
        <h1 className="text-3xl font-semibold">Welcome to <span className="text-primary">{hospital?.name}</span> Admin Portal</h1>
        <p className="text-lg text-foreground">Manage hospital's access to the system and other user's access here</p>
      </div>
      <div className="grid auto-rows-max items-start gap-4 w-full">
        <div className="grid gap-4 grid-cols-2 w-full md:grid-cols-3">
          <Card className="">
            <CardHeader className="pb-2">
              <CardDescription>Pharmacists</CardDescription>
              <CardTitle className="text-4xl">{users?.length || 0}</CardTitle>
            </CardHeader>
            <CardContent>
              <Link className="text-sm text-primary hover:underline" to={`/hdash/${hospitalId}/a/users`}>View More</Link>
            </CardContent>
          </Card>
          <Card >
            <CardHeader className="pb-2">
              <CardDescription>Blood In Transactions</CardDescription>
              <CardTitle className="text-4xl">{bloodInTransactions?.length || 0}</CardTitle>
            </CardHeader>
            <CardContent>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Blood Requests</CardDescription>
              <CardTitle className="text-4xl">{bloodRequests?.length || 0}</CardTitle>
            </CardHeader>
            <CardContent>
            </CardContent>
          </Card>
        </div>
        <Card className="sm:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle>Manage Pharmacists</CardTitle>
            <CardDescription className="text-balance max-w-lg leading-relaxed">
              Add New Pharmacists for your hospital
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button>
              <Link to={`/hdash/${hospitalId}/a/users/new`}>Add New User</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
