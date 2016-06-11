import {NavController, Page, Refresher} from 'ionic-angular';
import {GeneralProvider} from '../../providers/general-provider';
import {Settings} from '../../common/settings';
import {AnimaldetailsPage} from "../animaldetails/animaldetails";
import {AnimalinfoPage} from "../animalinfo/animalinfo";
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Tools} from '../../common/tools';


@Page({
  templateUrl: 'build/pages/animals/animals.html',
  pipes: [TranslatePipe]
})
export class Animals {
  animals = [];
  filteredAnimals = [];
  settings = Settings;
  searchBarVisible: boolean = false;
  searchString: string = '';

  constructor(
    private nav: NavController,
    private generalProvider: GeneralProvider,
    private translate: TranslateService
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

  localize(val) {
    return this.translate.get(val)['value'];
  }

  doRefresh(refresher: Refresher = null, force: boolean = false) {
    this.generalProvider.getAllAnimals(force).then(animals => {
      this.animals = animals;
      this.filterAnimals();
    }).catch((error) => {
      Tools.showInfoToast(
        this.nav, this.localize('connection_problem'), this.localize('cancel')
      );
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
