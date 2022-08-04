import { test, expect } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse'
import lighthouseDesktopConfig from 'lighthouse/lighthouse-core/config/lr-desktop-config';

const playwright = require('playwright');

test('Lighthouse Test', async ({page}) => {

  test.setTimeout(300000);

   const browser = await playwright['chromium'].launch({
    args: ['--remote-debugging-port=9222'],
  });

  await page.goto('http://zero.webappsecurity.com/');

  await playAudit({
    config: lighthouseDesktopConfig,
    page: page,
    port: 9222,
    thresholds: {
      performance: 50,
      accessibility:50
    },
    reports: {
      formats: {
        html: true, //defaults to false
      },
      name: 'Lighthouse - '+await page.title()+'_Report'}
  });

  await page.click('#signin_button')

  await playAudit({
    config: lighthouseDesktopConfig,
    page: page,
    port: 9222,
    thresholds: {
      performance: 50,
      accessibility:50
    },
    reports: {
      formats: {
        html: true, //defaults to false
      },
      name: 'Lighthouse - '+await page.title()+'_Report'}
  });

  await page.fill('#user_login','username')

  await page.fill('#user_password','password')

  await page.click('text=Sign in')

  await page.goto('http://zero.webappsecurity.com/online-banking.html')

  await playAudit({
    config: lighthouseDesktopConfig,
    page: page,
    port: 9222,
    thresholds: {
      performance: 50,
      accessibility:50
    },
    reports: {
      formats: {
        html: true, //defaults to false
      },
      name: 'Lighthouse - '+await page.title()+'_Report'
    }
  });

  await browser.close();

});