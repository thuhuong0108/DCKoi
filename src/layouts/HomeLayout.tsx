import { Header } from "@/components"
import { Home } from "@/pages"
import { useRoutes } from "react-router-dom"

const HomeLayout = () => {
    const elements = useRoutes([
        {path: "", element: <Home />},
    ])

  return (
    <div>
        <Header />
        {elements}
    </div>
  )
}

export default HomeLayout
