import { useState } from 'react';
import CreditRequestForm from '../components/CreditRequestForm';
import CreditResponse from '../components/CreditResponse';
import { CreditResponse as TCreditResponse } from '../types';

const CreditRequestPage = () => {
  const [creditResponse, setCreditResponse] = useState<TCreditResponse>({
    status: '',
    totalPayment: null,
    monthlyPayment: null,
  });

  return (
    <>
      {creditResponse.status.length < 1 ? (
        <CreditRequestForm setCreditResponse={setCreditResponse} />
      ) : (
        <CreditResponse
          creditResponse={creditResponse}
          setCreditResponse={setCreditResponse}
        />
      )}
    </>
  );
};

export default CreditRequestPage;
