import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { useState } from "react"
import LoadingButton from "../widgets/LoadingButton"
import { toast } from "sonner"
import { updateBloodBank } from "@/api/bloodBank"

const FormSchema = z.object({
    id: z.string(),
    name: z.string().min(3, { message: "Name must be at least 3 characters." }),
    googleLocation: z.string().min(3, { message: "Google location must be at least 3 characters." }),
    province: z.string().min(3, { message: "Province must be at least 3 characters." }),
    town: z.string().min(3, { message: "Town must be at least 3 characters." }),
    email: z.string().min(3, { message: "Email must be provided" }),
    phone: z.string().min(3, { message: "Phone must be provided" }),
    POBox: z.string().min(3, { message: "POBox must be provided" }),
})

export type BloodBankDataTypes = z.infer<typeof FormSchema>

export default function SettingsForm({ bloodBank }: { bloodBank?: BloodBankDataTypes }) {
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<BloodBankDataTypes>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            id: bloodBank?.id || "",
            name: bloodBank?.name || "",
            googleLocation: bloodBank?.googleLocation || "",
            province: bloodBank?.province || "",
            town: bloodBank?.town || "",
            email: bloodBank?.email || "",
            phone: bloodBank?.phone || "",
            POBox: bloodBank?.POBox || ""
        },
    })

    function onSubmit(data: BloodBankDataTypes) {
        setIsLoading(true);
        if (bloodBank?.id) {
            updateBloodBank(bloodBank.id, data)
                .then((response) => {
                    toast.success(response.message);
                    setIsLoading(false);
                    window.location.reload();
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
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Blood Bank Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Name" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="w-full flex flex-wrap space-y-4 items-start md:space-y-0 justify-between">
                    <FormField
                        control={form.control}
                        name="googleLocation"
                        render={({ field }) => (
                            <FormItem className="w-full md:w-[49%]">
                                <FormLabel>Google Maps Location</FormLabel>
                                <FormControl>
                                    <Input placeholder="Google Location" type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="province"
                        render={({ field }) => (
                            <FormItem className="w-full md:w-[49%]">
                                <FormLabel>Province</FormLabel>
                                <FormControl>
                                    <Input placeholder="Province" type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="w-full flex flex-wrap space-y-4 md:space-y-0 items-start justify-between">
                    <FormField
                        control={form.control}
                        name="town"
                        render={({ field }) => (
                            <FormItem className="w-full md:w-[49%]">
                                <FormLabel>Town</FormLabel>
                                <FormControl>
                                    <Input placeholder="town" type="text" {...field} />
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
                                    <Input placeholder="Your phone number" type="tel" maxLength={10} minLength={10} {...field} />
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
                                <FormLabel>Contact Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email" type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="POBox"
                        render={({ field }) => (
                            <FormItem className="w-full md:w-[49%]">
                                <FormLabel>Postal Box</FormLabel>
                                <FormControl>
                                    <Input placeholder="Postal box" type="tel" maxLength={10} minLength={10} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex mt-8 justify-between items-center w-full">
                    {isLoading
                        ? <LoadingButton label="Submitting..." btnClass={"w-fit"} btnVariant={"default"} />
                        : <Button type="submit">{bloodBank?.id ? "Confirm changes" : "Submit"}</Button>
                    }
                </div>
            </form>
        </Form>
    )
}
