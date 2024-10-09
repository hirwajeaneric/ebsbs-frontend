import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { addNewUser, updateUser } from "@/api/authentication"
import LoadingButton from "../widgets/LoadingButton"
import { toast } from "sonner"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"

const FormSchema = z.object({
    firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
    lastName: z.string().min(2, { message: "Last name must be at least 2 characters.", }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z.string().min(10, { message: "Phone number must be at least 10 characters." }),
    accountStatus: z.enum(["Active", "Inactive"], { message: "Please select an account status." }),
    id: z.string().optional(),
    role: z.enum(["Hospital Worker", "Hospital Admin"]),
    hospitalId: z.string(),
    hospitalName: z.string().optional()
})

export type HospitalUserDataTypes = z.infer<typeof FormSchema>

export default function ManageHospitalUserForm({ user }: { user?: HospitalUserDataTypes }) {
    const [isLoading, setIsLoading] = useState(false);
    const hospitalId = JSON.parse(localStorage.getItem("hospitalAdmin") as string).hospitalId;
    const navigate = useNavigate();

    const form = useForm<HospitalUserDataTypes>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            email: user?.email || "",
            phone: user?.phone || "",
            accountStatus: user?.accountStatus || "Active",
            id: user?.id || "",
            role: user?.role || "Hospital Worker",
            hospitalId: user?.hospitalId || hospitalId,
        },
    })

    function onSubmit(data: HospitalUserDataTypes) {
        setIsLoading(true);
        if (user?.id) {
            updateUser(user.id, data)
                .then((response) => {
                    form.setValue("accountStatus", response.user.accountStatus);
                    toast.success(response.message);
                    setIsLoading(false);
                    navigate(`/hdash/${hospitalId}/a/users`);
                })
                .catch((error) => {
                    setIsLoading(false);
                    toast.error(error.message);
                    console.log(error);
                })
        } else {
            addNewUser(data)
                .then((response) => {
                    form.reset();
                    toast.success(response.message);
                    setIsLoading(false);
                    navigate(`/hdash/${hospitalId}/a/users`);
                })
                .catch((error) => {
                    setIsLoading(false);
                    toast.error(error.message);
                    console.log(error);
                })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                <div className="w-full flex flex-wrap space-y-4 items-start md:space-y-0 justify-between">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem className="w-full md:w-[49%]">
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your first name" type="text" disabled={user?.id ? true : false} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem className="w-full md:w-[49%]">
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your last name" type="text" disabled={user?.id ? true : false} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="w-full flex flex-wrap space-y-4 md:space-y-0 items-start justify-between">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="w-full md:w-[49%]">
                                <FormLabel>Email address</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your email address" type="email" disabled={user?.id ? true : false} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem className="w-full md:w-[49%]">
                                <FormLabel>Phone number</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your phone number" type="tel" maxLength={10} minLength={10} disabled={user?.id ? true : false} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                {user?.id && <FormField
                    control={form.control}
                    name="accountStatus"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>Change Account Status</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex space-y-1"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="Active" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Active
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="Inactive" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Inactive
                                        </FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />}

                <div className="flex mt-8 justify-between items-center w-full">
                    {isLoading
                        ? <LoadingButton label="Submitting..." btnClass={"w-fit"} btnVariant={"default"} />
                        : <Button type="submit">{user?.id ? "Confirm changes" : "Submit"}</Button>
                    }
                </div>
            </form>
        </Form>
    )
}
