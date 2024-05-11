export function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  let diff = (timestamp - now) / 1000; // convert milliseconds to seconds
  let unit = 'second';

  // Determine the unit and adjust the difference accordingly
  if (Math.abs(diff) >= 60) {
    diff /= 60; // convert to minutes
    unit = 'minute';
    if (Math.abs(diff) >= 60) {
      diff /= 60; // convert to hours
      unit = 'hour';
      if (Math.abs(diff) >= 24) {
        diff /= 24; // convert to days
        unit = 'day';
        if (Math.abs(diff) >= 7) {
          diff /= 7; // convert to weeks
          unit = 'week';
          if (Math.abs(diff) >= 4.345) {
            diff /= 4.345; // convert to months (approx)
            unit = 'month';
            if (Math.abs(diff) >= 12) {
              diff /= 12; // convert to years
              unit = 'year';
            }
          }
        }
      }
    }
  }

  // Use Intl.RelativeTimeFormat for localization support
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  return rtf.format(
    Math.round(diff),
    <
      | 'year'
      | 'years'
      | 'quarter'
      | 'quarters'
      | 'month'
      | 'months'
      | 'week'
      | 'weeks'
      | 'day'
      | 'days'
      | 'hour'
      | 'hours'
      | 'minute'
      | 'minutes'
      | 'second'
      | 'seconds'
    >unit
  );
}

export function formatRelativeUnixTime(value: number | undefined): string {
  if (!value) {
    return '';
  }
  return formatRelativeTime(value * 1000);
}

export function formatRelativeDate(utcString: string): string {
  const date = new Date(utcString);
  return formatRelativeTime(date.getTime());
}
