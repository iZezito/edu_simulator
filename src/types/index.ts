import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email({message: 'email inválido'}),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres')
})

export type LoginData = z.infer<typeof loginSchema>;

export type User = {
  nome: string;
  login: string;
  senha: string;
}


// export type Simulado = {
//   id: number;
//   usuario: User;
//   finalizado: boolean;
//   temporizador: string;
//   dataInicio: Date;
//   questoes: Questao[];
//   respostas: Resposta[];
// }

// export type Questao = {
//   id: number;
//   prova: string;
//   cabecalho: string;
//   declaracao: string;
//   alternativas: Alternativa[];


// }

// export type Alternativa = {
//   id: number;
//   texto: string;
//   letraAlternativa: string;
//   isCorreta: boolean;
// }

// export type Resposta = {
//   id: number;
//   questao: Questao;
//   alternativa: Alternativa;
// }


// DTOs.ts

// Tipo para AlternativaDTO
export type AlternativaDTO = {
  id: number;
  letra: string; // Character in Java is represented as a string in TypeScript
  texto: string;
};

// Tipo para QuestaoComRespostaDTO
export type QuestaoComRespostaDTO = {
  questaoId: number;
  titulo: string;
  respostaSelecionada: string | null; // Character in Java is represented as a string in TypeScript
  language: string;
  discipline: string;
  context: string;
  alternativesIntroduction: string;
  alternativas: AlternativaDTO[];
};

// Tipo para Resposta
export type Resposta = {
  id: number;
  simulado: Simulado;
  usuario: Usuario;
  questao: Questao;
  alternativaSelecionada: string | null; // Character in Java is represented as a string in TypeScript
};

// Tipo para Simulado
export type Simulado = {
  id: number;
  year: number;
  finalizado: boolean;
  dataInicio: Date; // Timestamp in Java is represented as Date in TypeScript
  temporizador: string; // Keeping as string to represent time; can be modified to a more suitable type if needed
  pontuacaoHumanas: number;
  pontuacaoLinguagens: number;
  pontuacaoCienciasNatureza: number;
  pontuacaoMatematica: number;
  usuario: Usuario;
  respostas: Resposta[];
};

// Tipos adicionais que podem ser necessários
export type Usuario = {
  // Defina as propriedades de Usuario conforme necessário
};

export type Questao = {
  // Defina as propriedades de Questao conforme necessário
};
