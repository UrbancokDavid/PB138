import {Page, NavController} from 'ionic-angular';
import {Language} from '../../common/languages';
import {UserSettings} from '../../providers/user-settings';
import {DataProvider} from '../../common/data-provider';
import {Tools} from '../../common/tools';

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

  flushCache() {
    this.dataProvider.flushCache();
    Tools.showInfoToast(this.nav, "Cache flushed successfully");
  }

  constructor(
    public nav: NavController,
    private userSettings: UserSettings,
    private dataProvider: DataProvider
  ) {
    userSettings.getLanguage().then(lang => {
      this.selectedLanguage = lang;
    });
  }
}
