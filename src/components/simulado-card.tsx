import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ClipboardCheckIcon, TrophyIcon } from '@/components/icons';
import { Simulado } from '@/types';
import { cn } from "@/lib/utils";

interface SimuladoCardProps {
  simulado: Simulado;
  handleClick: (id: number | string) => void;
}

const SimuladoCard: React.FC<SimuladoCardProps> = ({ simulado, handleClick }) => {

  const click = () => {
    handleClick(simulado.id);
  };

  const calculatePercentage = (simulado: Simulado) => {
    const { pontuacaoCienciasNatureza, pontuacaoHumanas, pontuacaoLinguagens, pontuacaoMatematica } = simulado;
    const total  = pontuacaoCienciasNatureza + pontuacaoHumanas + pontuacaoLinguagens + pontuacaoMatematica;
    const corrects = Math.round((total / 1000) * 180);
    const percentage = Math.round(corrects / 25 * 10) + '%';
    return percentage;
  }

  return (
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
          <div className="flex items-center gap-2">
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
  );
};

export default SimuladoCard;
