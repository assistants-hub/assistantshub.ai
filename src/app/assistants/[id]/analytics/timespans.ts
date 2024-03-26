import { MetricsRequest } from '@/app/assistants/[id]/client';

let Number = Intl.NumberFormat('en-US', {
  minimumIntegerDigits: 2,
  minimumFractionDigits: 0,
});

const formatResultsForDay = (
  date: string,
  results: any[],
  maxHour?: number
) => {
  let spans = [];
  let hours = maxHour ? maxHour : 24;
  for (let i = 0; i < hours; i++) {
    let value = results.find((result) => {
      if (result.x === date + 'T' + Number.format(i) + ':00:00.000Z') {
        return result;
      }
    });

    let span = {
      x: date + 'T' + Number.format(i) + ':00:00.000Z',
      y: value ? value.y : null,
    };
    spans.push(span);
  }
  return spans;
};

const formatResultsForGivenDays = (
  startDate: string,
  results: any[],
  days: number
) => {
  let spans = [];
  for (let i = 0; i < days; i++) {
    let date = new Date((new Date(startDate) as any) - i * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];
    let value = results.find((result) => {
      if (result.x === date + 'T00:00:00.000Z') {
        return result;
      }
    });

    let span = {
      x: date + 'T00:00:00.000Z',
      y: value ? value.y : null,
    };
    spans.push(span);
  }
  return spans;
};

export const formatResultsForTimespan = (timespan: string, results: any[]) => {
  let spans: any = [];
  let date = new Date().toISOString().split('T')[0];

  switch (timespan.toLowerCase()) {
    case 'today':
      spans = formatResultsForDay(date, results, new Date().getUTCHours());
      break;
    case 'yesterday':
      date = new Date((new Date() as any) - 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0];
      spans = formatResultsForDay(date, results);
      break;
    case 'last 7 days':
      spans = formatResultsForGivenDays(date, results, 7);
      break;
    case 'last 30 days':
      spans = formatResultsForGivenDays(date, results, 30);
      break;
    case 'last 90 days':
      spans = formatResultsForGivenDays(date, results, 90);
      break;
    case 'month to date':
      spans = formatResultsForGivenDays(
        date,
        results,
        new Date().getDate() + 1
      );
      break;
  }

  return spans;
};

export const getMetricsRequestForTimespan = (
  timespan: string,
  assistantId: string
) => {
  let request: MetricsRequest;
  switch (timespan.toLowerCase()) {
    case 'today':
      request = {
        assistantId: assistantId,
        timeBucket: '1 hour',
        startDateTime:
          new Date().toISOString().split('T')[0] + 'T00:00:00.000Z',
        endDateTime: new Date().toISOString(),
      };
      break;
    case 'yesterday':
      request = {
        assistantId: assistantId,
        timeBucket: '1 hour',
        startDateTime:
          new Date((new Date().getTime() as any) - 24 * 60 * 60 * 1000)
            .toISOString()
            .split('T')[0] + 'T00:00:00.000Z',
        endDateTime: new Date().toISOString().split('T')[0] + 'T00:00:00.000Z',
      };
      break;
    case 'month to date':
      let date = new Date();
      request = {
        assistantId: assistantId,
        timeBucket: '1 day',
        startDateTime:
          new Date(date.getFullYear(), date.getMonth(), 1)
            .toISOString()
            .split('T')[0] + 'T00:00:00.000Z',
        endDateTime: new Date().toISOString(),
      };
      break;
    case 'last 7 days':
      request = {
        assistantId: assistantId,
        timeBucket: '1 day',
        startDateTime:
          new Date((new Date().getTime() as any) - 7 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split('T')[0] + 'T00:00:00.000Z',
        endDateTime: new Date().toISOString(),
      };
      break;
    case 'last 30 days':
      request = {
        assistantId: assistantId,
        timeBucket: '1 day',
        startDateTime:
          new Date((new Date().getTime() as any) - 30 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split('T')[0] + 'T00:00:00.000Z',
        endDateTime: new Date().toISOString(),
      };
      break;
    case 'last 90 days':
      request = {
        assistantId: assistantId,
        timeBucket: '1 day',
        startDateTime:
          new Date((new Date().getTime() as any) - 90 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split('T')[0] + 'T00:00:00.000Z',
        endDateTime: new Date().toISOString(),
      };
      break;
    default:
      request = {
        assistantId: assistantId,
        timeBucket: '1 hour',
        startDateTime:
          new Date().toISOString().split('T')[0] + 'T00:00:00.000Z',
        endDateTime: new Date().toISOString(),
      };
  }

  return request;
};
