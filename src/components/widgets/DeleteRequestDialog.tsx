import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useState } from "react"
import LoadingButton from "./LoadingButton"
import { RequestTypes } from "../forms/ManageBloodRequestForm"
import { deleteRequest } from "@/api/request"


export default function DeleteRequestDialog({ request }: { request: RequestTypes }) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const removeRequest = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (request.id) {
            setIsLoading(true);
            deleteRequest(request.id)
                .then((res) => {
                    if (res) {
                        toast.success("Request deleted successfully");
                        navigate(-1);
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger className="w-fit px-4 text-black hover:bg-slate-200 py-2 text-sm bg-slate-300 rounded-md ">Delete Request</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader> 
                    <AlertDialogTitle>Delete Request</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete this request?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex justify-between">
                    <form onSubmit={removeRequest}>
                        {isLoading ? <LoadingButton label="Deleting..." btnClass="w-fit" btnVariant={"secondary"} /> : <Button className="w-fit" type="submit">Delete</Button>}
                    </form>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                    </AlertDialogFooter>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}