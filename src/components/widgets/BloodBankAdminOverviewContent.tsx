import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ApplicationsTypes } from "@/pages/bloodbank/dashboard/Applications";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { HospitalDataTypes } from "../forms/HospitalSettingsForm";
import { getAdminOverviewData } from "@/api/bloodBank";
import { UserDataTypes } from "../forms/UserAccountForm";
import LoadingSkeleton from "./LoadingSkeleton";
import { Notification } from "./NotificationContainer";

export default function BloodBankAdminOverviewContent() {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<UserDataTypes[]>();
  const [applications, setApplications] = useState<ApplicationsTypes[]>();
  const [notifications, setNotifications] = useState<Notification[]>();
  const [hospitals, setHospitals] = useState<HospitalDataTypes[]>();
  const bloodBankId = JSON.parse(localStorage.getItem("bloodbankAdmin") as string).bloodBankId;

  useEffect(() => {
    setIsLoading(true);
    getAdminOverviewData(bloodBankId)
      .then((response) => {
        setUsers(response.users);
        setApplications(response.applications);
        setNotifications(response.notifications);
        setHospitals(response.hospitals);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      })
  }, [bloodBankId])

  if (isLoading) {
    return <LoadingSkeleton />
  }
  
  return (
    <div className="grid auto-rows-max items-start gap-4 w-full">
      <div className="grid gap-4 grid-cols-2 w-full md:grid-cols-4">
        <Card className="">
          <CardHeader className="pb-2">
            <CardDescription>Applications from Hospitals</CardDescription>
            <CardTitle className="text-4xl">{applications?.length || 0}</CardTitle>
          </CardHeader>
          <CardContent>
            <Link className="text-sm text-primary hover:underline" to={'/dashboard/a/applications'}>View More</Link>
          </CardContent>
        </Card>
        <Card >
          <CardHeader className="pb-2">
            <CardDescription>Hospitals With Access</CardDescription>
            <CardTitle className="text-4xl">{hospitals?.length || 0}</CardTitle>
          </CardHeader>
          <CardContent>
            <Link className="text-sm text-primary hover:underline" to={'/dashboard/a/hospitals'}>View More</Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Lab Technicians</CardDescription>
            <CardTitle className="text-4xl">{users?.length || 0}</CardTitle>
          </CardHeader>
          <CardContent>
            <Link className="text-sm text-primary hover:underline" to={'/dashboard/a/users'}>View More</Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Notifications</CardDescription>
            <CardTitle className="text-4xl">{notifications?.length || 0}</CardTitle>
          </CardHeader>
          <CardContent>
            {/* <Link className="text-sm text-primary hover:underline" to={'/dashboard/a/notifications'}>View More</Link> */}
          </CardContent>
        </Card>
      </div>
      <Card className="sm:col-span-2">
        <CardHeader className="pb-3">
          <CardTitle>Manage Lab Technicians</CardTitle>
          <CardDescription className="text-balance max-w-lg leading-relaxed">
            Add New Lab Technician to manage the blood bank
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button>
            <Link to="/dashboard/a/users/new">Add New Lab Technician</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
