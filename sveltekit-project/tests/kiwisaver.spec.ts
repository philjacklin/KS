import { test, expect } from '@playwright/test';
import { get } from 'svelte/store';
import { t } from '$lib/stores/localeStore';

test('KiwiSaver form validation - valid input', async ({ page }) => {
  await page.goto('/kiwisaver');
  
  // Fill form
  await page.getByTestId('employee-contribution-rate').fill('4%');
  await page.getByTestId('employer-contribution-rate').fill('3%');
  
  // Submit
  await page.getByTestId('save-button').click();
  
  // Verify success message
  // The Alert component renders the message inside a <p> tag
  await expect(page.getByTestId('success-message')).toHaveText(get(t)('kiwisaver.settings_saved'));
});

test('KiwiSaver form validation - invalid input', async ({ page }) => {
  await page.goto('/kiwisaver');
  
  // Fill form with invalid data
  await page.getByTestId('employee-contribution-rate').fill('2%');
  
  // Submit
  await page.getByTestId('save-button').click();
  
  // Verify error message
  await expect(page.getByTestId('error-message')).toBeVisible();
});

test('KiwiSaver form required indicators', async ({ page }) => {
  await page.goto('/kiwisaver');
  
  // Check required labels for '*' indicator
  // The label component uses tailwind-variants to apply after:content-['*'] when required={true}
  const requiredLabels = [
    page.locator('label[for="employee-rate"]'),
    page.locator('label[for="employer-rate"]'),
    page.locator('label[for="esct-rate"]')
  ];
  
  for (const label of requiredLabels) {
    await expect(label).toHaveClass(/after:content-\['\*'\]/);
  }
});
