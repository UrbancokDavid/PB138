import {App, Platform, IonicApp, MenuController, NavController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {About} from './pages/about/about';
import {NewsData} from './providers/news-data';
import {DataProvider} from './common/data-provider';


@App({
  templateUrl: 'build/app.html',
  providers: [NewsData, DataProvider],
  config: {}
})
export class MyApp {
  rootPage: any = TabsPage;
  private app;
  private platform;
  private menu;
  private pages;
  private nav;

  constructor(app: IonicApp, platform: Platform, menu: MenuController) {
    this.app = app;
    this.platform = platform;
    this.menu = menu;

    this.initializeApp();

    this.pages = [
      { title: 'About', component: About}
    ];
  };

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();

      this.nav= this.app.getComponent("nav");
    });
  }

  openPage(page) {
    this.menu.close()
    this.nav.setRoot(page.component);
  }
}
