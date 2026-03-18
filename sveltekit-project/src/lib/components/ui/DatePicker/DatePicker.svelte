<script lang="ts">
	import { datePicker } from './variants';
	import { cn } from '$lib/utils';
	import { t, locale } from '$lib/stores/localeStore';
	import { tick } from 'svelte';
	import Icon from '$lib/components/ui/Icon/Icon.svelte';

	/**
	 * @component
	 * A date picker component that allows users to select a date from a calendar or enter it manually.
	 * Compliant with i18n using the app localeStore.
	 */
	let {
		value = $bindable(null),
		placeholder = $t('datepicker.placeholder') || 'DD/MM/YYYY',
		className = undefined,
		disabled = false,
		error = false,
		...restProps
	} = $props();

	// --- State Runes ---
	let isOpen = $state(false);
	let currentMonth = $state(new Date());
	let inputValue = $state('');
	let errorMessage = $state('');
	let containerRef = $state<HTMLDivElement | null>(null);
	let inputRef = $state<HTMLInputElement | null>(null);
	let calendarRef = $state<HTMLDivElement | null>(null);

	const prevIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>`;
	const nextIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>`;

	// --- Reactivity & Sync ---
	$effect(() => {
		if (value) {
			const date = value instanceof Date ? value : new Date(value);
			if (!isNaN(date.getTime())) {
				currentMonth = date;
				inputValue = formatDate(date);
				errorMessage = '';
			}
		}
	});

	// --- Formatting Logic ---
	// Uses the current locale from the store
	function formatDate(date: Date): string {
		return new Intl.DateTimeFormat($locale, {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		}).format(date);
	}

	function toIsoDateString(date: Date): string {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	}

	function isValidDate(dateString: string): boolean {
		// Standardized check for DD/MM/YYYY
		const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
		const match = dateString.match(regex);
		if (!match) return false;

		const day = parseInt(match[1], 10);
		const month = parseInt(match[2], 10);
		const year = parseInt(match[3], 10);

		if (month < 1 || month > 12) return false;
		const daysInMonth = new Date(year, month, 0).getDate();
		return day >= 1 && day <= daysInMonth;
	}

	function parseDate(dateString: string): Date | null {
		if (!isValidDate(dateString)) return null;
		const parts = dateString.split('/');
		const day = parseInt(parts[0], 10);
		const month = parseInt(parts[1], 10) - 1;
		const year = parseInt(parts[2], 10);
		return new Date(year, month, day);
	}

	// --- Handlers ---
	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		inputValue = target.value;

		if (inputValue === '') {
			value = null;
			errorMessage = '';
			return;
		}

		const date = parseDate(inputValue);
		if (date) {
			value = date;
			currentMonth = date;
			errorMessage = '';
		} else {
			errorMessage = $t('datepicker.error_invalid_format') || 'Invalid date format.';
			value = null;
		}
	}

async function toggleCalendar() {
    if (!disabled) {
        isOpen = !isOpen;
        if (isOpen) {
            await tick();
            // A single tick is usually enough if we ensure the DOM is ready
            
            // 1. Try to find the selected date button
            const selected = calendarRef?.querySelector('button[aria-selected="true"]') as HTMLButtonElement;
            if (selected) {
                selected.focus();
                return;
            }

            // 2. Try to find today's date button
            // Use a more specific selector to ensure we hit a day button
            const today = calendarRef?.querySelector('button.today') as HTMLButtonElement;
            if (today) {
                today.focus();
                return;
            }

            // 3. Fallback: Find the first enabled day button of the current month
            // We look for tabindex=0 which we set only for current month days
            const firstEnabled = calendarRef?.querySelector('button[tabindex="0"]') as HTMLButtonElement;
            if (firstEnabled) {
                firstEnabled.focus();
            }
        }
    }
}

	function closeCalendar() {
		isOpen = false;
		inputRef?.focus();
	}

	function selectDate(date: Date) {
		value = date;
		inputValue = formatDate(date);
		errorMessage = '';
		closeCalendar();
	}

	function prevMonth() {
		currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
	}

	function nextMonth() {
		currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
	}

	// --- Date Logic ---
	const isSameDay = (d1: Date, d2: Date) =>
		d1 && d2 && d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();

	const isToday = (date: Date) => isSameDay(date, new Date());

	function getCalendarDays(viewMonth: Date) {
		const year = viewMonth.getFullYear();
		const month = viewMonth.getMonth();
		const firstDayOfMonth = new Date(year, month, 1);
		const daysInMonth: Date[] = [];
		const tempDate = new Date(year, month, 1);
		while (tempDate.getMonth() === month) {
			daysInMonth.push(new Date(tempDate));
			tempDate.setDate(tempDate.getDate() + 1);
		}

		let startDay = firstDayOfMonth.getDay();
		// Adjust for Monday start (standard in NZ and many locales)
		startDay = startDay === 0 ? 6 : startDay - 1;

		const days = [];
		for (let i = startDay; i > 0; i--) {
			days.push({ date: new Date(year, month, 1 - i), isCurrentMonth: false });
		}
		daysInMonth.forEach((date) => days.push({ date, isCurrentMonth: true }));

		const remainingDays = 7 - (days.length % 7);
		if (remainingDays < 7) {
			for (let i = 1; i <= remainingDays; i++) {
				days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
			}
		}
		return days;
	}

	// Re-calculates if the month OR the current month state changes
	let calendarDays = $derived(getCalendarDays(currentMonth));

	// Weekdays re-calculated based on current locale
	const weekdays = $derived.by(() => {
		const formatter = new Intl.DateTimeFormat($locale, { weekday: 'short' });
		const date = new Date(2024, 0, 1); // Jan 1 2024 is a Monday
		return Array.from({ length: 7 }, (_, i) => {
			const d = new Date(date);
			d.setDate(date.getDate() + i);
			return formatter.format(d);
		});
	});

	// --- Keyboard Navigation ---
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			event.preventDefault();
			toggleCalendar();
		}
		if (event.key === 'Escape') {
			closeCalendar();
		}
		if (event.key === 'ArrowDown' && !isOpen) {
			event.preventDefault();
			toggleCalendar();
		}
	}

	function handleCalendarKeydown(event: KeyboardEvent, date: Date) {
		const navigate = (offset: number) => {
			event.preventDefault();
			const newDate = new Date(date);
			newDate.setDate(date.getDate() + offset);
			focusDate(newDate);
		};

		switch (event.key) {
			case 'ArrowRight': navigate(1); break;
			case 'ArrowLeft': navigate(-1); break;
			case 'ArrowDown': navigate(7); break;
			case 'ArrowUp': navigate(-7); break;
			case 'Enter': event.preventDefault(); selectDate(date); break;
			case 'Escape': event.preventDefault(); closeCalendar(); break;
		}
	}

	async function focusDate(date: Date) {
		if (date.getMonth() !== currentMonth.getMonth()) {
			currentMonth = date;
		}
		await tick();
		const dateStr = toIsoDateString(date);
		const button = calendarRef?.querySelector(`button[data-date="${dateStr}"]`) as HTMLButtonElement;
		button?.focus();
	}

	// --- Global Listeners ---
	$effect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (containerRef && !containerRef.contains(event.target as Node)) {
				isOpen = false;
			}
		};
		if (isOpen) {
			document.addEventListener('click', handleClickOutside);
		}
		return () => document.removeEventListener('click', handleClickOutside);
	});

	// --- Classes ---
	const v = $derived(datePicker({ error: !!errorMessage || error }));
</script>

<div class={cn(v.base(), className)} bind:this={containerRef}>
	<input
		bind:this={inputRef}
		type="text"
		class={v.input()}
		{placeholder}
		value={inputValue}
		oninput={handleInput}
		onkeydown={handleKeydown}
		onclick={toggleCalendar}
		{disabled}
		aria-invalid={!!errorMessage || error}
		aria-describedby={errorMessage ? 'date-error' : undefined}
		{...restProps}
	/>
	{#if errorMessage}
		<div id="date-error" class="absolute bottom-[-20px] left-0 text-xs text-red-600">
			{errorMessage}
		</div>
	{/if}

	{#if isOpen}
		<div class={v.calendar()} bind:this={calendarRef} role="dialog" aria-modal="true" aria-label={$t('datepicker.dialog_label') || 'Choose Date'}>
			<div class={v.header()}>
				<button type="button" class={v.navButton()} onclick={prevMonth} aria-label={$t('datepicker.previous_month')}>
					<Icon svg={prevIcon} size="1.25rem" />
				</button>
				<span class="font-semibold text-payroll-teal">
					{currentMonth.toLocaleString($locale, { month: 'long', year: 'numeric' })}
				</span>
				<button type="button" class={v.navButton()} onclick={nextMonth} aria-label={$t('datepicker.next_month')}>
					<Icon svg={nextIcon} size="1.25rem" />
				</button>
			</div>

			<div class={v.grid()} role="grid">
				{#each weekdays as dayName}
					<div class={v.weekday()} role="columnheader" aria-label={dayName}>{dayName}</div>
				{/each}

				{#each calendarDays as { date, isCurrentMonth }}
					<button
    type="button"
    class={cn(
        v.day(),
        !isCurrentMonth && v.otherMonth(),
        isToday(date) && "today " + v.today(), // Ensure 'today' is a clean class
        value && isSameDay(date, value) && v.selectedDay()
    )}
    onclick={() => selectDate(date)}
    onkeydown={(e) => handleCalendarKeydown(e, date)}
    disabled={!isCurrentMonth}
    aria-selected={value && isSameDay(date, value) ? "true" : "false"}
    data-date={toIsoDateString(date)}
    tabindex={isCurrentMonth ? 0 : -1}
>{date.getDate()}</button>
				{/each}
			</div>
		</div>
	{/if}
</div>
