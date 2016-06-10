import {Page, NavController} from 'ionic-angular';
import {Language} from '../../common/languages';


@Page({
  templateUrl: 'build/pages/settings/settings.html',
})
export class SettingsPage {
  constructor(public nav: NavController) {}
}

