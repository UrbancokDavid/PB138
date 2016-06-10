import {NavController, Page, Toast} from 'ionic-angular';
import {GeneralProvider} from '../../providers/general-provider';
import {Settings} from '../../common/settings'


@Page({
  templateUrl: 'build/pages/news/news.html'
})
export class News {
  news = [];
  settings = Settings;

  constructor(private nav: NavController, private newsData: GeneralProvider) {
    this.doRefresh();
  }

  doRefresh(force: boolean = false) {
    console.log("refreshing...");
    this.newsData.getAllNews(force).then(news => {
      this.news = news;
      console.log("done");
    }).catch(() => {
      console.log("failed");
      let toast = Toast.create({
        message: 'Unable to connect to server.',
        showCloseButton: true,
        duration: 3000
      });
      this.nav.present(toast);
    });
  }

  flushNewsCache() {
    this.newsData.flushCache();
  }
}
