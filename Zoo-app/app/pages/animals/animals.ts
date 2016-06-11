import {NavController, Page, Toast, Refresher} from 'ionic-angular';
import {GeneralProvider} from '../../providers/general-provider';
import {Settings} from '../../common/settings';
import {AnimaldetailsPage} from "../animaldetails/animaldetails";
import {AnimalinfoPage} from "../animalinfo/animalinfo";


@Page({
  templateUrl: 'build/pages/animals/animals.html',
})
export class Animals {
  animals = [];
  filteredAnimals = [];
  settings = Settings;
  searchBarVisible: boolean = false;
  searchString: string = '';

  constructor(
    private nav: NavController,
    private generalProvider: GeneralProvider
  ) {
    this.doRefresh();
  }

  showSearchBar() {
    this.searchBarVisible = true;
  }

  hideSearchBar() {
    this.searchBarVisible = false;
  }

  filterAnimals() {
    let str = this.searchString.trim().toLocaleLowerCase();
    console.log("search");
    if (str == '') {
      this.filteredAnimals = this.animals;
    }
    console.log("query: " + str);

    this.filteredAnimals = this.animals.filter(item => {
      return (item['species']['en'].toLocaleLowerCase().indexOf(str) > -1);
    });
  }

  doRefresh(refresher: Refresher = null, force: boolean = false) {
    console.log("refreshing...");
    this.generalProvider.getAllAnimals(force).then(animals => {
      this.animals = animals;
      this.filterAnimals();
      console.log("done");
    }).catch((error) => {
      console.log("failed");
      console.log(error);
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

  info(item) {
    this.nav.push(AnimalinfoPage, item);
  }

  open(item) {
    this.nav.push(AnimaldetailsPage, item);
  }
}
