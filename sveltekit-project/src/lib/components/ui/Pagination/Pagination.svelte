<script lang="ts">
	import { t } from '$lib/stores/localeStore';

	// 1. CORRECTED: Props are declared with `let` and `$props()`.
	let {
		currentPage = 1,
		totalItems = 0,
		itemsPerPage = 10,
		onPageChange = (page: number) => {}
	} = $props();

	const totalPages = $derived(Math.ceil(totalItems / itemsPerPage));
    const isFirstPage = $derived(currentPage === 1);
    const isLastPage = $derived(currentPage === totalPages);

	function handlePrevious() {
		if (!isFirstPage) {
			onPageChange(currentPage - 1);
		}
	}

	function handleNext() {
		if (!isLastPage) {
			onPageChange(currentPage + 1);
		}
	}
</script>

{#if totalPages > 1}
	<!-- 2. CORRECTED: Applied theme colors and spacing for Soft aesthetic -->
	<nav
		class="flex items-center justify-between gap-6 bg-white p-3 rounded-payroll shadow-payroll"
		aria-label={$t('pagination.label')}
	>
		<!-- 3. CORRECTED: Applied theme styles and localization -->
		<button
			onclick={handlePrevious}
			disabled={isFirstPage}
			class="px-md py-sm font-semibold text-payroll-teal bg-white border border-payroll-teal/10 rounded-payroll hover:bg-payroll-teal/5 disabled:opacity-50 disabled:pointer-events-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-payroll-teal enabled:cursor-pointer"
		>
			{$t('pagination.previous')}
		</button>

		<div class="text-sm font-medium text-payroll-teal/80">
			{$t('pagination.page_of', { current: currentPage, total: totalPages })}
		</div>

		<!-- 4. CORRECTED: Applied theme styles and localization -->
		<button
			onclick={handleNext}
			disabled={isLastPage}
			class="px-md py-sm font-semibold text-payroll-teal bg-white border border-payroll-teal/10 rounded-payroll hover:bg-payroll-teal/5 disabled:opacity-50 disabled:pointer-events-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-payroll-teal enabled:cursor-pointer"
		>
			{$t('pagination.next')}
		</button>
	</nav>
{/if}

