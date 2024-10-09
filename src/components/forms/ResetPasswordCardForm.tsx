import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FormEvent, useState } from "react"
import LoadingButton from "../widgets/LoadingButton"
import { forgotPassword } from "@/api/authentication"
import { toast } from "sonner"


export type ResetPasswordCardFormTypes = {
    email: string | undefined
}

export function ResetPasswordCardForm({ email }: { email?: string }) {
    const [isLoading, setIsLoading] = useState(false);

    function sendPasswordResetRequest(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setIsLoading(true);
        forgotPassword({ email })
            .then((response) => {
                toast.success(response.message);
                setIsLoading(false);
            })
            .catch((error) => {
                toast.error(error.message);
                setIsLoading(false);
            })
        setIsLoading(false);
    }

    return (
        <Card className="w-full md:w-fit">
            <CardHeader>
                <CardTitle>Reset Password</CardTitle>
                <CardDescription>You will recieve an email to reset your password</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={sendPasswordResetRequest}>
                    {isLoading
                        ? <LoadingButton label="Sending request..." btnClass={"w-fit"} btnVariant={"secondary"} />
                        : <Button type="submit" className="w-fit" variant={'outline'}>{"Get Password Reset Link"}</Button>
                    }
                </form>
            </CardContent>
        </Card>
    )
}
