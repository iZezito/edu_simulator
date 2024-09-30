import React from 'react'
import { Card, CardFooter } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label" 
import { QuestaoComRespostaDTO } from '@/types'
import { CustomPagination } from './ui/custom-pagination'

type QuestionDisplayProps = {
  questao: QuestaoComRespostaDTO | undefined;
  currentQuestionNumber: number;
  onAlternativeSelect: (alternativaId: number) => void;
  isFinished: boolean | undefined;
  totalQuestions: number;
}

export const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  questao,
  currentQuestionNumber,
  onAlternativeSelect,
  isFinished,
  totalQuestions,
}) => {
  return (
    <Card className="w-full max-w-3xl">
      <div className="flex justify-between items-center p-6 border-b">
        <h3 className="text-2xl font-semibold">Questão {currentQuestionNumber}</h3>
        <div className="text-sm text-muted-foreground">
          <span className="mr-2">{questao?.discipline}</span>
          <span>{questao?.language}</span>
        </div>
      </div>
      <div className="p-6 space-y-4">
        <h4 className="text-xl font-medium">{questao?.titulo}</h4>
        <div className="bg-muted p-4 rounded-md">
          <p>{questao?.context}</p>
        </div>
        <p className="font-medium">{questao?.alternativesIntroduction}</p>
        <RadioGroup
          onValueChange={(value) => onAlternativeSelect(Number(value))}
          value={questao?.respostaSelecionada?.toString() || undefined}
          disabled={isFinished}
          className="space-y-2"
        >
          {questao?.alternativas.map((alternativa) => (
            <div key={alternativa.id} className="flex items-center space-x-2">
              <RadioGroupItem value={alternativa.id.toString()} id={`option-${alternativa.id}`} />
              <Label htmlFor={`option-${alternativa.id}`} className="flex items-center space-x-2">
                <span className="font-medium">{alternativa.letra})</span>
                <span>{alternativa.texto}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <CardFooter className="flex justify-end p-6 pt-0">
        <CustomPagination
          totalPages={totalQuestions}
          currentPage={currentQuestionNumber}
          totalItems={totalQuestions}
        />
      </CardFooter>
    </Card>
  )
}