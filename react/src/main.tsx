import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
// import { createRoot } from "react-dom/client"
import "./index.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RouterProvider, createRouter } from "@tanstack/react-router"

// Import the generated route tree
import { routeTree } from "./routeTree.gen"

//Instanciando a nova rota
const router = createRouter({ routeTree })

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

const queryClient = new QueryClient() //<- Instaciando o cliente

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <QueryClientProvider client={queryClient}>
//       <div className="min-h-screen bg-indigo-900">
//         <main>
//           <App />
//         </main>
//       </div>
//     </QueryClientProvider>
//   </StrictMode>
// )

const rootElement = document.getElementById("root")!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-indigo-900">
          <main>
            <RouterProvider router={router} />
          </main>
        </div>
      </QueryClientProvider>
    </StrictMode>
  )
}
