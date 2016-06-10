const extend = require('util')._extend;
const time_unit_to_ms = {
  year: 365*24*60*60*1000,
  month: 28*24*60*60*1000,
  week:   7*24*60*60*1000,
  day:      24*60*60*1000,
  hour:        60*60*1000
};

function get_events_in_dates(event_list, from, to) {
  var final_event_list = [];
  event_list.forEach((event) => {
    final_event_list = final_event_list.concat(
      get_event_instances_in_dates(event, from, to)
    );
  });
  return final_event_list.sort((e1, e2)=> e1.start_date - e2.start_date);
}

function get_event_instances_in_dates(event, from, to) {
  if (event.start_date > to || event.end_date < from || from > to) {
    return [];
  }
  if (event.all_day) {
    event.start_date = new Date(event.start_date).setHours(0, 0, 0, 0);
    event.end_date = new Date(event.end_date).setHours(23, 59, 59, 999);
  }
  var event_list = [];
  if (!('recurrence' in event)) {
    if (is_event_in_range(event.start_date, event.end_date, from, to)) {
      event_list.push(event);
    }
    return event_list;
  }

  var get_next_fn;
  var offset = time_unit_to_ms[event.recurrence.unit];

  var event_length = event.end_date - event.start_date;
  switch (event.recurrence.unit) {
    case 'hour':
    case 'day':
    case 'week':
      get_next_fn = (timestamp, count) => {
        get_next_generic(offset, timestamp, count)
      };
      break;
    case 'year':
      get_next_fn = get_next_year;
      break;
    case 'month':
      get_next_fn = get_next_month;
      break;
  }
  var cur_start = event.start_date;
  var cur_end;
  if (event.start_date < from) {
    // find first event occurrence that starts before specified date range
    cur_start = get_next_fn(cur_start, (from - event_list.start_date)/offset);
  }

  while (cur_start <= event.to) {
    cur_end = cur_start + event_length;
    if (is_event_in_range(cur_start, cur_end, from, to)) {
      add_event(event_list, cur_start, cur_end);
    }
    cur_start = get_next_fn(cur_start, 1);
  }
  return event_list;
}

function get_next_generic(offset, timestamp, num) {
  return timestamp + num*offset;
}

function get_next_month(timestamp, num) {
  if (num <= 0) {
    return timestamp;
  }
  var date = new Date(timestamp);
  var months = date.getMonth() + num;
  date.setFullYear(date.getFullYear() + months/12);
  date.setMonth((months)%12);
  return date.getTime();
}

function get_next_year(timestamp, num) {
  if (num <= 0) {
    return timestamp;
  }
  var date = new Date(timestamp);
  date.setFullYear(date.getFullYear() + num);
  return date.getTime();
}

function is_event_in_range(event_start, event_end, from, to) {
  if (event_start > event_end || from > to) {
    throw RangeException();
  }
  return (
    (event_start <= from && event_end >= to) || // --S-+++++++-E--
    (event_end >= from && event_end <= to) || //   --S-++++++E+---
    (event_start >= from && event_start <= to) //  ---+S++++++-E--
  );
}

function add_event(event_list, old_event, from, to) {
  var new_event = extend({}, old_event);
  var same_id = event_list.filter((e) => e.id.split(':', 1)[0] == new_event.id);
  new_event.id += ':' + same_id.length;
  new_event.start_date = from;
  new_event.end_date = to;
  event_list.push(new_event);
}

module.exports = {
  is_event_in_range: is_event_in_range,
  get_event_instances_in_dates: get_event_instances_in_dates,
  get_events_in_dates: get_events_in_dates
};
