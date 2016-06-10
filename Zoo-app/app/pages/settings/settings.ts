import {Page, NavController} from 'ionic-angular';
import {Language} from '../../common/languages';


@Page({
  templateUrl: 'build/pages/settings/settings.html',
})
export class SettingsPage {
  languages: Language[] = [
    {value: 'en', title: 'English'},
    {value: 'cz', title: 'Český'}
  ];
  selectedLanguage: string = 'en';

  constructor(public nav: NavController) {
  }
}

