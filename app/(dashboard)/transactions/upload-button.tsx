import { Upload } from "lucide-react"
import type { ButtonHTMLAttributes } from "react"
import { useCSVReader } from "react-papaparse"

import { Button } from "@/components/ui/button"
import { usePaywall } from "@/features/subscriptions/hooks/use-paywall"

export type UploadResults = {
	data: string[][]
	errors: unknown[]
	meta: Record<string, unknown>
}

type Props = {
	onUpload: (results: UploadResults) => void
}

export const UploadButton = ({ onUpload }: Props) => {
	const { CSVReader } = useCSVReader()
	const { shouldBlock, triggerPaywall } = usePaywall();

	if (shouldBlock) {
		<Button 
			size="sm"
			className="w-full lg:w-auto"
			onClick={triggerPaywall}
		>
			<Upload className="size-4 mr-2" />
			Import
		</Button>
	}

	return (
		<CSVReader onUploadAccepted={onUpload}>
			{({ getRootProps }: { getRootProps: () => ButtonHTMLAttributes<HTMLButtonElement> }) => (
				<Button 
					size="sm"
					className="w-full lg:w-auto"
					{...getRootProps()}
				>
					<Upload className="size-4 mr-2" />
					Import
				</Button>
			)}
		</CSVReader>
	)
}