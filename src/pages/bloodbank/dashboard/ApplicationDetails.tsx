import { getUserWithHospitalId } from "@/api/authentication";
import { getHospitalById, updateHospital } from "@/api/hospital";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import LoadingButton from "@/components/widgets/LoadingButton";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { APIProvider } from "@vis.gl/react-google-maps";
import CustomMap from "@/components/widgets/CustomMap";

const FormSchema = z.object({
    accessStatus: z.enum(["Active", "Inactive"]),
})

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_APP_GOOGLE_API_KEY;

interface HospitalInfoTypes extends z.infer<typeof FormSchema> {
    name: string;
    province: string;
    town: string;
    id: string;
    hospitalType: "Public" | "Private";
    googleLocation: string;
    specialization: string;
    createdAt: Date;
}

type ApplicationDetailsTypes = {
    name: string;
    province: string;
    town: string;
    id: string;
    hospitalType: "Public" | "Private";
    googleLocation: string;
    specialization: string;
    accessStatus: "Active" | "Inactive";
    createdAt: Date;
}

type ApplicantDataTypes = {
    id: string;
    firstName: string;
    lastName: string;
    province: string;
    email: string;
    phone: string;
    accountStatus: "Active" | "Inactive";
    createdAt: Date;
}

export default function ApplicationDetails() {
    const [isLoading, setIsLoading] = useState(false);
    const params = useParams();
    const [applicant, setApplicant] = useState<ApplicantDataTypes>({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        province: "",
        phone: "",
        accountStatus: "Inactive",
        createdAt: new Date(),
    });

    const [application, setApplication] = useState<ApplicationDetailsTypes>({
        name: "",
        province: "",
        town: "",
        id: "",
        hospitalType: "Public",
        googleLocation: "",
        specialization: "",
        accessStatus: "Active",
        createdAt: new Date(),
    });
    const form = useForm<HospitalInfoTypes>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            accessStatus: "Inactive"
        }
    })

    function onSubmit(data: HospitalInfoTypes) {
        setIsLoading(true);

        data.name = application.name;
        data.province = application.province;
        data.town = application.town;
        data.id = application.id;
        data.hospitalType = application.hospitalType;
        data.googleLocation = application.googleLocation;
        data.specialization = application.specialization;

        updateHospital(params.id as string, data)
            .then((response) => {
                form.reset();
                toast.success(response.message);
                setIsLoading(false);
                window.location.replace(`/dashboard/a/applications`)
            })
            .catch((error) => {
                setIsLoading(false);
                toast.error(error.message);
            })
    }

    useEffect(() => {
        getHospitalById(params.id as string)
            .then(response => {
                setApplication(response.hospital);
            })
            .catch(error => {
                console.error(error);
            });

        getUserWithHospitalId(params.id as string)
            .then(response => {
                setApplicant(response.hospitalAdmin);
            })
            .catch(error => {
                console.error(error);
            });
    }, [params.id]);

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
                        <BreadcrumbLink asChild>
                            <Link to={`/dashboard/${params.userType}/applications`}>Applications</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Details</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Application Details</h1>
                <Button variant="link" className="flex items-center gap-2">
                    <Link to={`/dashboard/a/applications`} className="flex items-center gap-2">Back to Applications</Link>
                </Button>
            </div>
            <div className="flex w-full gap-4 flex-wrap justify-between items-start flex-1 p-4 border rounded-lg shadow-sm">
                <div className="flex w-full flex-wrap lg:w-[60%] justify-between items-start p-4 border rounded-lg shadow-sm">
                    <h2 className="text-lg font-semibold w-full pb-4">Hospital: <span className="text-primary">{application?.name}</span></h2>
                    <Separator />
                    <table className="w-full">
                        <tbody>
                            <tr className="">
                                <th className="text-left py-2 font-semibold">Province</th>
                                <td>{application?.province}</td>
                            </tr>
                            <tr className="">
                                <th className="text-left py-2 font-semibold">Town</th>
                                <td>{application?.town}</td>
                            </tr>
                            <tr className="">
                                <th className="text-left py-2 font-semibold">Type</th>
                                <td>{application?.hospitalType}</td>
                            </tr>
                            <tr className="">
                                <th className="text-left py-2 font-semibold">Specialization</th>
                                <td>{application?.specialization}</td>
                            </tr>
                            <tr className="">
                                <th className="text-left py-2 font-semibold">Access Status</th>
                                <td className="capitalize">
                                    {application?.accessStatus === "Active"
                                        ? <Badge variant={"default"}>Active</Badge>
                                        : <Badge variant={"destructive"}>Inactive</Badge>
                                    }
                                </td>
                            </tr>
                            <tr className="">
                                <th className="text-left py-4 font-semibold">Application Date</th>
                                <td>{new Date(application?.createdAt).toDateString()}</td>
                            </tr>
                        </tbody>
                    </table>
                    <Separator />
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex justify-between mt-2 items-end space-y-4">
                            <FormField
                                control={form.control}
                                name="accessStatus"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Approve application</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Active">Active</SelectItem>
                                                <SelectItem value="Inactive">Inactive</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {isLoading
                                ? <LoadingButton label="Submitting..." btnClass={"w-fit"} btnVariant={"default"} />
                                : <Button className="w-fit" type="submit">Confirm change</Button>
                            }
                        </form>
                    </Form>
                </div>
                <div className="flex w-full md:w-[38%] flex-col justify-start items-start flex-1 p-4 border rounded-lg shadow-sm">
                    <div className="flex gap-4  w-full flex-col">
                        <img src="https://e7.pngegg.com/pngimages/81/570/png-clipart-profile-logo-computer-icons-user-user-blue-heroes-thumbnail.png" alt="logo" className="sm:h-16 sm:w-16 h-32 w-32 rounded-full" />
                        <div>
                            <strong>Applicant</strong>
                            <p>{applicant.firstName + " " + applicant.lastName}</p>
                        </div>
                        <Separator />
                        <table className="w-full">
                            <tbody>
                                <tr className="">
                                    <th className="text-left py-2 font-semibold">Phone number</th>
                                    <td>{applicant?.phone}</td>
                                </tr>
                                <tr className="">
                                    <th className="text-left py-2 font-semibold">Email</th>
                                    <td>{applicant?.email}</td>
                                </tr>
                                <tr className="">
                                    <th className="text-left py-2 font-semibold">Access Status</th>
                                    <td className="capitalize">
                                        {applicant.accountStatus === "Active"
                                            ? <Badge variant={"secondary"}>Active</Badge>
                                            : <Badge variant={"destructive"}>Inactive</Badge>
                                        }
                                    </td>
                                </tr>
                                <tr className="">
                                    <th className="text-left py-4 font-semibold">Join Date</th>
                                    <td>{new Date(applicant.createdAt).toDateString()}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
                <CustomMap coordinates={application.googleLocation} />
            </APIProvider>
        </>
    )
}