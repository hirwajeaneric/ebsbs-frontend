import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { UserDataTypes } from "../forms/ManageUserForm"
import { Button } from "../ui/button"
import { deleteUser } from "@/api/authentication"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useState } from "react"
import LoadingButton from "./LoadingButton"
import { HospitalUserDataTypes } from "../forms/ManageHospitalUserForm"


export default function DeleteDialog({ user }: { user: UserDataTypes | HospitalUserDataTypes}) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const deleteAccount = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (user.id) {
            setIsLoading(true);

            deleteUser(user.role, user.id)
                .then((res) => {
                    if (res) {
                        toast.success("Account deleted successfully");
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
            <AlertDialogTrigger className="w-fit px-4 font-semibold hover:bg-slate-200 py-2 text-sm bg-slate-300 rounded-md ">Delete Account</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Account</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete {user.firstName} {user.lastName}'s account?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex justify-between">
                    <form onSubmit={deleteAccount}>
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