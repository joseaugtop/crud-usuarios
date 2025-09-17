import { createRootRoute, Link, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"

const RootLayout = () => (
  <>
    <div className="flex flex-col min-h-screen">
      <div className="p-9 flex gap-2 bg-white text-2xl">
        <div className="flex gap-6">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>{" "}
          <Link to="/users" className="[&.active]:font-bold">
            Usuários
          </Link>
        </div>
      </div>
      <hr />
      <div className="flex-grow overflow-auto">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </div>
  </>
)

export const Route = createRootRoute({ component: RootLayout })
