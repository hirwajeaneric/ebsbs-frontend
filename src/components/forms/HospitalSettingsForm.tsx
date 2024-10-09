import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { useState } from "react"
import LoadingButton from "../widgets/LoadingButton"
import { toast } from "sonner"
import { updateHospital } from "@/api/hospital"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"

export const FormSchema = z.object({
    googleLocation: z.string().refine((val) => /^-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?$/.test(val), {
        message: "Invalid coordinates format",
    }),
    hospitalType: z.enum(["Private", "Public"]),
    id: z.string(),
    name: z.string(),
    province: z.string(),
    specialization: z.string(),
    town: z.string(),
});

export type HospitalDataTypes = z.infer<typeof FormSchema>

export default function HospitalSettingsForm({ hospital }: { hospital?: HospitalDataTypes }) {
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<HospitalDataTypes>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: hospital?.name || "",
            googleLocation: hospital?.googleLocation || "",
            province: hospital?.province || "",
            town: hospital?.town || "",
            hospitalType: hospital?.hospitalType || "Private",
            specialization: hospital?.specialization || "",
            id: hospital?.id || "",
        }
    })

    function onSubmit(data: HospitalDataTypes) {
        setIsLoading(true);
        if (hospital?.id) {
            updateHospital(hospital.id, data)
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
                        name="specialization"
                        render={({ field }) => (
                            <FormItem className="w-full md:w-[49%]">
                                <FormLabel>Specialization</FormLabel>
                                <FormControl>
                                    <Input placeholder="What is your specialization" type="tel" maxLength={10} minLength={10} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="w-full flex flex-wrap space-y-4 md:space-y-0 items-start justify-between">
                    <FormField
                        control={form.control}
                        name="hospitalType"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>Hospital Type</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Public" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Public
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Private" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Private
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex mt-8 justify-between items-center w-full">
                    {isLoading
                        ? <LoadingButton label="Submitting..." btnClass={"w-fit"} btnVariant={"default"} />
                        : <Button type="submit">{hospital?.id ? "Confirm changes" : "Submit"}</Button>
                    }
                </div>
            </form>
        </Form>
    )
}
