"use client"

import { useGetSummary } from "@/features/summary/api/use-get-summary"
import { formatDateRange } from "@/lib/utils"
import { useSearchParams } from "next/navigation"
import { FaPiggyBank } from "react-icons/fa"
import { DataCard, DataCardLoading } from "./data-card"
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6"

export const DataGrid = () => {
	const { data, isLoading } = useGetSummary()

	const searchParams = useSearchParams()
	const to = searchParams.get("to") || undefined
	const from = searchParams.get("from") || undefined
	
	const dataRangeLabel = formatDateRange({ to, from })

	if (isLoading) {
		return (
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
				<DataCardLoading />
				<DataCardLoading />
				<DataCardLoading />
			</div>
		)
	}

	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
			<DataCard
				title="Remaining"
				value={data?.remainingAmount}
				percentageChange={data?.remainingChange}
				variant="default"
				icon={FaPiggyBank}
				dateRange={dataRangeLabel}
			/>
			<DataCard
				title="Income"
				value={data?.incomeAmount}
				percentageChange={data?.incomeChange}
				variant="default"
				icon={FaArrowTrendUp}
				dateRange={dataRangeLabel}
			/>
			<DataCard
				title="Expenses"
				value={data?.expensesAmount}
				percentageChange={data?.expensesChange}
				variant="default"
				icon={FaArrowTrendDown}
				dateRange={dataRangeLabel}
			/>
		</div>
	)
}
