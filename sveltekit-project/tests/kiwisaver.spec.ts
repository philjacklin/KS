import { test, expect } from '@playwright/test';

test('KiwiSaver form validation - valid input', async ({ page }) => {
  await page.goto('/kiwisaver');
  
  // Fill form
  await page.fill('input[name="employeeContributionRate"]', '4%');
  await page.fill('input[name="employerContributionRate"]', '3%');
  
  // Submit
  await page.click('button[value="save"]');
  
  // Verify success message
  // Based on +page.svelte, it uses 'kiwisaver.settings_saved' key
  // Playwright needs to wait for the page to update
  await expect(page.getByText('Settings saved')).toBeVisible(); 
});

test('KiwiSaver form validation - invalid input', async ({ page }) => {
  await page.goto('/kiwisaver');
  
  // Fill form with invalid data
  await page.fill('input[name="employeeContributionRate"]', '2%');
  
  // Submit
  await page.click('button[value="save"]');
  
  // Verify error message
  // The error message comes from the server: 'Invalid employee contribution rate. Must be at least 3.5%.'
  await expect(page.getByText('Invalid employee contribution rate. Must be at least 3.5%.')).toBeVisible();
});
