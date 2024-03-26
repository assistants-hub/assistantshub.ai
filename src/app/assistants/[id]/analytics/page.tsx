'use client';

import { useParams } from 'next/navigation';
import {
  getMessageMetrics,
  getThreadMetrics,
  useGetAssistant,
} from '@/app/assistants/[id]/client';
import 'highlight.js/styles/github.css';
import React, { useEffect, useState } from 'react';
import { Card, Dropdown, Spinner } from 'flowbite-react';
import Chart from 'react-apexcharts';
import { formatResultsForTimespan } from '@/app/assistants/[id]/analytics/timespans';

export default function Analytics() {
  const params = useParams<{ id: string }>();
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('Today');
  const [threadsLoading, setThreadsLoading] = useState(true);
  const [threadsSeries, setThreadsSeries] = useState([
    { name: 'Threads', data: [] },
  ]);
  const [messagesLoading, setMessagesLoading] = useState(true);
  const [messagesSeries, setMessagesSeries] = useState([
    { name: 'Messages', data: [] },
  ]);
  let { assistantLoading, assistant, assistantEmpty, reload } = useGetAssistant(
    params.id
  );

  const chartOptions: any = {
    chart: {
      type: 'bar',
      height: 350,
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: 'datetime',
    },
  };

  const userSelectedTimePeriod = (timePeriod: string) => {
    setSelectedTimePeriod(timePeriod);
  };

  useEffect(() => {
    setThreadsLoading(true);
    setMessagesLoading(true);
    if (assistant.id) {
      getThreadMetrics(assistant.id.toString()).then(([status, response]) => {
        setThreadsSeries([
          {
            name: 'Threads',
            data: formatResultsForTimespan(
              selectedTimePeriod,
              response
            ) as never[],
          },
        ]);
        setThreadsLoading(false);
      });

      getMessageMetrics(assistant.id.toString()).then(([status, response]) => {
        setMessagesSeries([
          {
            name: 'Messages',
            data: formatResultsForTimespan(
              selectedTimePeriod,
              response
            ) as never[],
          },
        ]);
        setMessagesLoading(false);
      });
    }
  }, [assistant.id]);

  return assistant.id ? (
    <div className='max-w-screen flex flex-col gap-4'>
      <h3 className='pb-4 text-3xl font-bold dark:text-white'>Analytics</h3>
      <div className='max-w-screen flex flex-row-reverse'>
        <Dropdown label={selectedTimePeriod} outline={true} color={'gray'}>
          <Dropdown.Item onClick={() => userSelectedTimePeriod('Yesterday')}>
            Yesterday
          </Dropdown.Item>
          <Dropdown.Item onClick={() => userSelectedTimePeriod('Today')}>
            Today
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => userSelectedTimePeriod('Month to Date')}
          >
            Month to Date
          </Dropdown.Item>
          <Dropdown.Item onClick={() => userSelectedTimePeriod('Last 7 days')}>
            Last 7 days
          </Dropdown.Item>
          <Dropdown.Item onClick={() => userSelectedTimePeriod('Last 30 days')}>
            Last 30 days
          </Dropdown.Item>
          <Dropdown.Item onClick={() => userSelectedTimePeriod('Last 90 days')}>
            Last 90 days
          </Dropdown.Item>
        </Dropdown>
      </div>
      <div className='max-w-screen'>
        <Card className='max-w-screen min-w-0'>
          <h5 className='text-xl tracking-tight text-gray-900 dark:text-white'>
            Threads
            {threadsLoading ? (
              <div className='flex items-center justify-center p-10 '>
                <Spinner />
              </div>
            ) : (
              <Chart
                options={chartOptions}
                series={threadsSeries}
                type='bar'
                height={300}
              />
            )}
          </h5>
        </Card>
      </div>
      <div className='max-w-screen'>
        <Card className='max-w-screen min-w-0'>
          <h5 className='text-xl tracking-tight text-gray-900 dark:text-white'>
            Messages
            {messagesLoading ? (
              <div className='flex items-center justify-center p-10 '>
                <Spinner />
              </div>
            ) : (
              <Chart
                options={chartOptions}
                series={messagesSeries}
                type='bar'
                height={300}
              />
            )}
          </h5>
        </Card>
      </div>
    </div>
  ) : (
    <></>
  );
}
