import { Footer, Header } from "@/components"
import { ReactElement } from "react"

interface LayoutProps {
  Pages: () => ReactElement;
}

const MainLayout = ({ Pages }: LayoutProps) => {
  return (
    <div>
      <Header />
      <Pages />
      <Footer />
    </div>
  )
}

export default MainLayout