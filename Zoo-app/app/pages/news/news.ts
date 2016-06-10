import {NavController, Page, Toast} from 'ionic-angular';
import {NewsData} from '../../providers/news-data';
import {GeneralProvider} from '../../providers/general-provider';


@Page({
  templateUrl: 'build/pages/news/news.html'
})
export class News {
  news = [];

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
