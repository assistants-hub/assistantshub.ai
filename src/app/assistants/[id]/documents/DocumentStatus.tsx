import { HiBadgeCheck, HiBan, HiExclamation, HiRefresh } from 'react-icons/hi';

export interface DocumentStatusProps {
  file: any;
}

export default function DocumentStatus(props: DocumentStatusProps) {
  return (
    <div className={'p-2 text-sm text-gray-500'}>
      {props.file.object.status === 'completed' ? (
        <div
          className={'flex flex-row items-center justify-start text-green-500'}
        >
          <HiBadgeCheck /> Ready
        </div>
      ) : props.file.object.status === 'failed' ? (
        <div
          className={'flex flex-row items-center justify-start text-red-500'}
        >
          <HiExclamation /> Failed
        </div>
      ) : props.file.object.status === 'cancelled' ? (
        <div
          className={'flex flex-row items-center justify-start text-orange-500'}
        >
          <HiBan /> Cancelled
        </div>
      ) : (
        <div
          className={'flex flex-row items-center justify-start text-blue-500'}
        >
          <HiRefresh /> Processing
        </div>
      )}
    </div>
  );
}
