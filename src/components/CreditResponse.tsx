import { statusTranslations } from '../locales/es-MX';
import type { CreditResponse } from '../types';

type CreditResponseProps = {
  creditResponse: CreditResponse;
  setCreditResponse: (creditResponse: CreditResponse) => void;
};

const CreditResponse = ({
  creditResponse,
  setCreditResponse,
}: CreditResponseProps) => {
  const handleReset = () => {
    setCreditResponse({
      status: '',
      totalPayment: null,
      monthlyPayment: null,
    });
  };
  return (
    <>
      <h2 className='text-center uppercase text-gray-600 block text-4xl font-bold'>
        Respuesta de tu solicitud
      </h2>
      <div className='my-10 bg-white shadow rounded-lg p-10'>
        <p className='text-lg text-gray-600 my-3 font-black'>
          Tu solicitud fue:{' '}
          <span
            className={
              creditResponse.status === 'Refused'
                ? 'text-red-600'
                : 'text-green-600'
            }
          >
            {statusTranslations[creditResponse.status]}
          </span>
        </p>

        {creditResponse.monthlyPayment && (
          <p className='text-lg text-gray-600 my-3 font-black'>
            Tu pago mensual estimado sería de: {''}
            <span className='text-green-600'>
              ${creditResponse.monthlyPayment}
            </span>
          </p>
        )}

        {creditResponse.totalPayment && (
          <p className='text-lg text-gray-600 my-3 font-black'>
            Tu pago estimado total sería de: {''}
            <span className='text-green-600'>
              ${creditResponse.totalPayment}
            </span>
          </p>
        )}

        <button
          className='bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors mt-5'
          onClick={handleReset}
        >
          Realizar una nueva solicitud
        </button>
      </div>
    </>
  );
};

export default CreditResponse;
