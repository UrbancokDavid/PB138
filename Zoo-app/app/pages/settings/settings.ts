import {Page, NavController} from 'ionic-angular';
import {Language} from '../../common/languages';
import {UserSettings} from '../../providers/user-settings';


@Page({
  templateUrl: 'build/pages/settings/settings.html',
})
export class SettingsPage {
  languages: Language[] = [
    {value: 'en', title: 'English'},
    {value: 'cz', title: 'Český'}
  ];
  selectedLanguage: string;

  updateLanguage(event) {
    this.userSettings.setLanguage(this.selectedLanguage);
    console.log(this.selectedLanguage);
  }

  constructor(public nav: NavController, private userSettings: UserSettings) {
    userSettings.getLanguage().then(lang => {
      this.selectedLanguage = lang;
    });
  }
}
