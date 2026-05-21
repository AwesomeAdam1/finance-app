"use client"

import { Button } from "@/components/ui/button"
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card"
import { SelectSeparator } from "@/components/ui/select"
import { cn } from "@/lib/utils"

export const SettingsCard = () => {
	const connectedBank = null

	return (
		<Card className="border-none drop-shadow-sm">
			<CardHeader>
				<CardTitle className="text-xl line-clamp-1">
					Settings
				</CardTitle>
			</CardHeader>
			<CardContent>
				<SelectSeparator />
				<div className="flex flex-col gapy-y-2 lg:flex-row items-center py-4">
					<p className="text-sm font-medium w-full lg:w-[16.5rem]">
						Bank account
					</p>
					<div className="w-full flex items-center justify-between">
						<div className={cn(
							"text-sm truncate flex items-center",
							!connectedBank && "text-muted-foreground"
						)}>
							{
								connectedBank ? "Bank account connected" : "No bank account connected"
							}
						</div>
						<Button size="sm" variant="ghost">
							Connect
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}