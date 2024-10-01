import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';

type InputProps = {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error: FieldError | undefined;
};

const Input = ({
  label,
  id,
  type,
  placeholder,
  register,
  error,
}: InputProps) => {
  return (
    <div className='my-5'>
      <label
        className='uppercase text-gray-600 block text-xl font-bold'
        htmlFor={id}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
        {...register}
      />
      {error && <ErrorMessage message={error.message!.toString()} />}
    </div>
  );
};

export default Input;
