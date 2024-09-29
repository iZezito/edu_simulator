import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center bg-cover bg-center">
            <div className="max-w-md p-6 bg-background rounded-lg shadow-lg">
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold text-primary">Bem-vindo ao Simulados ENEM</h1>
                    <p className="text-muted-foreground">
                        Prepare-se para o ENEM com nossos simulados personalizados. Teste seus conhecimentos e identifique suas
                        áreas de melhoria.
                    </p>
                    <Link
                        to="/simulados"
                        className="inline-flex items-center justify-center h-10 px-6 rounded-md bg-primary text-primary-foreground font-medium transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                        Começar Simulados
                    </Link>
                </div>
            </div>
        </div>
    )
}
