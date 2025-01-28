import {
    CircleUser,
    FileSearch,
    LineChart,
    Package,
    Package2,
    Settings,
    ShoppingCart,
    Users,
    Hospital,
    File
} from "lucide-react"

const BloodBankDashboardLinks = [
    {
        label: "Home",
        to: "/dashboard/r",
        user: "Recorder",
        icon: <LineChart className="h-4 w-4" />,
    },
    {
        label: "Report",
        to: "/dashboard/r/reports",
        user: "Recorder",
        icon: <File className="h-4 w-4" />,
    },
    {
        label: "Overview",
        to: "/dashboard/a",
        user: "Admin",
        icon: <LineChart className="h-4 w-4" />,
    },
    {
        label: "Stock",
        to: "/dashboard/r/stock",
        user: "Recorder",
        icon: <Package className="h-4 w-4" />,
    },
    {
        label: "Blood Bags",
        to: "/dashboard/r/bags",
        user: "Recorder",
        icon: <Package2 className="h-4 w-4" />,
    },
    {
        label: "Requests",
        to: "/dashboard/r/requests",
        user: "Recorder",
        icon: <ShoppingCart className="h-4 w-4" />,
    },
    {
        label: "Applications",
        to: "/dashboard/a/applications",
        user: "Admin",
        icon: <FileSearch className="h-4 w-4" />,
    },
    {
        label: "Lab Technicians",
        to: "/dashboard/a/users",
        user: "Admin",
        icon: <Users className="h-4 w-4" />,
    },
    {
        label: "Hospitals",
        to: "/dashboard/a/hospitals",
        user: "Admin",
        icon: <Hospital className="h-4 w-4" />,
    },
    {
        label: "Settings",
        to: "/dashboard/a/settings",
        user: "Admin",
        icon: <Settings className="h-4 w-4" />,
    },
    {
        label: "Profile",
        to: "/dashboard/a/profile",
        user: "Admin",
        icon: <CircleUser className="h-4 w-4" />,
    },
    {
        label: "Profile",
        to: "/dashboard/r/profile",
        user: "Recorder",
        icon: <CircleUser className="h-4 w-4" />,
    },

]

export default BloodBankDashboardLinks;