"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"

interface WeeklyActivityChartProps {
  data: {
    day: string
    count: number
  }[]
}

/**
 * Renders a responsive bar chart visualizing weekly activity counts by day.
 *
 * Displays each day's activity as a bar, with a custom tooltip showing the day and entry count on hover. The chart adapts to its container size and features rounded bars, horizontal grid lines, and styled axes.
 *
 * @param data - Array of objects representing days and their corresponding activity counts.
 */
export function WeeklyActivityChart({ data }: WeeklyActivityChartProps) {
  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
          <Tooltip
            cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-md">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="font-medium">{payload[0].payload.day}</div>
                      <div className="font-medium text-right">{payload[0].value} entries</div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} maxBarSize={50} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
