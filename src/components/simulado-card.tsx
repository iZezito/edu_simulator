import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { useNavigate } from 'react-router-dom';
import { ClipboardCheckIcon, TrophyIcon } from '@/components/icons';
import { Simulado } from '@/types';

interface SimuladoCardProps {
  simulado: Simulado;
  handleClick: (id: number | string) => void;
}

const SimuladoCard: React.FC<SimuladoCardProps> = ({ simulado, handleClick }) => {
  const navigate  = useNavigate();

  const click = () => {
   handleClick(simulado.id)
  };

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
            <span className={'text-muted-foreground'}>{simulado.finalizado ? "Concluído" : "Em andamento"}</span>
          </div>
          <div className="flex items-center gap-2">
            <TrophyIcon
              className={simulado.finalizado ? "w-5 h-5 text-primary" : "w-5 h-5 text-muted-foreground"}
            />
            <span
              className={
                simulado.finalizado ? 'text-primary font-medium' : 'text-muted-foreground font-medium'
              }
            >
              {simulado.finalizado ? "100%" : '-'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SimuladoCard;
