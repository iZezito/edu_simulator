import { Link, useLocation } from "react-router-dom";

type NavLinksProps = {
    classe: string;
};

const NavLinks = ({ classe }: NavLinksProps) => {
    const location = useLocation();

    const linkClass = (path: string) =>
        `transition-colors hover:text-foreground min-w-fit ${
            location.pathname === path ? "text-foreground font-bold" : "text-muted-foreground"
        }`;

    return (
        <div className={classe}>
            <Link to="/" className={linkClass("/")}>
                Início
            </Link>
            <Link to="/simulado" className={linkClass("/simulado")}>
                Simulado
            </Link>
            <Link to="/sobre" className={linkClass("/sobre")}>
                Sobre
            </Link>
        </div>
    );
};

export default NavLinks;
