import {Page} from 'ionic-angular';
import {Page1} from '../animals/animals';
import {Page2} from '../events/events';
import {Page3} from '../news/news';


@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = Page1;
  tab2Root: any = Page2;
  tab3Root: any = Page3;
}
