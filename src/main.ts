/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { registerLocaleData } from '@angular/common';
import { loadTranslations } from '@angular/localize';


const localeData: Record<string, () => Promise<any>> = {
  'es': () => import('@angular/common/locales/es'),
  'en': () => import('@angular/common/locales/en')
};

const translations: Record<string, () => Promise<any>> = {
  'es': () => import('./i18n/messages.json'),
  'en': () => import('./i18n/messages.en.json')
};

function normalizeLocale(l: string | null): 'es' | 'en' {
  const v = (l ?? '').toLowerCase();
  if (v.startsWith('en')) return 'en';
  return 'es';
}

async function start() {
  const stored = localStorage.getItem('locale');
  const browser = typeof navigator !== 'undefined' ? navigator.language : 'es';
  const locale = normalizeLocale(stored ?? browser);
  
  const mod = await localeData[locale]();
  if (mod?.default) registerLocaleData(mod.default);
  const t = await translations[locale]();
  const dict = t?.default?.translations ?? t?.default;
  
  if (dict) loadTranslations(dict);


  await bootstrapApplication(App,  {...appConfig, providers: [
    ...(appConfig.providers ?? []),
    {
      provide: 'LOCALE_ID',
      useValue: locale
    }
  ]});
  document.querySelector('app-root')?.classList.add('app-ready');
}

start();