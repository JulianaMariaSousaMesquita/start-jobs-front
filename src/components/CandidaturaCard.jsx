import { useState, useCallback } from 'react';
import { ProgressSteps } from './ProgressSteps';
import { X } from 'lucide-react';
import dayjs from 'dayjs';

function CandidaturaCard(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = useCallback(() => {
    setIsModalOpen((prevState) => !prevState);
    props.refreshJobs();
  }, []);

  const date1 = dayjs();
  const arr = props.dataCandidatura;
  const date = new Date(arr[0], arr[1] - 1, arr[2]);
  const dateFormat = date.toISOString().split('T')[0];
  const diffInDays = date1.diff(dayjs(dateFormat), 'day');

  return (
    <>
      <div className='py-6 px-6 lg:px-6 text-left relative bg-gray-50 rounded-lg border border-zinc-600 shadow-lg hover:border-blue-500 hover:scale-103 transition-all duration-200 dark:bg-[#151419]'>
        <div className='flex flex-col xl:flex-row justify-between items-center lg:items-center gap-4 lg:gap-8'>
          <div className='flex flex-col items-start gap-3 w-full lg:w-max'>
            <h1 className='lg:max-w-80 text-lg font-semibold text-gray-900 dark:text-white'>
              {props.vaga.titulo} - {props.vaga.empresa}
            </h1>
            <p className='text-sm text-gray-700 dark:text-gray-300 flex flex-wrap gap-6'>
              <span>
                {props.vaga.senioridade === 'mid_level'
                  ? 'pleno'
                  : props.vaga.senioridade}
              </span>
              <span>{props.vaga.modeloTrabalho}</span>
              <span>{props.vaga.localizacao}</span>
            </p>
          </div>

          <div className='flex flex-col 2xl:flex-row items-center lg:gap-4 w-full lg:w-auto'>
            <p className='text-gray-500 dark:text-gray-400 text-sm'>
              {diffInDays > 0
                ? `Inscrito há ${diffInDays} dia${diffInDays !== 1 ? 's' : ''}`
                : 'Inscrito Hoje'}
            </p>
            <div className='flex xl:flex-col-reverse gap-4 mt-4 lg:mt-0'>
              <button
                onClick={toggleModal}
                className='w-full lg:w-auto text-blue-700 bg-transparent border border-blue-700 hover:bg-blue-700 hover:text-white transition-colors focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
              >
                Ver mais detalhes
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white dark:bg-[#151419] rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-6'>
            <div className='flex justify-between items-center border-b pb-3'>
              <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>
                Detalhes da Candidatura
              </h2>
              <button
                onClick={toggleModal}
                className='text-blue-600 hover:text-blue-800 transition-colors'
              >
                <X />
              </button>
            </div>
            <div className='flex flex-col items-center'>
              <h1 className='text-2xl font-bold dark:text-white'>Status</h1>
              <p className='dark:text-zinc-400'>
                Adicione as etapas do processo seletivo
              </p>
              <ProgressSteps
                idCandidatura={props.id}
                status={props.statusCandidatura}
                refreshJobs={props.refreshJobs}
              />
            </div>
            <div className='mt-4 space-y-4'>
              <p className='text-gray-700 dark:text-gray-300'>
                <strong>Título:</strong> {props.vaga.titulo}
              </p>
              <p className='text-gray-700 dark:text-gray-300'>
                <strong>Empresa:</strong> {props.vaga.empresa}
              </p>
              <p className='text-gray-700 dark:text-gray-300'>
                <strong>Localização:</strong> {props.vaga.localizacao}
              </p>
              <p className='text-gray-700 dark:text-gray-300'>
                <strong>Tipo de Trabalho:</strong> {props.vaga.modeloTrabalho}
              </p>
              <p className='text-gray-700 dark:text-gray-300'>
                <strong>Senioridade:</strong>{' '}
                {props.vaga.senioridade === 'mid_level'
                  ? 'pleno'
                  : props.vaga.senioridade}
              </p>
              <p className='text-gray-700 dark:text-gray-300 max-h-96 overflow-x-auto'>
                <strong>Descrição:</strong>{' '}
                {props.vaga.descricao || 'Descrição não fornecida.'}
              </p>
            </div>
            <div className='flex justify-end mt-6'>
              <button
                onClick={toggleModal}
                className='text-gray-700 dark:text-gray-300 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors font-medium rounded-lg text-sm px-5 py-2.5'
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CandidaturaCard;
