import {NavController, Toast} from 'ionic-angular';

export module Tools {
  export function showInfoToast(nav: NavController, message: string) {
    let toast = Toast.create({
      message: message,
      duration: 2000
    });
    nav.present(toast);
  }
}
