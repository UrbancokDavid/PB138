import {App, Platform, IonicApp, MenuController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {AboutPage} from './pages/about/about';
import {NewsData} from './providers/news-data';
import {DataProvider} from './common/data-provider';


@App({
  templateUrl: 'build/app.html',
  providers: [NewsData, DataProvider],
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
  rootPage: any = TabsPage;
  private app;
  private platform;
  private menu;
  private pages;

  constructor(app: IonicApp, platform: Platform, menu: MenuController) {
    this.app = app;
    this.platform = platform;
    this.menu = menu;

    this.initializeApp();

    this.pages = [
      { title: 'About', component: AboutPage}
    ];
  };

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    this.menu.close()
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  }
}
