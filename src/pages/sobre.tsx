import { z } from 'zod';
import { GenericForm, FormAction } from '@/components/generic-form';
import { useState } from 'react';

const userSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  login: z.string().min(1, "Login é obrigatório"),
  senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  email: z.string().email("Email inválido"),
  idade: z.coerce.number().min(18, "Idade mínima é 18 anos"),
});

type UserSchema = z.infer<typeof userSchema>;

export default function Sobre() {
  const [usuario, setUsuario] = useState<UserSchema>();

  const handleSubmit = async (data: UserSchema): Promise<void> => {
    setUsuario(data);
    console.log(data);
  };

  return (
    <>
      {usuario && <p>{JSON.stringify(usuario)}</p>}
      <GenericForm
        schema={userSchema}
        submitFn={handleSubmit}
        action={FormAction.CREATE}
        position={[3, 2]}
        title="Criar Usuário"
        description="Entre com as informações para criar um novo usuário"
        isSubmitting={false}
        defaultValues={{
          nome: 'Neymar',
          login: 'neymar.boatarde',
          email: 'neymar@gmail.com',
          senha: '1234567',
          idade: 25
        }}
        fieldConfig={{
          senha: {
            type: 'password',
            label: 'Senha',
            placeholder: '******'
          },
          idade: {
            label: 'Idade',
            placeholder: 'Sua idade'
          }
        }}
      />
    </>
  );
}