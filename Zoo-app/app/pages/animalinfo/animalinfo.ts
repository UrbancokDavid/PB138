import {Page, NavController, NavParams} from 'ionic-angular';
import {Settings} from '../../common/settings';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';


declare var Media:any;

@Page({
  templateUrl: 'build/pages/animalinfo/animalinfo.html',
  pipes: [TranslatePipe]
})
export class AnimalinfoPage {
  soundObj;
  showPlay: boolean = true;
  private item;
  settings = Settings;

  constructor(
    public nav: NavController,
    private navParams: NavParams,
    private translate: TranslateService
  ) {
    this.nav = nav;
    this.navParams = navParams;
    this.item = this.navParams.data;
  }

  playSound(file) {
    var src = Settings.host + file;
    this.soundObj = new Media(src);
    this.soundObj.play();
    this.showPlay = false;
  }

  stopSound() {
    if (this.soundObj) {
      this.soundObj.pause();
      this.soundObj.stop();
      this.soundObj.release();
      this.soundObj = null;
      this.showPlay = true;
    }
  }
}
