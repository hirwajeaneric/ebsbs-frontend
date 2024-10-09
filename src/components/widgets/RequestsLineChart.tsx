"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { getMonthName } from "@/lib/months"

export const description = "A line chart with a label"

const chartConfig = {
    desktop: {
        label: "Requests",
        color: "hsl(var(--chart-1))",
    }
} satisfies ChartConfig

type Props = {
    filterYear: number,
    filterMonth: number,
    data: { day: string; request: number; }[] | { day: string; request: number; }[]
}

export default function RequestsLineChart({ filterYear, filterMonth, data }: Props) {
    console.log(data);
    return (
        <Card className="">
            <CardHeader>
                <CardTitle>Blood Requests</CardTitle>
                {/* <CardDescription>{filterYear} -s From January to {getMonthName(filterMonth)}</CardDescription> */}
            </CardHeader>
            <CardContent>
                <ChartContainer className="h-60 w-full" config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={data}
                        margin={{
                            top: 20,
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={true} />
                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Line
                            dataKey="request"
                            type="bump"
                            // type="linear"
                            stroke="var(--color-desktop)"
                            strokeWidth={2}
                            dot={{
                                fill: "var(--color-desktop)",
                            }}
                            activeDot={{
                                r: 6,
                            }}
                        >
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Line>
                    </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Blood Requests in {getMonthName(filterMonth+1)} - {filterYear}<TrendingUp className="h-4 w-4" />
                </div>
                {/* <div className="leading-none text-muted-foreground">
                    Showing total blood requests in the last 12 months
                </div> */}
            </CardFooter>
        </Card>
    )
}
