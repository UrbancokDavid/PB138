import {ViewChild, provide} from '@angular/core';
import {App, Platform, MenuController, Nav, Events} from 'ionic-angular';
import {Routes} from '@angular/router';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {SettingsPage} from './pages/settings/settings';
import {About} from './pages/about/about';
import {DataProvider} from './common/data-provider';
import {UserSettings} from './providers/user-settings';
import {GeneralProvider} from './providers/general-provider';
import {Tools} from './common/tools';
import {Settings} from './common/settings';
import {
  TranslateLoader,
  TranslateStaticLoader,
  TranslateService,
  TranslatePipe
} from 'ng2-translate/ng2-translate';
import {Http} from "@angular/http";


declare var cordova: any;

@App({
  templateUrl: 'build/app.html',
  providers: [
    DataProvider,
    GeneralProvider,
    UserSettings,
    TranslateService,
    provide(TranslateLoader, {
      useFactory: (http: Http) => new TranslateStaticLoader(
        http, 'assets/i18n', '.json'
      ),
      deps: [Http]
    })
  ],
  pipes: [TranslatePipe],
  config: {}
})
@Routes([
  { path: '/set', component: SettingsPage },
  { path: '/about/:id', component: About }
])
/*
Routing doesn't work in Ionic currently:
 https://github.com/driftyco/ionic/issues/5479
 */
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = TabsPage;
  pages = [
    { title: 'settings', component: SettingsPage },
    { title: 'about_app', component: About }
  ];

  constructor(
    private platform: Platform,
    private menu: MenuController,
    private translate: TranslateService,
    private userSettings: UserSettings,
    private events: Events
  ) {
    this.initializeTranslateServiceConfig();
    events.subscribe('language:change', (lang) => {
      translate.use(lang[0]);
    });
    this.initializeApp();
  };

  localize(val) {
    return this.translate.get(val)['value'];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
    });
  }

  initializeTranslateServiceConfig() {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.userSettings.getLanguage().then((lang) => {
      this.translate.use(lang);
    });
  }
  
  scanQrCode() {
    this.menu.close();
    try {
      cordova;
    } catch(err) {
      Tools.showInfoToast(
        this.nav, this.localize('feature_not_supported'), this.localize('close')
      );
      return;
    }
    cordova.plugins.barcodeScanner.scan(
      (result) => {
        let prefix = Settings.deeplink_prefix;
        if (result.cancelled) {
          return;
        }
        if (!result.text.startWith(prefix)) {
          setTimeout(() => {
            Tools.showInfoToast(
              this.nav,
              this.localize('invalid_link_format'),
              this.localize('close')
            );
          }, 1000);
        }
        let link = result.text.split(prefix).slice(1).join(prefix);
        setTimeout(() => {
          Tools.showInfoToast(this.nav, 'Link: ' + link, this.localize('close'));
        }, 1000);
      },
      (error) => {
        Tools.showInfoToast(
          this.nav, this.localize("scan_failed"), this.localize('close')
        );
      }
    );
  }

  openPage(page) {
    this.menu.close();
    this.nav.push(page.component);
  }
}
