import React from 'react';
import { Card, CardFooter } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { QuestaoComRespostaDTO } from '@/types';
import { CustomPagination } from './ui/custom-pagination';

type QuestionDisplayProps = {
  questao: QuestaoComRespostaDTO | undefined;
  currentQuestionNumber: number;
  onAlternativeSelect: (letra: string) => void;
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
  const letraSelecionada = questao?.respostaSelecionada?.alternativaSelecionada;

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
        
        {questao?.files?.length > 0 && (
          <div className="space-y-2">
            <Label>Figuras:</Label>
            <div className="grid grid-cols-2 gap-4">
              {questao?.files.map((file, index) => (
                <img key={index} src={file.filePath} alt={`Figura ${index + 1}`} className="w-full h-auto rounded-md" />
              ))}
            </div>
          </div>
        )}

        <p className="font-medium">{questao?.alternativesIntroduction}</p>

        {questao?.alternativas[0]?.texto === null ? (
          <RadioGroup
            value={letraSelecionada}
            onValueChange={onAlternativeSelect}
            disabled={isFinished}
            className="grid grid-cols-2 gap-4"
          >
            {questao.alternativas.map((alternativa, index) => (
              <div key={alternativa.id} className={`col-span-1 ${index === 4 ? 'col-span-2' : ''}`}>
                <RadioGroupItem value={alternativa.letra} id={`option-${alternativa.id}`} className="hidden" />
                <Label htmlFor={`option-${alternativa.id}`} className="flex flex-col items-center space-y-2 cursor-pointer">
                  <span className="font-medium">{alternativa.letra})</span>
                  <img 
                    src={alternativa.arquivo}
                    alt={`Alternativa ${alternativa.letra}`} 
                    className={`w-full h-auto rounded-md border-2 ${
                      letraSelecionada === alternativa.letra ? 'border-blue-500' : 'border-transparent'
                    }`} 
                  />
                </Label>
              </div>
            ))}
          </RadioGroup>
        ) : (
          <RadioGroup
            value={letraSelecionada}
            onValueChange={onAlternativeSelect}
            disabled={isFinished}
            className="space-y-2"
          >
            {questao?.alternativas.map((alternativa) => (
              <div key={alternativa.id} className="flex items-center space-x-2">
                <RadioGroupItem value={alternativa.letra} id={`option-${alternativa.id}`} />
                <Label htmlFor={`option-${alternativa.id}`} className="flex items-center space-x-2">
                  <span className="font-medium">{alternativa.letra})</span>
                  <span>{alternativa.texto}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}
      </div>
      <CardFooter className="flex justify-end p-6 pt-0">
        <CustomPagination
          totalPages={totalQuestions}
          currentPage={currentQuestionNumber}
          totalItems={totalQuestions}
        />
      </CardFooter>
    </Card>
  );
}





// import React, { useState } from 'react';
// import { Card, CardFooter } from "@/components/ui/card";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
// import { QuestaoComRespostaDTO } from '@/types';
// import { CustomPagination } from './ui/custom-pagination';

// type QuestionDisplayProps = {
//   questao: QuestaoComRespostaDTO | undefined;
//   currentQuestionNumber: number;
//   onAlternativeSelect: (letra: string) => void;
//   isFinished: boolean | undefined;
//   totalQuestions: number;
// }

// export const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
//   questao,
//   currentQuestionNumber,
//   onAlternativeSelect,
//   isFinished,
//   totalQuestions,
// }) => {

//   const [letraSelecionada, setLetraSelecionada] = useState<string | undefined>(questao?.respostaSelecionada?.alternativaSelecionada || undefined);

//   return (
//     <Card className="w-full max-w-3xl">
//       <div className="flex justify-between items-center p-6 border-b">
//         <h3 className="text-2xl font-semibold">Questão {currentQuestionNumber}</h3>
//         <div className="text-sm text-muted-foreground">
//           <span className="mr-2">{questao?.discipline}</span>
//           <span>{questao?.language}</span>
//         </div>
//       </div>
//       <div className="p-6 space-y-4">
//         <h4 className="text-xl font-medium">{questao?.titulo}</h4>
//         <div className="bg-muted p-4 rounded-md">
//           <p>{questao?.context}</p>
//         </div>
        
//         {/* Exibe os arquivos (imagens) do cabeçalho da questão */}
//         {questao?.files?.length > 0 && (
//           <div className="space-y-2">
//             <Label>Figuras:</Label>
//             <div className="grid grid-cols-2 gap-4">
//               {questao?.files.map((file, index) => (
//                 <img key={index} src={file.filePath} alt={`Figura ${index + 1}`} className="w-full h-auto rounded-md" />
//               ))}
//             </div>
//           </div>
//         )}

//         <p className="font-medium">{questao?.alternativesIntroduction}</p>

//         {/* Verifica se as alternativas são imagens ou texto */}
//         {questao?.alternativas[0]?.texto === null ? (
//           <RadioGroup
//             value={letraSelecionada}
//             onValueChange={(value) => {
//               onAlternativeSelect(value);
//               setLetraSelecionada(value);
//             }}
//             disabled={isFinished}
//             className="grid grid-cols-2 gap-4"
//           >
//             {questao.alternativas.map((alternativa, index) => (
//               <div key={alternativa.id} className={`col-span-1 ${index === 4 ? 'col-span-2' : ''}`}>
//                 <RadioGroupItem value={alternativa.letra} id={`option-${alternativa.id}`} className="hidden" />
//                 <Label htmlFor={`option-${alternativa.id}`} className="flex flex-col items-center space-y-2 cursor-pointer">
//                   <span className="font-medium">{alternativa.letra})</span>
//                   <img 
//                     src={alternativa.arquivo}
//                     alt={`Alternativa ${alternativa.letra}`} 
//                     className={`w-full h-auto rounded-md border-2 ${
//                       letraSelecionada === alternativa.letra ? 'border-blue-500' : 'border-transparent'
//                     }`} 
//                   />
//                 </Label>
//               </div>
//             ))}
//           </RadioGroup>
//         ) : (
//           <RadioGroup
//             value={letraSelecionada}
//             onValueChange={(value) => {
//               onAlternativeSelect(value);
//               setLetraSelecionada(value);
//             }}
//             disabled={isFinished}
//             className="space-y-2"
//           >
//             {questao?.alternativas.map((alternativa) => (
//               <div key={alternativa.id} className="flex items-center space-x-2">
//                 <RadioGroupItem value={alternativa.letra} id={`option-${alternativa.id}`} />
//                 <Label htmlFor={`option-${alternativa.id}`} className="flex items-center space-x-2">
//                   <span className="font-medium">{alternativa.letra})</span>
//                   <span>{alternativa.texto}</span>
//                 </Label>
//               </div>
//             ))}
//           </RadioGroup>
//         )}
//       </div>
//       <CardFooter className="flex justify-end p-6 pt-0">
//         <CustomPagination
//           totalPages={totalQuestions}
//           currentPage={currentQuestionNumber}
//           totalItems={totalQuestions}
//         />
//       </CardFooter>
//     </Card>
//   );
// }
