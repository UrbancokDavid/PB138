import {Page, NavController} from 'ionic-angular';


@Page({
  templateUrl: 'build/pages/qrcode/qrcode.html',
})
export class QrcodePage {
  constructor(public nav: NavController) {}

  scanCode() {
    cordova.plugins.barcodeScanner.scan(
      (result) => {
        alert("We got a barcode\n" +
          "Result: " + result.text + "\n" +
          "Format: " + result.format + "\n" +
          "Cancelled: " + result.cancelled);
      },
      (error) => {
        alert("Scanning failed: " + error);
      }
    );
  }
}
