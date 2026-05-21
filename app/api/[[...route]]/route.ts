import { Hono } from "hono"

import summary from "./summary"
import accounts from "./accounts"
import categories from "./categories"
import transactions from "./transactions"

export const runtime = "edge"

const app = new Hono()
  .basePath('/api')
  .route("/summary", summary)
  .route("/accounts", accounts)
  .route("/categories", categories)
  .route("/transactions", transactions)

export const GET = (req: Request) => app.fetch(req)
export const POST = (req: Request) => app.fetch(req)
export const PATCH = (req: Request) => app.fetch(req)
export const DELETE = (req: Request) => app.fetch(req)

export type AppType = typeof app;