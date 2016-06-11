import {NavController, Page, Toast, Refresher} from 'ionic-angular';
import {GeneralProvider} from '../../providers/general-provider';
import {Settings} from '../../common/settings'
import {EventdetailsPage} from "../eventdetails/eventdetails";


@Page({
  templateUrl: 'build/pages/events/events.html',
})
export class Events {
  events = [];
  settings = Settings;

  constructor(
    private nav: NavController,
    private generalProvider: GeneralProvider
  ) {
    this.doRefresh();
  }

  doRefresh(refresher: Refresher = null, force: boolean = false) {
    console.log("refreshing...");
    this.generalProvider.getAllEvents(force).then(events => {
      this.events = events;
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
    this.nav.push(EventdetailsPage, item);
  }
}
