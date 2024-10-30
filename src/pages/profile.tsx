import { GenericForm, FormAction } from '@/components/generic-form';
import { useEffect, useState } from 'react';
import { useService } from '@/hooks/use-service';
import { UpdateUser, User, userUpdateSchema } from '@/types';
import ContentLoader from '@/components/content-loader';



export default function Profile() {
  const [user, setUser] = useState<User>()
  const service = useService<User>('usuarios')

  useEffect(() => {
    const loadData = async () => {
      const usuario = await service.get()
      setUser(usuario)
    }
    loadData()
  }, [])

  const handleSubmit = async (data: UpdateUser): Promise<void> => {
    const usuario = await service.update(String(service.data.object?.id), data)
    setUser(usuario)
  };

  return (
    <>
      <ContentLoader loading={service.isPending} error={service.error} noContent={'Nenhum dado!'}>
      <GenericForm
        schema={userUpdateSchema}
        submitFn={handleSubmit}
        action={FormAction.UPDATE}
        position={[2, 1]}
        title="Meu perfil"
        description="Aqui você pode atualizar alguns dos seus dados"
        defaultValues={{
          nome: user?.nome,
          email: user?.email,
          twoFactorAuthenticationEnabled: user?.twoFactorAuthenticationEnabled,
        }}
        fieldConfig={{
          email:{
            disabled: true
          },
          twoFactorAuthenticationEnabled: {
            label: 'Autenticação de 2 Fatores',
            type: 'checkbox'
          }
        }}
      />
      </ContentLoader>
      
    </>
  );
}