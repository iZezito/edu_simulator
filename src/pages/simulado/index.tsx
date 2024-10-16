import { useService } from "@/hooks/use-service";
import { useEffect, useMemo } from "react";
import { Simulado } from "@/types";
import SimuladoCard from "@/components/simulado-card";
import { useNavigate } from "react-router-dom";
import ContentLoader from "@/components/content-loader";
import SimuladoCardSkeleton from "@/components/simulado-card-loader";

export default function SimuladoPage() {
  const navigate = useNavigate();

  const { data, isPending, error, getAll} = useService<Simulado>('simulados');

  useEffect(() => {
    getAll()
  }, [getAll]);

  const handleClick = (id: number | string) => {
    navigate(`/simulado/${id}`);
  }

  const finalizados = useMemo(() => {
    return data?.list?.filter((simulado: Simulado)  =>  simulado.finalizado).length;
  }, [data]);

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4 md:px-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Simulados</h1>
        <div className="flex items-center gap-2">
          <ClipboardCheckIcon className="w-5 h-5 text-muted-foreground" />
          <span className="text-muted-foreground">{finalizados} de {data.list?.length} simulados concluídos</span>
        </div>
      </div>
      <div className="w-full bg-muted rounded-lg overflow-hidden">
        <div className="h-2 bg-primary" style={{ width: `${((finalizados|| 0) /15 * 100)}%` }} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        <ContentLoader error={error} loading={isPending} noContent={'Dados vazios!'} loadingComponent={<SimuladoCardSkeleton />} repeat={15}>
                {data.list && (
            data.list.map((resposta) => (
              <SimuladoCard key={resposta.id} simulado={resposta} handleClick={handleClick}/>
            ))
          )}
        </ContentLoader>
      </div>
      
    </div>
  )
}

function ClipboardCheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="m9 14 2 2 4-4" />
    </svg>
  )
}