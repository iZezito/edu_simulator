import { z } from 'zod'
import api from '@/services/api';

export const loginSchema = z.object({
  email: z.string().min(1, 'O login contém no mínimo 1 caractere'),
  password: z.string().min(6, 'A senha contém no mínimo 6 caracteres')
})

export type LoginData = z.infer<typeof loginSchema>;

export const userSchema = z.object({
  nome: z.string().min(1, 'O nome deve ter no mínimo 1 caractere'),
  email: z.string().email('Email inválido'),
  senha: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  repetirSenha: z.string(),
}).refine(
    	(values) => {
    		return values.senha === values.repetirSenha;
    	},
    	{
    		message: "Deve ser igual ao campo senha",
    		path: ["repetirSenha"],
    	},
).superRefine(async (data, ctx) => {
  try {
    // Substitua esta URL pela sua API real
    const response = await api.get(`/usuarios/login/${data.email}`);
    const exists = await response.data
    
    
    if (exists) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Este email já está em uso",
        path: ["email"]
      });
    }
  } catch (error) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Erro ao verificar disponibilidade do email",
      path: ["email"]
    });
  }
});

export const userUpdateSchema = z.object({
  nome: z.string().min(1, 'O nome deve ter no mínimo 1 caractere'),
  login: z.string().min(1, 'O login deve ter no mínimo 1 caractere'),
})

export type UpdateUser = z.infer<typeof userUpdateSchema>

export type UserDTO = {
  id: number;
  nome: string;
  login: string;
}


export type CreateUser = z.infer<typeof userSchema>

export type User = {
  id: number;
  nome: string;
  login: string;
  senha: string;
};


// DTOs.ts

export type File = {
  id: number,
  filePath: string
};

// Tipo para AlternativaDTO
export type AlternativaDTO = {
  id: number;
  letra: string; // Character in Java is represented as a string in TypeScript
  texto: string;
  arquivo: string;
};

// Tipo para QuestaoComRespostaDTO
export type QuestaoComRespostaDTO = {
  id: number;
  titulo: string;
  respostaSelecionada: RespostaDTO; // Character in Java is represented as a string in TypeScript
  language: string;
  discipline: string;
  context: string;
  alternativesIntroduction: string;
  correctAlternative: string
  files: File[];
  alternativas: AlternativaDTO[];
};

// Tipo para Resposta
export type Resposta = {
  id: number;
  simulado: Partial<Simulado>;
  usuario: Partial<Usuario>;
  questao: Partial<Questao>;
  alternativaSelecionada: string | null; // Character in Java is represented as a string in TypeScript
};

export type RespostaDTO = {
  id: number,
  alternativaSelecionada: string | null
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
  respostas: RespostaDTO[];
};

// Tipos adicionais que podem ser necessários
export type Usuario = {
  id: number,
};

export type Questao = {
  id: number,
};

type Pageable = {
  sort: Sort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
  paged: boolean;
};


type Sort = {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
};


export type ResponseType<T> = {
  id: number;
  content: T[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
}
