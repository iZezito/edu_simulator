import { MouseEvent, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ClipboardCheckIcon, TrophyIcon } from '@/components/icons';
import { Simulado } from '@/types';
import { cn } from "@/lib/utils";
import { RadialChart } from './radial-chart';
import { BarChartAcertos } from './bar-chart';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"



interface SimuladoCardProps {
  simulado: Simulado;
  handleClick: (id: number | string) => void;
}

const SimuladoCard: React.FC<SimuladoCardProps> = ({ simulado, handleClick }) => {

  const [open, setOpen] = useState<boolean>(false);

  const click = () => {
    handleClick(simulado.id);
  };

  const calculatePercentage = (simulado: Simulado) => {
    const { pontuacaoCienciasNatureza, pontuacaoHumanas, pontuacaoLinguagens, pontuacaoMatematica } = simulado;
    const total  = pontuacaoCienciasNatureza + pontuacaoHumanas + pontuacaoLinguagens + pontuacaoMatematica;
    const corrects = Math.round((total / 4000) * 180);
    const percentage = Math.round(corrects / 180 * 100) + '%';
    return percentage;
  }

  const handleShow = (e: MouseEvent<HTMLDivElement>) => {
    if (!simulado.finalizado) return
    e.stopPropagation();
    setOpen(!open);
  };

  const handleAcertosTotal = () => {
    const { pontuacaoCienciasNatureza, pontuacaoHumanas, pontuacaoLinguagens, pontuacaoMatematica } = simulado;
    const total = pontuacaoCienciasNatureza + pontuacaoHumanas + pontuacaoLinguagens + pontuacaoMatematica;
    return Math.round((total/4000) * 180);
  };

  const handleAcertosArea = (area: string) => {
    const  { pontuacaoCienciasNatureza, pontuacaoHumanas, pontuacaoLinguagens, pontuacaoMatematica } = simulado;
    switch (area) {
      case 'ciencias':
        return Math.round((pontuacaoCienciasNatureza/ 1000) * 45);
      case 'humanas':
        return Math.round((pontuacaoHumanas/ 1000) * 45);
      case 'linguagens':
        return Math.round((pontuacaoLinguagens/ 1000) * 45);
      default:
        return Math.round((pontuacaoMatematica / 1000) * 45);
      }

  };

  return (
    <>
    <Card className="p-4 bg-background border border-muted rounded-lg hover:shadow-2xl cursor-pointer" onClick={click}>
      <CardHeader>
        <CardTitle>ENEM {simulado.year}</CardTitle>
        <CardDescription>Teste seus conhecimentos em geral</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ClipboardCheckIcon className="w-5 h-5 text-muted-foreground" />
            <span className={cn('text-muted-foreground')}>
              {simulado.finalizado ? "Concluído" : "Em andamento"}
            </span>
          </div>
          <div className="flex items-center gap-2" onClick={handleShow}>
            <TrophyIcon
              className={cn("w-5 h-5", simulado.finalizado ? "text-primary" : "text-muted-foreground")}
            />
            <span
              className={cn(
                'font-medium',
                simulado.finalizado ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {simulado.finalizado ? calculatePercentage(simulado) : '-'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
    <Dialog open={open} onOpenChange={(open) => setOpen(open)} >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Detalhes do Simulado</DialogTitle>
          <DialogDescription>
            Resultados gerais e específicos obtidos
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
        <RadialChart
          title="Radial Chart - Acertos e Erros"
          description="Resultado do Simulado"
          data={[{ acertos: handleAcertosTotal(), erros: 180 - handleAcertosTotal()}]}
          config={{
            acertos: {
              label: "Acertos",
              color: "hsl(var(--chart-1))",
            },
            erros: {
              label: "Erros",
              color: "hsl(var(--chart-2))",
            },
          }}
/>
<BarChartAcertos  data={[
  { area: "matemática", acertos: handleAcertosArea('matematica'), erros: 45 - handleAcertosArea('matematica') },
  { area: "ciencias", acertos: handleAcertosArea('ciencias'), erros: 45 - handleAcertosArea('ciencias') },
  { area: "humanas", acertos: handleAcertosArea('humanas'), erros: 45 - handleAcertosArea('humanas') },
  { area: "linguagens", acertos: handleAcertosArea('linguagens'), erros: 45 - handleAcertosArea('linguagens') },
]}/>
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
};

export default SimuladoCard;
