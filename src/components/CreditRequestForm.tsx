import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@tanstack/react-query';
import ErrorMessage from '../components/ErrorMessage';
import type { CreditRequestForm, CreditResponse } from '../types';
import { creditRequest, getBranches } from '../services/credit';
import { installments } from '../data';
import Input from './Input';

type CreditRequestFormProps = {
  setCreditResponse: (data: CreditResponse) => void;
};

const CreditRequestForm = ({ setCreditResponse }: CreditRequestFormProps) => {
  const initialValues: CreditRequestForm = {
    name: '',
    lastname: '',
    email: '',
    incomes: 0,
    branchId: 0,
    amount: 0,
    installments: 0,
  };

  const {
    data: branches,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['branches'],
    queryFn: () => getBranches(),
    retry: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: creditRequest,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success('Solicitud realizada con exito');
      setCreditResponse(data!);
    },
  });

  const handleCreditRequest = (formData: CreditRequestForm) => {
    mutate(formData);
  };

  if (isLoading) return 'Cargando...';
  if (isError) return;
  if (branches)
    return (
      <div>
        <h2 className='text-center uppercase text-gray-600 block text-4xl font-bold'>
          Simulador de crédito personal
        </h2>
        <form
          className='my-10 bg-white shadow rounded-lg p-10'
          onSubmit={handleSubmit(handleCreditRequest)}
          noValidate
        >
          <Input
            label='Email'
            id='email'
            type='email'
            register={register('email', {
              required: 'El email es obligatorio',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Email no válido',
              },
            })}
            placeholder='Email de Registro'
            error={errors.email}
          />
          <Input
            label='Nombre'
            id='name'
            type='text'
            register={register('name', {
              required: 'El nombre es obligatorio',
            })}
            placeholder='Nombre'
            error={errors.name}
          />
          <Input
            label='Apellidos'
            id='lastname'
            type='text'
            register={register('lastname', {
              required: 'Los apellidos es obligatorios',
            })}
            placeholder='Apellidos'
            error={errors.lastname}
          />

          <Input
            label='Ingresos'
            id='incomes'
            type='number'
            register={register('incomes', {
              required: 'Los ingresos son obligatorios',
              valueAsNumber: true,
              validate: (incomes: number) => {
                return incomes > 1 || 'Los ingresos son obligatorios';
              },
            })}
            placeholder='Ingresos'
            error={errors.incomes}
          />

          <Input
            label='Monto del Crédito'
            id='amount'
            type='number'
            register={register('amount', {
              required: 'El monto del credito obligatorio',
              valueAsNumber: true,
              validate: (amount: number) => {
                return amount >= 5000 || 'El monto debe ser mayor a $5000.00';
              },
            })}
            placeholder='Monto solicitado'
            error={errors.amount}
          />

          <div className='my-5'>
            <label
              className='uppercase text-gray-600 block text-xl font-bold'
              htmlFor='branchId'
            >
              Sucursal
            </label>
            <select
              id='branchId'
              className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
              {...register('branchId', {
                required: 'La sucursal es obligatoria',
                valueAsNumber: true,
                validate: (value: number) => {
                  return value > 0 || 'La sucursal es obligatoria';
                },
              })}
            >
              <option value={0}>
                Selecciona una sucursal para concluir tu solicitud
              </option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                </option>
              ))}
            </select>
            {errors.branchId && errors.branchId.message!.length > 0 && (
              <ErrorMessage message={errors.branchId.message!} />
            )}
          </div>

          <div className='my-5'>
            <label
              className='uppercase text-gray-600 block text-xl font-bold'
              htmlFor='installments'
            >
              Numero Plazos
            </label>
            <select
              id='installments'
              className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
              {...register('installments', {
                required: 'El número de plazos es obligatorio',
                valueAsNumber: true,
                validate: (value: number) => {
                  return value !== 0 || 'El número de plazos es obligatorio';
                },
              })}
            >
              <option value={0}>Selecciona el número de plazos a pagar</option>
              {installments.map(({ installment, id }) => (
                <option key={id} value={installment}>
                  {installment}
                </option>
              ))}
            </select>
            {errors.installments && errors.installments.message!.length > 0 && (
              <ErrorMessage message={errors.installments.message!} />
            )}
          </div>

          <input
            type='submit'
            value='Mandar Solicitud'
            className='bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'
          />
        </form>
      </div>
    );
};

export default CreditRequestForm;
