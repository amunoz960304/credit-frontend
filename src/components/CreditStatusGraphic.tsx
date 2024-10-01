import { CChart } from '@coreui/react-chartjs';
import { getCreditStatusCount } from '../services/credit';
import { useQuery } from '@tanstack/react-query';

const CreditStatusGraphic = () => {
  const {
    data: statusCount,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['credit-status-count'],
    queryFn: () => getCreditStatusCount(),
    retry: false,
  });

  if (isLoading) return 'Cargando...';
  if (isError) return;
  if (statusCount) {
    const labels = statusCount.map((item) =>
      item.status === 'Approved' ? 'Aprobados' : 'Rechazados'
    );
    const data = statusCount.map((item) => item.total);
    return (
      <>
        <h2 className='text-center uppercase text-gray-600 block text-2xl mb-5 font-bold'>
          Estadisticas de creditos
        </h2>
        <CChart
          type='doughnut'
          data={{
            labels,
            datasets: [
              {
                backgroundColor: ['#41B883', '#DD1B16'],
                data,
              },
            ],
          }}
        />
      </>
    );
  }
};

export default CreditStatusGraphic;
