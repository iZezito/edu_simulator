import React from "react";
import { Fingerprint, MenuIcon} from "lucide-react";
import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle.tsx";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import NavLinks from "./nav-links";
import LoginBadge from "@/components/login-badge";
import { useAuth } from "@/contexts/AuthContext.tsx";

const Navbar: React.FC = () => {
    const { isAuthenticated} = useAuth();

    return (
        <nav className="flex flex-col gap-6 text-lg font-medium md:flex md:flex-row md:min-w-full md:items-center md:justify-between md:gap-5 md:text-sm lg:gap-6">
            <div className="flex items-center w-full">
                <Link to="#" className="flex items-center gap-2 text-lg font-semibold md:text-base">
                    <Fingerprint className="h-6 w-6 text-green-500" />
                    <span className="sr-only">Wallace Gabriel - Edu Simulator</span>
                </Link>

                <NavLinks classe="hidden md:flex gap-4" />


                <div className="hidden md:flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <LoginBadge isAuthenticated={isAuthenticated} />
                    <ModeToggle />
                </div>

                {/* Menu Mobile */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="md:hidden">
                            <MenuIcon className="h-6 w-6" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <div className="grid w-[200px] p-4 gap-2">
                            <Link to="/" className={"/"}>
                                HOME
                            </Link>
                            <Link to="/ofertas" className={"/ofertas"}>
                                Ofertas
                            </Link>
                            <Link to="/ofertas/new" className={"/ofertas/new"}>
                                Busca de Ofertas
                            </Link>
                            <Link to="/ofertas/passing" className={"/ofertas/passing"}>
                                Ofertas Passando
                            </Link>
                        </div>
                        <LoginBadge isAuthenticated={isAuthenticated}/>
                        <ModeToggle />
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    );
};

export default Navbar;
