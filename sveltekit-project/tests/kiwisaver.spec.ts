import { test, expect } from '@playwright/test';
import { get } from 'svelte/store';
import { t } from '$lib/stores/localeStore';

test('KiwiSaver form validation - valid input', async ({ page }) => {
  await page.goto('/kiwisaver');
  
  // Fill form
  // Select employee rate
  await page.getByLabel(get(t)('kiwisaver.employee_rate')).click();
  await page.getByRole('option', { name: '4%' }).click();
  
  // Input employer rate
  await page.getByLabel(get(t)('kiwisaver.employer_rate')).fill('3');
  
  // Submit
  await page.getByRole('button', { name: get(t)('kiwisaver.save') }).click();
  
  // Verify success message
  await expect(page.getByTestId('success-message')).toBeVisible();
});

test('KiwiSaver form validation - invalid input', async ({ page }) => {
  await page.goto('/kiwisaver');
  
  // Fill form with invalid data
  await page.getByLabel(get(t)('kiwisaver.employee_rate')).click();
  // Selecting 3.5% (valid)
  await page.getByRole('option', { name: '3.5%' }).click();
  
  // Input employer rate that is too low
  await page.getByLabel(get(t)('kiwisaver.employer_rate')).fill('1');
  
  // Submit
  await page.getByRole('button', { name: get(t)('kiwisaver.save') }).click();
  
  // Verify error message
  await expect(page.getByTestId('error-message')).toBeVisible();
});

test('KiwiSaver form required indicators', async ({ page }) => {
  await page.goto('/kiwisaver');
  
  // Check required labels for '*' indicator
  const requiredLabels = [
    page.getByLabel(get(t)('kiwisaver.employee_rate')),
    page.getByLabel(get(t)('kiwisaver.employer_rate')),
    page.getByLabel(get(t)('kiwisaver.esct_rate'))
  ];
  
  for (const label of requiredLabels) {
    // The Label component is a separate component.
    // The required indicator is usually on the label tag itself.
    // The label is a wrapper around the input, so getByLabel should find it.
    // Wait, the label component renders a <label> tag.
    // Let's find the label tag directly if getByLabel doesn't work.
  }
  
  // Alternative: check for elements with the class
  await expect(page.locator('.after\\:content-\\[\\'\\*\\'\\]')).toHaveCount(3);
});
