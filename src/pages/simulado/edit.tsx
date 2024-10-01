import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useService } from "@/hooks/use-service";
import { QuestaoComRespostaDTO, ResponseType, Resposta, Simulado } from "@/types";
import ContentLoader from "@/components/content-loader";
import { QuestionDisplay } from "@/components/questao-card";
import { QuestionDisplaySkeleton } from "@/components/questao-card-loader";

export default function SimuladoView() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const { id } = useParams();
  const questaoDTOService = useService<ResponseType<QuestaoComRespostaDTO>>("questoes");
  const simuladoService = useService<Simulado>("simulados");
  const respostaService = useService<Resposta>("respostas");
  const queryClient = useQueryClient();

  const { data: simulado, isLoading: isSimuladoLoading } = useQuery({
    queryKey: ["simulado", id],
    queryFn: () => simuladoService.get(id),
    enabled: !!id,
  });

  const {
    data: questaoDTO,
    isLoading: isQuestaoLoading,
    error: questaoError,
  } = useQuery({
    queryKey: ["questao", id, page],
    queryFn: () =>
      questaoDTOService.get(undefined, {
        params: { simuladoId: id, page, ano: simulado?.year, size: 1 },
      }),
    enabled: !!simulado,
  });

  const mutation = useMutation({
    mutationFn: (alternative: string) => {
      const questao = questaoDTO?.content[0];
      return respostaService.create({
        id: questao?.respostaSelecionada ? questao?.respostaSelecionada.id : undefined,
        usuario: { id: simulado?.usuario.id },
        questao: { id: questao?.id },
        simulado: { id: Number(id) },
        alternativaSelecionada: alternative,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questao", id, page] });
    },
  });

  const handleAlternativeSelect = (alternative: string) => {
    mutation.mutate(alternative);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-background p-4">
      <ContentLoader
        loading={isQuestaoLoading}
        error={questaoError}
        noContent={"sem dados"}
        loadingComponent={<QuestionDisplaySkeleton />}
      >
        {questaoDTO && (
          <QuestionDisplay
            questao={questaoDTO.content[0]}
            currentQuestionNumber={page}
            onAlternativeSelect={handleAlternativeSelect}
            isFinished={simulado?.finalizado}
            totalQuestions={questaoDTO.totalPages}
          />
        )}
      </ContentLoader>
    </div>
  );
}






// versao com o cache de paginaçao, porém está bugado

// import React from "react";
// import { useParams, useSearchParams } from "react-router-dom";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { useService } from "@/hooks/use-service";
// import { QuestaoComRespostaDTO, ResponseType, Resposta, Simulado } from "@/types";
// import ContentLoader from "@/components/content-loader";
// import { QuestionDisplay } from "@/components/questao-card";
// import { QuestionDisplaySkeleton } from "@/components/questao-card-loader";

// export default function SimuladoView() {
//   const [searchParams] = useSearchParams();
//   const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
//   const { id } = useParams();
//   const questaoDTOService = useService<ResponseType<QuestaoComRespostaDTO>>("questoes");
//   const simuladoService = useService<Simulado>("simulados");
//   const respostaService = useService<Resposta>("respostas");
//   const queryClient = useQueryClient();

//   const { data: simulado, isLoading: isSimuladoLoading } = useQuery({
//     queryKey: ["simulado", id],
//     queryFn: () => simuladoService.get(id),
//     enabled: !!id,
//   });

//   const {
//     data: questaoDTO,
//     isLoading: isQuestaoLoading,
//     error: questaoError,
//   } = useQuery({
//     queryKey: ["questao", id, page],
//     queryFn: () =>
//       questaoDTOService.get(undefined, {
//         params: { simuladoId: id, page, ano: simulado?.year, size: 1 },
//       }),
//     enabled: !!simulado,
//   });

//   const mutation = useMutation({
//     mutationFn: (alternative: string) => {
//       const questao = questaoDTO?.content[0];
//       return respostaService.create({
//         id: questao?.respostaSelecionada ? questao?.respostaSelecionada.id : undefined,
//         usuario: { id: simulado?.usuario.id },
//         questao: { id: questao?.id },
//         simulado: { id: Number(id) },
//         alternativaSelecionada: alternative,
//       });
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["questao", id, page] });
//     },
//   });

//   const handleAlternativeSelect = (alternative: string) => {
//     mutation.mutate(alternative);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center bg-background p-4">
//       <ContentLoader
//         loading={isQuestaoLoading}
//         error={questaoError}
//         noContent={"sem dados"}
//         loadingComponent={<QuestionDisplaySkeleton />}
//       >
//         {questaoDTO && (
//           <QuestionDisplay
//             questao={questaoDTO.content[0]}
//             currentQuestionNumber={page}
//             onAlternativeSelect={handleAlternativeSelect}
//             isFinished={simulado?.finalizado}
//             totalQuestions={questaoDTO.totalPages}
//           />
//         )}
//       </ContentLoader>
//     </div>
//   );
// }


// versao sem o cache de paginaçao

// import React, { useEffect, useState } from "react";
// import { useService } from "@/hooks/use-service";
// import { QuestaoComRespostaDTO, ResponseType, Resposta, Simulado } from "@/types";
// import { useParams, useSearchParams } from "react-router-dom";
// import ContentLoader from "@/components/content-loader";
// import { QuestionDisplay } from "@/components/questao-card";
// import { QuestionDisplaySkeleton } from "@/components/questao-card-loader";

// export default function SimuladoView() {
//   const [searchParams] = useSearchParams();
//   const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
//   const { id } = useParams();
//   const questaoDTOService = useService<ResponseType<QuestaoComRespostaDTO>>("questoes");
//   const simuladoService = useService<Simulado>("simulados");
//   const respostaService = useService<Resposta>("respostas");
//   const [simuladoLoaded, setSimuladoLoaded] = useState(false);

//   useEffect(() => {
//     const loadSimulado = async () => {
//       if (!simuladoLoaded) {
//         const simulado = await simuladoService.get(id);
//         console.log(simulado);
//         setSimuladoLoaded(true);
//       }
//     };
//     loadSimulado();
//   }, [id, simuladoLoaded]);

  
//   useEffect(() => {
//     const loadQuestao = async () => {
//       const simulado = simuladoService.data?.object;
//       if (simulado) {
//         const questao = await questaoDTOService.get(undefined, {
//           params: { simuladoId: id, page, ano: simulado.year, size: 1 },
//         });
//         console.log(questao);
//       }
//     };
//     loadQuestao();
//   }, [page, id, simuladoService.data]);

//   const handleAlternativeSelect = (alternative: string) => {
//     const questao = questaoDTOService.data.object?.content[0];
//     respostaService.create({
//       id: questao?.respostaSelecionada ? questao?.respostaSelecionada.id : undefined,
//       usuario: { id: simuladoService.data.object?.usuario.id },
//       questao: { id: questao?.id },
//       simulado: { id: Number(id) },
//       alternativaSelecionada: alternative,
//     });
//   };

//   return (
//     <div className="flex flex-col items-center justify-center bg-background p-4">
//       <ContentLoader
//         loading={questaoDTOService.isPending}
//         error={questaoDTOService.error}
//         noContent={"sem dados"}
//         loadingComponent={<QuestionDisplaySkeleton />}
//       >
//         {questaoDTOService.data.object && (
//           <QuestionDisplay
//             questao={questaoDTOService.data?.object?.content[0]}
//             currentQuestionNumber={page}
//             onAlternativeSelect={handleAlternativeSelect}
//             isFinished={simuladoService.data.object?.finalizado}
//             totalQuestions={questaoDTOService.data.object.totalPages}
//           />
//         )}
//       </ContentLoader>
//     </div>
//   );
// }