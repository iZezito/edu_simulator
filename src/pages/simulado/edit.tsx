import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useService } from "@/hooks/use-service";
import { QuestaoComRespostaDTO, ResponseType, Resposta, Simulado } from "@/types";
import ContentLoader from "@/components/content-loader";
import { QuestionDisplay } from "@/components/questao-card";
import { QuestionDisplaySkeleton } from "@/components/questao-card-loader";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast";

export default function SimuladoView() {
  const navigate = useNavigate();
  const { toast, loading, removeLoading } = useToast();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) <= 0 ? 1 : Number(searchParams.get("page")) : 1;
  const { id } = useParams();
  const questaoDTOService = useService<ResponseType<QuestaoComRespostaDTO>>("questoes");
  const simuladoService = useService<Simulado>("simulados");
  const respostaService = useService<Resposta>("respostas");
  const queryClient = useQueryClient();

  const { data: simulado } = useQuery({
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
        params: { simuladoId: id, page, ano: simulado?.year, size: 1, finalizado: simulado?.finalizado },
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
    onSuccess: (_, alternative) => {
      queryClient.setQueryData<ResponseType<QuestaoComRespostaDTO>>(["questao", id, page], (oldData) => {
        if (!oldData) return oldData;
        
        
        const updatedQuestaoDTO: ResponseType<QuestaoComRespostaDTO> = {
          ...oldData,
          content: oldData.content.map((questao) => {
            if (questao.id === questaoDTO?.content[0].id) {
              return {
                ...questao,
                respostaSelecionada: {
                  ...questao.respostaSelecionada,
                  alternativaSelecionada: alternative,
                },
              };
            }
            return questao;
          }),
        };
  
        return updatedQuestaoDTO;
      });
  
      toast({
        title: "Resposta registrada",
        description: "Sua resposta foi registrada com sucesso!",
      });
    },
  });
  
  const handleAlternativeSelect = (alternative: string) => {
    const loadingId = loading("Registrando resposta...");
  
    mutation.mutate(alternative, {
      onSettled: () => {
        removeLoading(loadingId);
      },
    });
  };

  const finalizarSimulado = async () => {
    simuladoService.update(String(id), { finalizado: true }).then(() => {
      toast({
            title: "Simulado Finalizado",
            description: "Seu simulado foi finalizado com sucesso!",
          })
          navigate("/simulado");
    }).finally(() => {
      setModalVisible(false);
    });
    
    
  };

  return (
    <div className="flex flex-col items-center justify-center bg-background p-4">
      <ContentLoader
        loading={isQuestaoLoading}
        error={questaoError}
        noContent={`Questão não encontrada. Tente alguma entre 1 e ${questaoDTO?.totalPages}`}
        loadingComponent={<QuestionDisplaySkeleton />}
      >
        {questaoDTO?.content.length !== undefined && questaoDTO?.content.length > 0 && (
          <QuestionDisplay
            questao={questaoDTO.content[0]}
            currentQuestionNumber={page}
            onAlternativeSelect={handleAlternativeSelect}
            isFinished={simulado?.finalizado}
            isResponding={respostaService.isPending}
            totalQuestions={questaoDTO.totalPages}
          />
        )}
      </ContentLoader>
      <Button onClick={() => setModalVisible(true)} className="mt-4">Finalizar Simulado</Button>
      <Dialog open={modalVisible} onOpenChange={setModalVisible}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Finalizar Simulado</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja finalizar o simulado?
              {simulado?.respostas !== undefined && simulado?.respostas?.length < 180 && (
                <p className="text-red-500 font-bold mt-2">Atenção: Você não respondeu todas as questões.</p>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalVisible(false)}>Cancelar</Button>
            <Button onClick={finalizarSimulado} disabled={simuladoService.isPending}>{simuladoService.isPending ? 'Finalizando...' : 'Finalizar'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}