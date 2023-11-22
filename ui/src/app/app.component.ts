import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from '@/app/core/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(
    router: Router,
    translate: TranslateService,
    $settings: SettingsService,
  ) {
    console.log('Browser Culture Lang:', translate.getBrowserCultureLang());
    console.log('Browser Lang:', translate.getBrowserLang());

    // this array needs to be updated each time a new translation is added
    const languages = [
      'en',
      'de',
      'fr',
      'pl',
      'cs',
      'ru',
      'zh-CN',
      'zh-TW',
      'hu',
      'ja',
      'es',
      'nl',
      'tr',
      'it',
      'bg',
      'sv',
      'no',
      'sl',
      'pt-BR',
      'pt',
      'id',
      'ca',
      'ko',
      'mk',
      'th',
      'uk',
      'he',
    ];

    // which languages should use RTL
    const rtlLanguages = [
      'he',
    ];

    // watch for lang changes
    translate.onLangChange.subscribe(() => {
      $settings.rtl = rtlLanguages.includes(translate.currentLang);
    });

    const browserLang = languages.find(x => x === translate.getBrowserLang() || x === translate.getBrowserCultureLang());

    for (const lang of languages) {
      translate.setTranslation(lang, require('../i18n/' + lang + '.json'));
    }

    if (browserLang) {
      translate.use(browserLang);
    } else {
      translate.setDefaultLang('en');
    }

    // ensure the menu closes when we navigate
    router.events.subscribe((event: any) => {
      const target = event.target;
      if (event instanceof NavigationEnd && !target.hasClass('dropdown-toggle')) {
        const dropdownMenu = window.document.querySelector('#navbarSupportedContent');
        const hamburgerMenuButton = window.document.querySelector('.navbar-toggler');
        if (dropdownMenu) {
          dropdownMenu.classList.remove('show');
          hamburgerMenuButton.classList.add('collapsed');
        }
      }
    });
  }
}
