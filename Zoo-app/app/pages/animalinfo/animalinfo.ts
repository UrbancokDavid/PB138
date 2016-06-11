import {Page, NavController, NavParams} from 'ionic-angular';
import {Settings} from '../../common/settings';

@Page({
  templateUrl: 'build/pages/animalinfo/animalinfo.html',
})
export class AnimalinfoPage {
  private item;
  settings = Settings;

  constructor(public nav: NavController, private navParams: NavParams) {
    this.nav = nav;
    this.navParams = navParams;
    this.item = this.navParams.data;
  }
}
