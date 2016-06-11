import {NavController, Page, Refresher} from 'ionic-angular';
import {GeneralProvider} from '../../providers/general-provider';
import {Settings} from '../../common/settings'
import {NewsdetailsPage} from "../newsdetails/newsdetails";
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Tools} from '../../common/tools';


@Page({
  templateUrl: 'build/pages/news/news.html',
  pipes: [TranslatePipe]
})
export class News {
  news = [];
  settings = Settings;

  constructor(
    private nav: NavController,
    private newsData: GeneralProvider,
    private translate: TranslateService
  ) {
    this.doRefresh();
  }

  localize(val) {
    return this.translate.get(val)['value'];
  }

  doRefresh(refresher: Refresher = null, force: boolean = false) {
    console.log("refreshing...");
    this.newsData.getAllNews(force).then(news => {
      this.news = news;
      console.log("done");
    }).catch(() => {
      Tools.showInfoToast(
        this.nav, this.localize('connection_problem'), this.localize('cancel')
      );
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
