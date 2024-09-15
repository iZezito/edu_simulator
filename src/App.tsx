import './App.css'
import Routes from "@/routes/routes.tsx";
import Navbar from "@/components/navbar.tsx";

function App() {

  return (
      <div className="flex min-h-screen w-full flex-col">
          <header className="sticky top-0 flex h-16 items-center  gap-4 border-b bg-background px-4 md:px-6 z-10">
              <Navbar/>
          </header>
          <Routes/>
      </div>
)
}

export default App
