import './App.css'
import { Outlet } from "react-router-dom"
import { Header } from "./app/components/Header"

export const App = () => {
  return (
    <div className="bg-[#f5f5f5] font-[lato] h-[100vh] overflow-hidden"> {/* set Font for all*/}
      <Header/>
      <Outlet/>
    </div>
  )
}

