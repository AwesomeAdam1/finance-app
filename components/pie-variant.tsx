import { formatPercentage } from "@/lib/utils"
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { CategoryTooltip } from "./category-tooltip"

const colors = ["#0062FF", "#12C6FF", "#FF647F", "#FF9354"]

type Props = {
	data: {
		name: string
		value: number
	}[]
}

type LegendPayload = {
	color?: string
	value?: string | number
}

export const PieVariant = ({ data }: Props) => {
	const total = data.reduce((sum, item) => sum + item.value, 0)

	return (
		<ResponsiveContainer width="100%" height={350}>
			<PieChart>
			<Legend
				layout="horizontal"
				verticalAlign="bottom" 
				align="right"
				iconType="circle"
				content={({ payload }: { payload?: readonly LegendPayload[] }) => {
					return (
					<ul className="flex flex-col space-y-2">
						{payload?.map((entry, index) => {
							const value = data[index]?.value ?? 0
							const percentage = total > 0 ? (value / total) * 100 : 0

							return (
							<li 
								key={`item-${index}`}
								className="flex items-center space-x-2"
							>
								<span
								className="size-2 rounded-full"
								style={{ backgroundColor: entry.color }}
								/>
								<div className="space-x-1">
								<span className="text-sm text-muted-foreground">
									{entry.value}
								</span>
								<span className="text-sm">
									{formatPercentage(percentage)}
								</span>
								</div>
							</li>
							)
						})}
					</ul>
					)
				}}
				/>
				<Tooltip content={<CategoryTooltip />} />
				<Pie
					data={data}
					cx="50%"
					cy="50%"
					outerRadius={100}
					innerRadius={60}
					paddingAngle={2}
					fill="#8884d8"
					dataKey="value"
					labelLine={false}
				>
					{data.map((_entry, index) => (
						<Cell
							key={`cell-${index}`} 
							fill={colors[index % colors.length]} 
						/>
					))}
				</Pie>
			</PieChart>
		</ResponsiveContainer>
	)
}