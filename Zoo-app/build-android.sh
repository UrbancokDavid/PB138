#!/bin/bash
# HOW TO BUILD: 
# http://www.angulartypescript.com/angular-2-ionic-2-build-android/ 
#
#
# Zoo-app/ # npm install -g phonegap@latest # install phonegap
# Zoo-app/ $ phonegap plugin add phonegap-plugin-barcodescanner # install barcode scanner plugin
# Zoo-app/ $ ionic platform add android
# Zoo-app/ $ cd platform/android
# Zoo-app/platforms/android/ $ keytool -genkey -v -keystore angular2ionic2.keystore -alias angular2ionic2 -keyalg RSA -keysize 2048 -validity 10000
# in Zoo-app/platforms/android/angular2ionic2.keystore => 
# android {
#  ...
#   signingConfigs { 
#     release {
#       storeFile file("angular2ionic2.keystore")
#       storePassword '123456'
#       keyAlias 'angular2ionic2'
#       keyPassword '123456'
#     } 
#   }
# ...
#}
export ANDROID_HOME=~/Android/Sdk/
ionic build android --release
mv platforms/android/build/outputs/apk/android-release-unsigned.apk android-release-signed.apk
echo "123456" | jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore platforms/android/angular2ionic2.keystore android-release-signed.apk angular2ionic2

