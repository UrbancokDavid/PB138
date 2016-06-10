import {Page} from 'ionic-angular';
import {Animals} from '../animals/animals';
import {Events} from '../events/events';
import {News} from '../news/news';


@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  tab1Root: any = News;
  tab2Root: any = Events;
  tab3Root: any = Animals;
}
