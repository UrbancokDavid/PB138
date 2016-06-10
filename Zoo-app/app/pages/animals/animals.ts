import {NavController, Page, Toast} from 'ionic-angular';
import {GeneralProvider} from '../../providers/general-provider';


@Page({
  templateUrl: 'build/pages/animals/animals.html',
})
export class Animals {
  animals = [];

  constructor(
    private nav: NavController,
    private generalProvider: GeneralProvider
  ) {
    this.doRefresh();
  }

  doRefresh(force: boolean = false) {
    console.log("refreshing...");
    this.generalProvider.getAllAnimals(force).then(animals => {
      this.animals = animals;
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
}
