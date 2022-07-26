import format from 'date-fns/format';
import isThisYear from 'date-fns/isThisYear';
import isToday from 'date-fns/isToday';

export const dateFormat = (date: Date): string => {
	date = new Date(date);

	if (isToday(date)) {
		return format(date, 'HH:mm');
	} else if (isThisYear(date)) {
		return format(date, 'Mo MMM HH:mm');
	} else {
		return format(date, 'YYYY.MM.dd HH:mm');
	}
};
