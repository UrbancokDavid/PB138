import {NavController, Page, Toast} from 'ionic-angular';
import {NewsData} from '../../providers/news-data'


@Page({
  templateUrl: 'build/pages/news/news.html'
})
export class Page3 {
  news = [];

  constructor(private nav: NavController, private newsData: NewsData) {
    this.doRefresh();
  }

  doRefresh(refresher: any = null, force: boolean = false) {
    console.log("refreshing...");
    this.newsData.getAllNews(force).then(news => {
      this.news = news;
      console.log("done");
    }).catch(() => {
      console.log("failed");
      let toast = Toast.create({
        message: 'Unable to get connect to server.',
        showCloseButton: true,
        duration: 3000
      });
      this.nav.present(toast);
    }).then(() => {
      if (refresher) {
        refresher.complete();
      }
    });
  }

  flushNewsCache() {
    this.newsData.flushCache();
  }
}
