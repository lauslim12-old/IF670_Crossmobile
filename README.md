# IF670 - Crossmobile

This is the repository used to store Mobile Cross-Platform class assignments in university.

## Requirements

- [Android Studio (optional)](https://developer.android.com/studio)
- [Ionic CLI](https://ionicframework.com/docs/cli)
- [Node.js](https://nodejs.org/)

## Installation

As mentioned above, you need Ionic CLI in order to launch the applications. Please use `npm install -g @ionic/cli` in order to install the CLI. You might also need Android Studio if you are compiling the apps natively.

After you have done that, please do:

```bash
git clone git@github.com:lauslim12/IF670_Crossmobile.git
cd IF670_Crossmobile/<YOUR_PREFERRED_LAB_MODULE>
npm install
ionic serve
```

## Native-Compilation

If you want to run the apps natively, you can do so by following these steps below.

```bash
cd IF670_Crossmobile/<YOUR_PREFERRED_LAB_MODULE>
ionic capacitor add android
ionic capacitor copy android
```

Sometimes, `ionic capacitor copy android` will not successfully install all of the Capacitor dependencies. You may have to synchronize your Capacitor with `ionic capacitor sync android`.

After you have done that, you will see an `android` folder. Open it on Android Studio, and run it as usual (with the emulator) or you can build it as APK.
