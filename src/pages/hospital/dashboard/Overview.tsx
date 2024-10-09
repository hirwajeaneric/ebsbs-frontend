import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import HospitalAdminOverviewContent from "@/components/widgets/HospitalAdminOverviewContent";
import HospitalLabTechOverviewContent from "@/components/widgets/HospitalLabTechOverviewContent";
import { Link, useParams } from "react-router-dom"

export default function Overview() {
  const params = useParams();

  return (
    <div className="flex flex-1 flex-col items-start space-y-4 w-full">
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={`/hdash/${params.hospitalId}/${params.userType}`}>Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Overview</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {params.userType === "a" && <HospitalAdminOverviewContent />}
        {params.userType === "r" && <HospitalLabTechOverviewContent />}
      </div>
  )
}
