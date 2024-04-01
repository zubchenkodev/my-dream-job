import { Outlet } from "react-router-dom"
import { Bottombar, Sidebar, Topbar} from "../../components"

const RootLayout = () => {
  return (
    <div className="w-full">
      <Topbar/>
      <div className="lg:container lg:grid grid-cols-[300px,1fr] h-screen lg:px-8 mx-auto">
        <Sidebar/>
        <section className="h-full w-full overflow-y-auto pb-[85px] lg:pb-0 bg-bgLight">
          <Outlet />
        </section>
      </div>
      <Bottombar/>
    </div>
  )
}

export default RootLayout