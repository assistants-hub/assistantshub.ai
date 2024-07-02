import React from 'react';
import AssistantMetrics from '@/app/admin/dashboard/AssistantMetrics';
import UserMetrics from '@/app/admin/dashboard/UserMetrics';

export default function Dashboard() {
  return (
    <div className='stack ml-5 mt-5 items-center justify-center'>
      <h3 className='text-3xl font-bold dark:text-white'>Dashboard</h3>
      <p className={'pb-4 text-sm text-gray-400'}>
        Analytics on your Assistants Hub instance
      </p>
      <div className={'pt-4'}>
        <div className={'pb-4 text-xl text-gray-400'}>Assistant Metrics</div>
        <AssistantMetrics />
      </div>
      <div className={'pt-4'}>
        <div className={'pb-4 text-xl text-gray-400'}>User Metrics</div>
        <UserMetrics />
      </div>
    </div>
  );
}
