# IF670 - Crossmobile

This is the repository used to store Mobile Cross-Platform (IF670) class assignments in my university.

## Requirements

- [Android Studio (optional)](https://developer.android.com/studio)
- [Ionic CLI](https://ionicframework.com/docs/cli)
- [Node.js](https://nodejs.org/)
- Shell that supports `make` if you want to run the helper scripts below.

## Installation

As mentioned above, you need Ionic CLI in order to launch the applications. Please use `npm install -g @ionic/cli` in order to install the CLI. You might also need Android Studio if you are compiling the apps natively.

After you have done that, please do:

```bash
git clone git@github.com:lauslim12/IF670_Crossmobile.git
cd IF670_Crossmobile/<YOUR_PREFERRED_LAB_MODULE>
npm install
ionic serve
```

## Notes

For lab module 09 and onwards, you may have to perform the following command in order to use the Google Maps API:

```bash
export REACT_APP_GOOGLE_MAPS_API_KEY=YOUR_API_KEY
```

For lab module 10, you have to set up XAMPP / PHP MySQL webserver and use the `api` project. Ensure that the name of the database, username, and password are correct.

For lab module 11 and 12, I have already used my Firebase instance for both of them. Feel free to use them (if I have not deleted them).

## Native-Compilation

If you want to run the apps natively, you can do so by following these steps below.

```bash
cd IF670_Crossmobile/<YOUR_PREFERRED_LAB_MODULE>
ionic capacitor add android
ionic capacitor copy android
```

Sometimes, `ionic capacitor copy android` will not successfully install all of the Capacitor dependencies. You may have to synchronize your Capacitor with `ionic capacitor sync android`.

After you have done that, you will see an `android` folder. Open it on Android Studio, and run it as usual (with the emulator) or you can build it as APK.

Note that the process of `ionic capacitor sync android` and the building of the APK must happen in the same OS. You cannot perform `ionic capacitor sync android` in WSL, copy the resulting folder to the Windows OS, and then trying to build the APK. You have to also perform `ionic capacitor sync android` in the OS that you want to use to build the application.

## Scripts

Several helper scripts have been set up at this repository to help with the development.

- `make clean` to destroy all `node_modules`, and `build` folders in the repository.
- `make move` to move a single folder from my WSL to my `D` disk in Windows. Accepts a single `FOLDER_NAME` as a parameter.

Examples:

```bash
$ make clean
./Modul04_32827/32827-NicholasDwiartoW/node_modules

$ make move FOLDER_NAME=Modul04_32827/32827-NicholasDwiartoW/android
# no output, will appear in 'D:' disk
```
