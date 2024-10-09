import { Bell, CircleUser, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Link, NavLink, Outlet, useParams } from "react-router-dom"
import { ModeToggle } from "@/components/mode-toggle"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import HospitalDashboardLinks from "@/components/widgets/HospitalDashboardLinks"
import SearchHospitalsDrawer from "@/components/forms/SearchHospitalsDrawer"
import { getNotificationsByHospitalId } from "@/api/notification"
import NotificationContainer, { Notification } from "@/components/widgets/NotificationContainer"

type UserData = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  accountStatus: "Active" | "Inactive";
  hospitalId?: string;
  role: string;
  hospitalName: string;
}

export default function HospitalDashboardLayout() {
  const pathName = window.location.pathname;
  const params = useParams();
  const [user, setUser] = useState<UserData>();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (params.userType === "a") {
      setUser(JSON.parse(localStorage.getItem("hospitalAdmin") as string))
    } else {
      setUser(JSON.parse(localStorage.getItem("hospitalWorker") as string))
      getNotificationsByHospitalId(JSON.parse(localStorage.getItem("hospitalWorker") as string).hospitalId)
        .then((response) => {
          const inDescendingOrder = response.notifications.sort((a: Notification, b: Notification) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          });
          setNotifications(inDescendingOrder)
        })
        .catch((error) => {
          console.error(error);
        })
    }
  }, [params.userType])

  const signOut = () => {
    if (params.userType === "a") {
      localStorage.removeItem("hospitalAdmin")
      localStorage.removeItem("hospitalAdminToken")
    } else {
      localStorage.removeItem("hospitalWorker")
      localStorage.removeItem("hospitalWorkerToken")
    }
    window.location.replace("/hauth/signin");
  }


  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex gap-4 h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to={`/hdash/${user?.hospitalId}/${params.userType}`} className="flex items-center gap-2 font-semibold">
              <img src="/vecteezy_round-medical-cross-symbol-on-transparent-background_17177954.png" alt="logo" className="h-8 rounded-full w-auto sm:h-10" />
            </Link>
            <div className="flex flex-col justify-start">
              <span className="">{user?.hospitalName || "Hospital"}</span>
              <span className="font-bold underline text-sm">{params.userType === "a" ? "Hospital Director" : "Pharmacist"}</span>
            </div>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {HospitalDashboardLinks.map((link, index) => {
                if (params.userType === 'a' && link.user === "Admin") {
                  return (
                    <NavLink key={index} to={link.to} className={cn((pathName.includes(link.to) && pathName.split('/').slice(-1)[0] !== "r") && "bg-zinc-200 dark:bg-zinc-800 dark:text-white", "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary")}>
                      {link.icon}
                      {link.label}
                    </NavLink>
                  )
                }
                if (params.userType === 'r' && link.user === "Worker") {
                  return (
                    <NavLink key={index} to={link.to} className={cn((pathName.includes(link.to) && pathName.split('/').slice(-1)[0] !== "r") && "bg-zinc-200 dark:bg-zinc-800 dark:text-white", "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary")}>
                      {link.icon}
                      {link.label}
                    </NavLink>
                  )
                }
              })}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 bg-[url(/transfusion-therapy.jpg)] bg-no-repeat bg-cover">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link to={`/dashboard/${params.userType}`} className="flex items-center gap-2 font-semibold">
                  <img src="/vecteezy_round-medical-cross-symbol-on-transparent-background_17177954.png" alt="logo" className="h-8 rounded-full w-auto sm:h-10" />
                  <span className="">
                    EBSBS
                  </span>
                </Link>
                {HospitalDashboardLinks.map((link, index) => {
                  if (params.userType === 'a' && link.user === "Admin") {
                    return (
                      <NavLink key={index} to={link.to} className={cn(window.location.pathname.includes(link.to) && "bg-zinc-200 dark:bg-zinc-800 dark:text-white", "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground")}>
                        {link.icon}
                        {link.label}
                      </NavLink>
                    )
                  }
                  if (params.userType === 'r' && link.user === "Worker") {
                    return (
                      <NavLink key={index} to={link.to} className={cn(window.location.pathname.includes(link.to) && "bg-zinc-200 dark:bg-zinc-800 dark:text-white", "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground")}>
                        {link.icon}
                        {link.label}
                      </NavLink>
                    )
                  }
                })}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex gap-4 justify-between w-full">
            <span className="mr-auto block md:hidden font-bold underline">
              {params.userType === "a" ? "Hospital Director" : "Pharmacist"}
            </span>
            {params.userType === "r" && <SearchHospitalsDrawer />}
            <div className="flex items-center space-x-4 ml-auto">
              <ModeToggle />
              {user?.role === "Hospital Worker" && <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="icon" className="rounded-full">
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">Toggle notitication</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel><span>Notifications</span></DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="overflow-y-scroll h-96">
                    {notifications && notifications.length > 0 && notifications.map((notification, index) => (
                      <DropdownMenuItem key={index} className="flex flex-col justify-start items-start gap-2">
                        <NotificationContainer key={index} notification={notification} />
                      </DropdownMenuItem>
                    ))}
                  </div>
                  <DropdownMenuItem>
                    {notifications && notifications.length === 0 && <span>No notifications available</span>}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="icon" className="rounded-full">
                    <CircleUser className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel className="flex flex-col gap-1">
                    <span>{user?.firstName + " " + user?.lastName}</span>
                    <span className="text-sm font-extralight">{user?.email}</span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {params.userType === "a" && <DropdownMenuItem><Link to={`/hdash/${user?.hospitalId}/${params.userType}/settings`}>Settings</Link></DropdownMenuItem>}
                  <DropdownMenuItem><Link to={`/hdash/${user?.hospitalId}/${params.userType}/profile`}>Profile</Link></DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
