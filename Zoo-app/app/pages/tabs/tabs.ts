import {Page} from 'ionic-angular';
import {Animals} from '../animals/animals';
import {Events} from '../events/events';
import {News} from '../news/news';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';

@Page({
  templateUrl: 'build/pages/tabs/tabs.html',
  pipes: [TranslatePipe]
})
export class TabsPage {
  constructor(private translate: TranslateService) {}
  
  tab1Root: any = News;
  tab2Root: any = Events;
  tab3Root: any = Animals;
}
