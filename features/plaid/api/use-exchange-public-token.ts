import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query"
 
import { client } from "@/lib/hono"

type ResponseType = InferResponseType<typeof client.api.plaid["exchange-public-token"]["$post"], 200>
type RequestType = InferRequestType<typeof client.api.plaid["exchange-public-token"]["$post"]>["json"]
	
export const useExchangePublicToken = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation<
		ResponseType,
		Error,
		RequestType
	>({
		mutationFn: async (json) => {
			const response = await client.api.plaid["exchange-public-token"].$post({ json })

			if (!response.ok) {
				throw new Error("Failed to exchange public token")
			}

			return await response.json() as ResponseType
		},
		onSuccess: () => {
			toast.success("Public token exchanged")
			queryClient.invalidateQueries({ queryKey: ["connected-bank"]})
			queryClient.invalidateQueries({ queryKey: ["accounts"]})
			queryClient.invalidateQueries({ queryKey: ["transactions"]})
			queryClient.invalidateQueries({ queryKey: ["categories"]})
			queryClient.invalidateQueries({ queryKey: ["summary"]})
		},
		onError: (e) => {
			toast.error("Failed to exchange public token")
		}
	})

	return mutation
}