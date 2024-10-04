import { Bar, BarChart, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Configuração do gráfico
const chartConfig = {
  acertos: {
    label: "Acertos",
    color: "hsl(var(--chart-1))",
  },
  erros: {
    label: "Erros",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

// Componente reutilizável
interface BarChartAcertosProps {
  data: { area: string; acertos: number; erros: number }[]
}

export function BarChartAcertos({ data }: BarChartAcertosProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tooltip - Line Indicator</CardTitle>
        <CardDescription>Tooltip with line indicator.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <XAxis
              dataKey="area"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <Bar
              dataKey="acertos"
              stackId="a"
              fill="hsl(var(--chart-1))"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="erros"
              stackId="a"
              fill="hsl(var(--chart-2))"
              radius={[4, 4, 0, 0]}
            />
            <ChartTooltip
              content={<ChartTooltipContent indicator="line" />}
              cursor={false}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

// import { Bar, BarChart, XAxis } from "recharts"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart"
// export const description = "A stacked bar chart with a legend"
// const chartData = [
//   { area: "matemática", acertos: 25, erros: 20 },
//   { area: "ciencias", acertos: 25, erros: 20 },
//   { area: "humanas", acertos: 25, erros: 20 },
//   { area: "linguagens", acertos: 20, erros: 25 },
// ]
// const chartConfig = {
//   acertos: {
//     label: "Acertos",
//     color: "hsl(var(--chart-1))",
//   },
//   erros: {
//     label: "Erros",
//     color: "hsl(var(--chart-2))",
//   },
// } satisfies ChartConfig
// export function BarChartAcertos() {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Tooltip - Line Indicator</CardTitle>
//         <CardDescription>Tooltip with line indicator.</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer config={chartConfig}>
//           <BarChart accessibilityLayer data={chartData}>
//             <XAxis
//               dataKey="area"
//               tickLine={false}
//               tickMargin={10}
//               axisLine={false}
//             />
//             <Bar
//               dataKey="acertos"
//               stackId="a"
//               fill="hsl(var(--chart-1))"
//               radius={[0, 0, 4, 4]}
//             />
//             <Bar
//               dataKey="erros"
//               stackId="a"
//               fill="hsl(var(--chart-2))"
//               radius={[4, 4, 0, 0]}
//             />
//             <ChartTooltip
//               content={<ChartTooltipContent indicator="line" />}
//               cursor={false}
//             />
//           </BarChart>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//   )
// }