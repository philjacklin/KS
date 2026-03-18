<script lang="ts">
	import Pagination from './Pagination.svelte';
	import { t } from '$lib/stores/localeStore';

	let {
		currentPage = 1,
		totalPages = 1,
		onPageChange = (page: number) => {}
	} = $props();
</script>

<Pagination {currentPage} {totalPages} {onPageChange} />

