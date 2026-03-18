import { readable } from 'svelte/store';

export const t = readable((key, vars) => {
	if (key === 'pagination.page_of') {
		return `Page ${vars.current} of ${vars.total}`;
	}
	if (key === 'pagination.previous') {
		return 'Previous';
	}
	if (key === 'pagination.next') {
		return 'Next';
	}
	return key;
});
