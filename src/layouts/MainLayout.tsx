import { Header } from "@/components"
import { ReactElement } from "react"

interface LayoutProps {
  Pages: () => ReactElement;
}

const MainLayout = ({ Pages }: LayoutProps) => {
  return (
    <div>
      <Header />
      <Pages />
    </div>
  )
}

export default MainLayout