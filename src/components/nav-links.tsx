import React from "react";
import { Link, useLocation } from "react-router-dom";

type NavLinksProps = {
    classe: string;
};

const NavLinks = ({ classe }: NavLinksProps) => {
    const location = useLocation(); // Obtem o pathname atual no React puro

    const linkClass = (path: string) =>
        `transition-colors hover:text-foreground min-w-fit ${
            location.pathname === path ? "text-foreground font-bold" : "text-muted-foreground"
        }`;

    return (
        <div className={classe}>
            <Link to="/" className={linkClass("/")}>
                HOME
            </Link>
            <Link to="/ofertas" className={linkClass("/ofertas")}>
                Ofertas
            </Link>
            <Link to="/ofertas/new" className={linkClass("/ofertas/new")}>
                Busca de Ofertas
            </Link>
            <Link to="/ofertas/passing" className={linkClass("/ofertas/passing")}>
                Ofertas Passando
            </Link>
        </div>
    );
};

export default NavLinks;
