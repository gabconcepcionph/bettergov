import { expect, test } from '@playwright/test';

const escapeRegExp = (text: string) =>
  text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

test('should render visa types landing structure', async ({ page }) => {
  await page.goto('/travel/visa-types');

  await expect(
    page.getByRole('heading', { name: 'Philippines Visa Types' })
  ).toBeVisible();

  await expect(
    page.getByText(
      'Explore different types of visas available for travel to the Philippines'
    )
  ).toBeVisible();

  await expect(page.getByPlaceholder('Search visa types...')).toBeVisible();

  await expect(
    page.getByRole('heading', { name: 'Visa Categories' })
  ).toBeVisible();

  const categoryButtons = page.getByRole('button', { name: /Visas$/ });
  expect(await categoryButtons.count()).toBeGreaterThan(0);
  await expect(categoryButtons.first()).toBeVisible();

  const visaLinks = page.getByRole('link', { name: /Visa/ });
  expect(await visaLinks.count()).toBeGreaterThan(0);
  await expect(visaLinks.first()).toBeVisible();

  await expect(
    page.getByRole('heading', { level: 3, name: 'Important Notice' })
  ).toBeVisible();
});

test('should render visa detail layout structure', async ({ page }) => {
  await page.goto('/travel/visa-types');

  const visaLinks = page.getByRole('link', { name: /Visa/ });
  const firstVisaLink = visaLinks.first();
  const targetHref = await firstVisaLink.getAttribute('href');
  const firstVisaName = (await firstVisaLink.textContent())?.trim() ?? '';

  expect(targetHref).toBeTruthy();

  await firstVisaLink.click();
  await page.waitForURL(`**${targetHref}`);

  await expect(
    page.getByRole('heading', { name: 'Philippines Visa Types' })
  ).toBeVisible();

  await expect(page.getByPlaceholder('Search visa types...')).toBeVisible();

  await expect(
    page.getByRole('link', { name: 'Back to Visa Types' })
  ).toBeVisible();

  if (firstVisaName) {
    await expect(
      page.getByRole('heading', {
        level: 2,
        name: new RegExp(escapeRegExp(firstVisaName), 'i'),
      })
    ).toBeVisible();
  } else {
    await expect(page.getByRole('heading', { level: 2 }).first()).toBeVisible();
  }

  await expect(
    page.getByRole('heading', { level: 3, name: 'Minimum Requirements' })
  ).toBeVisible();

  await expect(
    page.getByRole('listitem', { name: /Valid passport/i }).first()
  ).toBeVisible();

  const stepsHeading = page.getByRole('heading', { level: 3, name: 'Steps' });
  if ((await stepsHeading.count()) > 0) {
    await expect(stepsHeading.first()).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 4, name: /Check Eligibility/i })
    ).toBeVisible();
  }

  const subtypesHeading = page.getByRole('heading', {
    level: 3,
    name: 'Visa Subtypes',
  });
  if ((await subtypesHeading.count()) > 0) {
    await expect(subtypesHeading.first()).toBeVisible();
    await expect(page.getByRole('heading', { level: 4 }).first()).toBeVisible();
  }

  await expect(
    page.getByRole('heading', { level: 3, name: 'Important Notice' })
  ).toBeVisible();
});

test('should render 13G visa detail directly', async ({ page }) => {
  await page.goto('/travel/visa-types/13g');

  await expect(
    page.getByRole('heading', { name: 'Philippines Visa Types' })
  ).toBeVisible();

  await expect(
    page.getByRole('heading', {
      level: 2,
      name: 'Returning Former Natural-Born Filipino Citizen (13G)',
    })
  ).toBeVisible();

  await expect(
    page.getByRole('heading', { level: 3, name: 'Minimum Requirements' })
  ).toBeVisible();

  await expect(
    page.getByRole('listitem', { name: /Valid passport/i }).first()
  ).toBeVisible();

  const stepsHeading = page.getByRole('heading', { level: 3, name: 'Steps' });
  await expect(stepsHeading.first()).toBeVisible();
  await expect(
    page.getByRole('heading', { level: 4, name: /Check Eligibility/i })
  ).toBeVisible();

  await expect(
    page.getByRole('heading', { level: 3, name: 'Important Notice' })
  ).toBeVisible();
});

test('should render 13A visa detail directly', async ({ page }) => {
  await page.goto('/travel/visa-types/13a');

  await expect(
    page.getByRole('heading', { name: 'Philippines Visa Types' })
  ).toBeVisible();

  await expect(
    page.getByRole('heading', {
      level: 2,
      name: 'Immigrant Visa by Marriage (13A)',
    })
  ).toBeVisible();

  await expect(
    page.getByRole('heading', { level: 3, name: 'Minimum Requirements' })
  ).toBeVisible();

  await expect(
    page.getByRole('listitem', { name: /Valid passport/i }).first()
  ).toBeVisible();

  const stepsHeading = page.getByRole('heading', { level: 3, name: 'Steps' });
  await expect(stepsHeading.first()).toBeVisible();
  await expect(
    page.getByRole('heading', { level: 4, name: /Check Eligibility/i })
  ).toBeVisible();

  await expect(
    page.getByRole('heading', { level: 3, name: 'Important Notice' })
  ).toBeVisible();
});
