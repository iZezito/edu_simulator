import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useService } from "@/hooks/use-service";
import { QuestaoComRespostaDTO, ResponseType, Simulado } from "@/types";
import { useParams, useSearchParams } from "react-router-dom";
import ContentLoader from "@/components/content-loader";
import { QuestionDisplay } from "@/components/questao-card";
import { QuestionDisplaySkeleton } from "@/components/questao-card-loader";
import { CustomPagination } from "@/components/ui/custom-pagination";

export default function SimuladoView() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const { id } = useParams();
  const questaoDTOService =
    useService<ResponseType<QuestaoComRespostaDTO>>("questoes");
  const simuladoService = useService<Simulado>("simulados");

  useEffect(() => {
    const loadData = async () => {
      const simulado = await simuladoService.get(id);
      console.log(simulado);
      await questaoDTOService.get(undefined, {
        params: { simuladoId: id, page, ano: simulado.year, size: 1 },
      });
    };
    loadData();
  }, [id, page]);

  const handleAlternativeSelect = (alternative:number) => {
    console.log(alternative);
  };

  // const query = useQuery({ queryKey: ['todos'], queryFn:  })

  return (
    <div className="flex flex-col items-center justify-center bg-background p-4">
      <ContentLoader
        loading={questaoDTOService.isPending}
        error={questaoDTOService.error}
        noContent={"sem dados"}
        loadingComponent={<QuestionDisplaySkeleton/>}
      >
        <>
        {questaoDTOService.data.object && (
            
            <QuestionDisplay
            questao={questaoDTOService.data?.object?.content[0]}
            currentQuestionNumber={page}
            onAlternativeSelect={handleAlternativeSelect}
            isFinished={simuladoService.data.object?.finalizado}
            totalQuestions={questaoDTOService.data.object.totalPages}
          />
        ) }
        </>
        
      </ContentLoader>
    </div>
  );
}
