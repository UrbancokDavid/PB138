import {NavController, Toast} from 'ionic-angular';

export module Tools {
  export function showInfoToast(
    nav: NavController, message: string, cancelButton: string = null
  ) {
    let toast = Toast.create({
      message: message,
      showCloseButton: (!!cancelButton),
      closeButtonText: (cancelButton) ? cancelButton : 'Close',
      duration: 3000
    });
    nav.present(toast);
  }
}
