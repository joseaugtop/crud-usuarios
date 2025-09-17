import { createFileRoute } from "@tanstack/react-router"
import Users from "../pages/Users"

export const Route = createFileRoute("/users")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className=" bg-indigo-900">
      <Users />
    </div>
  )
}
