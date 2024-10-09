import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import LoadingButton from "../widgets/LoadingButton"
import { toast } from "sonner"
import { updateHospital, UpdateHospitalTypes } from "@/api/hospital"
import { Switch } from "../ui/switch";
import { Label } from "../ui/label"
import { APIProvider } from "@vis.gl/react-google-maps";
import CustomMap from "../widgets/CustomMap";
import { Separator } from "../ui/separator"

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_APP_GOOGLE_API_KEY;

type Props = {
    id: string,
    hospital: UpdateHospitalTypes
}

export default function HospitalDataForm({ id, hospital }: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<UpdateHospitalTypes>();
    const [access, setAccess] = useState(false);

    useEffect(() => {
        setData(hospital);
        if (hospital.accessStatus === "Active") {
            setAccess(true);
        } else {
            setAccess(false);
        }
    }, [hospital])

    function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const updatedData: UpdateHospitalTypes = {
            ...data!,
            accessStatus: access ? "Active" : "Inactive"
        };

        setData(updatedData);

        setIsLoading(true);
        updateHospital(id, updatedData)
            .then((response) => {
                toast.success(response.message);
                setIsLoading(false);
                window.location.reload();
            })
            .catch((error) => {
                setIsLoading(false);
                if (error instanceof Error && error.name === "NetworkError") {
                    toast.error("Network error. Please check your connection.");
                } else if (error instanceof Error && error.name === "ValidationError") {
                    toast.error("Validation error. Please check your input.");
                } else {
                    toast.error("An unexpected error occurred. Please try again.");
                }
                console.error(error);
            });
    }

    return (
        <form onSubmit={handleUpdate} className="w-full space-y-4">
            <div className="flex flex-col gap-1">
                <Label className="font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Name</Label>
                <span>{data?.name}</span>
            </div>
            <Separator />
            <div className="flex flex-col gap-2">
                <Label className="font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Address</Label>
                <div className="flex flex-col">
                    <span>Province: {data?.province}</span>
                    <span>Town: {data?.town}</span>
                </div>
            </div>
            <Separator />
            <div className="flex flex-col gap-2">
                <Label className="font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">More info</Label>
                <div className="flex flex-col">
                    <span>Type: {data?.hospitalType}</span>
                    <span>Specialization: {data?.specialization}</span>
                </div>
            </div>
            <Separator />
            <div className="flex justify-between items-center rounded-lg p-3 border">
                <div className="flex flex-col gap-1">
                    <Label className="font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Access Status</Label>
                    <span className="text-sm text-muted-foreground">Activate or disactivate hospital's access to the system</span>
                </div>
                <Switch id="airplane-mode" checked={access} onCheckedChange={(value) => setAccess(value)} />
            </div>

            <div className="flex mt-8 justify-end items-center w-full">
                {isLoading
                    ? <LoadingButton label="Submitting..." btnClass={"w-fit"} btnVariant={"default"} />
                    : <Button type="submit">Confirm changes</Button>
                }
            </div>
            <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
                <CustomMap coordinates={hospital.googleLocation} />
            </APIProvider>
        </form>
    )
}