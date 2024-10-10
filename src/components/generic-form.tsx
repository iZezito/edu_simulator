import { z } from 'zod';
import { useForm, DefaultValues, Path } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

export enum FormAction {
  CREATE = 'create',
  UPDATE = 'update'
}

type ZodTypeUnion = 
  | z.ZodString
  | z.ZodNumber
  | z.ZodBoolean
  | z.ZodDate
  | z.ZodEnum<[string, ...string[]]>;

type ZodObjectShape = {
  [key: string]: ZodTypeUnion;
};

interface GenericFormProps<T extends ZodObjectShape> {
  schema: z.ZodObject<T>;
  submitFn: (data: z.infer<z.ZodObject<T>>) => Promise<void>;
  action: FormAction;
  defaultValues?: Partial<z.infer<z.ZodObject<T>>>;
  position: [number, number];
  title: string;
  description?: string;
  isSubmitting: boolean;
  fieldConfig?: Partial<Record<keyof T, {
    label?: string;
    placeholder?: string;
    type?: string;
    hidden?: boolean;
    disabled?: boolean;
  }>>;
}

type FieldInfo = {
  name: string;
  type: string;
  label: string;
  placeholder: string;
  hidden: boolean;
  defaultValue: unknown;
};

function getInputTypeFromZodType(zodField: ZodTypeUnion): string {
  if (zodField instanceof z.ZodString) return 'text';
  if (zodField instanceof z.ZodNumber) return 'number';
  if (zodField instanceof z.ZodBoolean) return 'checkbox';
  if (zodField instanceof z.ZodDate) return 'date';
  if (zodField instanceof z.ZodEnum) return 'select';
  return 'text';
}

function getDefaultValueForType(zodField: ZodTypeUnion): unknown {
  if (zodField instanceof z.ZodString) return '';
  if (zodField instanceof z.ZodNumber) return 0;
  if (zodField instanceof z.ZodBoolean) return false;
  if (zodField instanceof z.ZodDate) return new Date();
  if (zodField instanceof z.ZodEnum) return '';
  return '';
}

export function GenericForm<T extends ZodObjectShape>({
  schema,
  submitFn,
  action,
  defaultValues,
  position,
  title,
  description,
  isSubmitting,
  fieldConfig = {}
}: GenericFormProps<T>) {
  type FormData = z.infer<typeof schema>;
  
  const zodShape = (schema as unknown as z.ZodObject<T>)._def.shape();

  
  const initialValues = Object.entries(zodShape).reduce((acc, [key, value]) => {
    const zodField = value as ZodTypeUnion;
    acc[key] = defaultValues?.[key] ?? getDefaultValueForType(zodField);
    return acc;
  }, {} as Record<string, unknown>) as FormData;

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialValues as DefaultValues<FormData>,
  });

  const onSubmit = async (data: FormData) => {
    try {
      await submitFn(data);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const [rows, cols] = position;
  const gridStyles = `grid-cols-${cols} grid-rows-${rows}`;
  
  const fields = Object.entries(zodShape).map(([key, value]) => {
    const zodField = value as ZodTypeUnion;
    const defaultType = getInputTypeFromZodType(zodField);
    
    return {
      name: key,
      type: fieldConfig[key]?.type ?? defaultType,
      label: fieldConfig[key]?.label ?? key.charAt(0).toUpperCase() + key.slice(1),
      placeholder: fieldConfig[key]?.placeholder ?? `Enter ${key}`,
      hidden: fieldConfig[key]?.hidden ?? false,
      defaultValue: initialValues[key]
    } as FieldInfo;
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="mx-auto max-w-2xl mt-10">
          <CardHeader>
            <CardTitle className="text-xl">{title}</CardTitle>
            {description && (
              <CardDescription>{description}</CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className={`grid ${gridStyles} gap-4`}>
                {fields.filter(field => !field.hidden).map((field) => (
                  <div key={field.name} className="grid gap-2">
                    <FormField
                      control={form.control}
                      name={field.name as Path<FormData>}
                      render={({ field: formField }) => (
                        <FormItem>
                          <FormLabel>{field.label}</FormLabel>
                          <FormControl>
                            <Input
                              type={field.type}
                              placeholder={field.placeholder}
                              {...formField}
                              value={
                                typeof formField.value === 'string' || typeof formField.value === 'number'
                                  ? formField.value
                                  : field.defaultValue as string | number
                              }
                              onChange={(e) => {
                                const value = field.type === 'number' 
                                  ? (e.target.value === '' ? '' : Number(e.target.value))
                                  : e.target.value;
                                formField.onChange(value);
                              }}
                              disabled={fieldConfig[field.name]?.disabled ?? isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {action === FormAction.CREATE ? 'Criar' : 'Atualizar'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}