import {ViewChild} from '@angular/core';
import {App, Platform, MenuController, Nav} from 'ionic-angular';
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

declare var cordova: any;

@App({
  templateUrl: 'build/app.html',
  providers: [DataProvider, GeneralProvider, UserSettings],
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
    { title: 'Settings', component: SettingsPage },
    { title: 'About', component: About }
  ];

  constructor(private platform: Platform, private menu: MenuController) {
    this.initializeApp();
  };

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
    });
  }
  
  scanQrCode() {
    this.menu.close();
    try {
      cordova;
    } catch(err) {
      Tools.showInfoToast(
        this.nav,
        "This feature is not supported on this type of device.",
        'Close'
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
          Tools.showInfoToast(this.nav, 'Invalid format link format', 'Close');
        }
        let link = result.text.split(prefix).slice(1).join(prefix);
        Tools.showInfoToast(this.nav, 'Link: ' + link, 'Close');
      },
      (error) => {
        Tools.showInfoToast(this.nav, 'Scanning failed!', 'Close');
      }
    );
  }

  openPage(page) {
    this.menu.close();
    this.nav.push(page.component);
  }
}
