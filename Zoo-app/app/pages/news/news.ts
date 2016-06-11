import {NavController, Page, Toast, Refresher} from 'ionic-angular';
import {GeneralProvider} from '../../providers/general-provider';
import {Settings} from '../../common/settings'
import {NewsdetailsPage} from "../newsdetails/newsdetails";


@Page({
  templateUrl: 'build/pages/news/news.html'
})
export class News {
  news = [];
  settings = Settings;

  constructor(private nav: NavController, private newsData: GeneralProvider) {
    this.doRefresh();
  }

  doRefresh(refresher: Refresher = null, force: boolean = false) {
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
    }).then(() => {
      if (refresher) {
        refresher.complete();
      }
    });
  }
  
  open(item) {
    this.nav.push(NewsdetailsPage, item);
  }
}
