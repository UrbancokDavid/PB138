const extend = require('util')._extend;
const time_unit_to_ms = {
  year: 365*24*60*60*1000,
  month: 28*24*60*60*1000,
  week:   7*24*60*60*1000,
  day:      24*60*60*1000,
  hour:        60*60*1000
};

function get_events_in_dates(event_list, from, to) {
  let final_event_list = [];
  for (let event in event_list) {
    final_event_list = final_event_list.concat(
      get_event_in_dates(event, from, to)
    );
  }
  return final_event_list.sort((e1, e2)=> e1.start_date - e2.start_date);
}

function get_event_in_dates(event, from, to) {
  if (event.start_date > to || event.end_date < from || from < to) {
    return [];
  }
  let event_list = [];
  let get_next_fn;
  let offset = time_unit_to_ms[event.recurrence.unit];

  let event_length = event.end_date - event.start_date;
  switch (event.recurrence.unit) {
    case 'hour':
    case 'day':
    case 'week':
      get_next_fn = (timestamp, count=1) => {
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
  // var multiplier = event.recurrence.count * offset;
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
    cur_start = get_next_fn(cur_start);
  }
  return event_list;
}

// function get_event_in_dates(event, from, to) {
//   if (event.start_date > to || event.end_date < from || from < to) {
//     return [];
//   }
//   let event_list = [];
//   let multiplier = 0;
//   let event_length = event.end_date - event.start_date;
//   switch (event.recurrence.unit) {
//     case 'hour':
//     case 'day':
//     case 'week':
//       multiplier = event.recurrence.count * time_unit_to_ms[event.recurrence.unit];
//       var cur_start = event.start_date;
//       var cur_end = cur_start + event_length;
//       if (event.start_date < from) {
//         // find first event occurrence that starts before specified date range
//         cur_start = event.start_date + ((from - event.start_date)/multiplier)*multiplier;
//       }
//
//       while (cur_start <= event.to) {
//         cur_end = cur_start + event_length;
//         if (is_event_in_range(cur_start, cur_end, from, to)) {
//           add_event(event_list, cur_start, cur_end);
//         }
//         // if (multiplier <= 0) {
//         //   break;
//         // }
//         cur_start += multiplier;
//       }
//       break;
//     case 'year':
//       cur_start = event.start_date;
//       cur_end = cur_start + event_length;
//       multiplier = event.recurrence.count * 360*24*60*60*1000;
//       if (event.start_date < from) {
//         // find first event occurrence that starts before specified date range
//         cur_start = get_next_year((from - event.start_date)/multiplier, event.recurrence.count);
//       }
//       while (cur_start <= event.to) {
//         cur_end = cur_start + event_length;
//         if (is_event_in_range(cur_start, cur_end, from, to)) {
//           add_event(event_list, cur_start, cur_end);
//         }
//         cur_start = get_next_year(cur_start, event.recurrence.count);
//       }
//       break;
//     case 'month':
//       cur_start = event.start_date;
//       cur_end = cur_start + event_length;
//       multiplier = event.recurrence.count * 28*24*60*60*1000;
//       if (event.start_date < from) {
//         // find first event occurrence that starts before specified date range
//         cur_start = get_next_month((from - event.start_date)/multiplier, event.recurrence.count);
//       }
//       while (cur_start <= event.to) {
//         cur_end = cur_start + event_length;
//         if (is_event_in_range(cur_start, cur_end, from, to)) {
//           add_event(event_list, cur_start, cur_end);
//         }
//         cur_start = get_next_month(cur_start, event.recurrence.count);
//       }
//   }
// }

function get_next_generic(offset, timestamp, num=1) {
  return timestamp + num*offset;
}

function get_next_month(timestamp, num=1) {
  if (num <= 0) {
    return timestamp;
  }
  let date = new Date(timestamp);
  let months = date.getMonth() + num;
  date.setFullYear(date.getFullYear() + months/12);
  date.setMonth((months)%12);
  return date.getTime();
}

function get_next_year(timestamp, num=1) {
  if (num <= 0) {
    return timestamp;
  }
  let date = new Date(timestamp);
  date.setFullYear(date.getFullYear() + num);
  return date.getTime();
}

function is_event_in_range(event_start, event_end, from, to) {
  return (
    (event_start <= from && event_end >= to) || // --S--+++++++++++++++--F--
    (/*event_start <= from && */event_end >= from && event_end <= to ) || // -S--++++F+++++----
    (event_start >= from && event_end <= to/* && event_end >= to*/) // ---++++S+++++---F--
  );
}

function add_event(event_list, old_event, from, to) {
  let new_event = extend({}, old_event);
  let same_id = event_list.filter((e) => e.id.split(':', 1)[0] == new_event.id);
  new_event.id += ':' + same_id.length;
  new_event.start_date = from;
  new_event.end_date = to;
  delete new_event.recurrence;
  event_list.append(new_event);
}
