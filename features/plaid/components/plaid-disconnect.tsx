"use client"

import { Button } from "@/components/ui/button"
import { useDeleteConnectedBank } from "../api/use-delete-connected-bank"
import { useConfirm } from "@/hooks/use-confirm"

export const PlaidDisconnect = () => {
	const [ConfirmationDialog, confirm] = useConfirm("Are you sure", "You are about to disconnect your bank account.")
	const deleteConnectedBank = useDeleteConnectedBank()

	const onClick = async () => {
		const ok = await confirm()

		if (ok) {
			deleteConnectedBank.mutate()
		}
	}

	return (
		<>
			<ConfirmationDialog />
			<Button onClick={onClick} disabled={deleteConnectedBank.isPending} size="sm" variant="ghost">
				Disconnect
			</Button>
		</>
	)
}