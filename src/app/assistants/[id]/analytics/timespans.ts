let Number = Intl.NumberFormat('en-US', {
  minimumIntegerDigits: 2,
  minimumFractionDigits: 0,
});

const formatResultsForDay = (date: string, results: any[]) => {
  let spans = [];
  for (let i = 0; i < 24; i++) {
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

export const formatResultsForTimespan = (timespan: string, results: any[]) => {
  let spans: any = [];
  if (timespan.toLowerCase() == 'today') {
    let date = new Date().toISOString().split('T')[0];
    spans = formatResultsForDay(date, results);
  }

  if (timespan.toLowerCase() == 'yesterday') {
    let date = new Date(new Date().setHours(-1)).toISOString().split('T')[0];
    spans = formatResultsForDay(date, results);
  }

  return spans;
};
