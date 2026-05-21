import { Upload } from "lucide-react"
import type { ButtonHTMLAttributes } from "react"
import { useCSVReader } from "react-papaparse"

import { Button } from "@/components/ui/button"

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