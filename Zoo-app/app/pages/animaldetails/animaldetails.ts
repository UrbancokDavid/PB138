import {Page, NavController, NavParams} from 'ionic-angular';
import {Settings} from '../../common/settings'


declare var Media:any;

@Page({
  templateUrl: 'build/pages/animaldetails/animaldetails.html',
})
export class AnimaldetailsPage {
  soundObj;
  private item;
  settings = Settings;

  constructor(public nav: NavController, private navParams: NavParams) {
    this.nav = nav;
    this.navParams = navParams;
    this.item = this.navParams.data;
  }

  playSound(file) {
    var src = Settings.host + file;
    this.soundObj = new Media(src);

    this.soundObj.play();
  }

  stopSound() {
    if (this.soundObj) {
      this.soundObj.pause();
      this.soundObj.stop();
      this.soundObj.release();
      this.soundObj = null;
    }
  }
}
