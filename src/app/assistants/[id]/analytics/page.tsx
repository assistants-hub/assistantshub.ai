'use client';

import {
  getMessageMetrics,
  getThreadMetrics,
} from '@/app/assistants/[id]/client';
import 'highlight.js/styles/github.css';
import React, { useContext, useEffect, useState } from 'react';
import { Card, Dropdown, Spinner } from 'flowbite-react';
import Chart from 'react-apexcharts';
import {
  formatResultsForTimespan,
  getMetricsRequestForTimespan,
} from '@/app/assistants/[id]/analytics/timespans';
import AssistantContext from '@/app/assistants/[id]/AssistantContext';

export default function Analytics() {
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('Last 7 days');
  const [threadsLoading, setThreadsLoading] = useState(true);
  const [threadsSeries, setThreadsSeries] = useState([
    { name: 'Threads', data: [] },
  ]);
  const [messagesLoading, setMessagesLoading] = useState(true);
  const [messagesSeries, setMessagesSeries] = useState([
    { name: 'Messages', data: [] },
  ]);

  const { assistant } = useContext(AssistantContext);

  const chartOptions: any = {
    chart: {
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
        tools: {
          download: false,
        },
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
      getThreadMetrics(
        getMetricsRequestForTimespan(selectedTimePeriod, assistant.id)
      ).then(([status, response]) => {
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

      getMessageMetrics(
        getMetricsRequestForTimespan(selectedTimePeriod, assistant.id)
      ).then(([status, response]) => {
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
  }, [assistant.id, selectedTimePeriod]);

  return assistant.id ? (
    <div className='flex flex-col gap-4'>
      <h3 className='text-3xl font-bold dark:text-white'>Analytics</h3>
      <p className={"pb-4 text-sm text-gray-400"}>Observe metrics for your assistant</p>
      <div className='flex flex-row-reverse'>
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
      <div>
        <Card className='min-w-0'>
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
                height={350}
              />
            )}
          </h5>
        </Card>
      </div>
      <div>
        <Card className='min-w-0'>
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
                height={350}
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
