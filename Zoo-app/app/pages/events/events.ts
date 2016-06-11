import {NavController, Page, Refresher} from 'ionic-angular';
import {GeneralProvider} from '../../providers/general-provider';
import {Settings} from '../../common/settings'
import {EventdetailsPage} from "../eventdetails/eventdetails";
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Tools} from '../../common/tools';


@Page({
  templateUrl: 'build/pages/events/events.html',
  pipes: [TranslatePipe]
})
export class Events {
  events = [];
  settings = Settings;

  constructor(
    private nav: NavController,
    private generalProvider: GeneralProvider,
    private translate: TranslateService
  ) {
    this.doRefresh();
  }

  localize(val) {
    return this.translate.get(val)['value'];
  }

  doRefresh(refresher: Refresher = null, force: boolean = false) {
    console.log("refreshing...");
    this.generalProvider.getAllEvents(force).then(events => {
      this.events = events;
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
    this.nav.push(EventdetailsPage, item);
  }
}
