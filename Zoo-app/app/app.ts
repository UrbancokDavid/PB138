import {ViewChild} from '@angular/core';
import {App, Platform, MenuController, Nav} from 'ionic-angular';
import {Routes} from '@angular/router';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {SettingsPage} from './pages/settings/settings';
import {QrcodePage} from './pages/qrcode/qrcode';
import {About} from './pages/about/about';
import {DataProvider} from './common/data-provider';
import {UserSettings} from './providers/user-settings';
import {GeneralProvider} from './providers/general-provider';


@App({
  templateUrl: 'build/app.html',
  providers: [DataProvider, GeneralProvider, UserSettings],
  config: {}
})
@Routes([
  { path: '/set', component: SettingsPage },
  { path: '/qr', component: QrcodePage },
  { path: '/about/:id', component: About }
])
/*
Routing doesn't work in Ionic curretly:
 https://github.com/driftyco/ionic/issues/5479
 */
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = TabsPage;
  pages = [
    { title: 'Scan QR code', component: QrcodePage },
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

  openPage(page) {
    this.menu.close();
    this.nav.push(page.component);
  }
}
