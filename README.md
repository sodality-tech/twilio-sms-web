Twilio SMS Web
==============
A minimalist web application to send and receive SMS with Twilio.

Bootleg deployment
==============
1) `npm run build`
1) Upload assets to https://console.cloud.google.com/storage/browser/twilio-message-viewer
1) Replace index.html links with auth links from assets in the bucket 

Hosted Application
==================
A version of this application is available on:

https://storage.cloud.google.com/twilio-message-viewer/index4.html?authuser=0

Twilio Account
==============
You will need a Twilio account to read and send SMS messages.

Twilio Free Account
-------------------
If you don't have an account, Twilio offers a [free trial account][TwilioFreeTrial].
Once your account is created you will need to [verify your personal phone number][TwilioVerifyPersonalPhoneNumber].
Finally, you also need to [get a Twilio phone number with SMS capability][TwilioGetPhoneNumber].

Sign-in to Twilio SMS Web
-------------------------
1. Sign-in to Twilio and get your `ACCOUNT SID` and `AUTH TOKEN` on the [Twilio's Console Page][TwilioConsole].
2. Use your `ACCOUNT SID` and `AUTH TOKEN` to sign-in to [Twilio SMS Web][HostedDemo].

Screenshots
===========
Sign-in

<img src='info/screenshot-sign-in.png' width='75%'>

Read messages:

<img src='info/screenshot-messages.png' width='75%'>

Compose messages:

<img src='info/screenshot-composer.png' width='75%'>

Development
===========

Available Scripts
-----------------
In the project directory, you can run:

`npm start`
----------
Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

`npm run build`
---------------
It bundles React in production mode and optimizes the build for the best performance in the `build` folder.

A varient `npm run build:prod` is also available which is going to override the `.env` file with the values from a `.env-prod`.

`npm run deploy`
----------------
Intended to be used after `npm run build:prod`.
It deploys the content from the `/build` folder to: https://rafasantos.github.io/twilio-sms-web/

Environment Variables
---------------------
This project uses [dotenv](https://github.com/motdotla/dotenv) to manage environment variables.
Developers can change these values according to their needs via environment variables or editing the `.env` file.

Sample `.env` file:
```
# When this value is populated, then Google Tag Manager is going to be enabled with this publicId, i.e: GTM-0000000
REACT_APP_GOOGLE_TAG_MANAGER_ID=GTM-0000000
```

`.env` files should be managed independently and they should not be pushed to the codebase repository.


[HostedDemo]: https://rafasantos.github.io/twilio-sms-web
[TwilioConsole]: https://www.twilio.com/console?
[TwilioFreeTrial]: https://www.twilio.com/docs/usage/tutorials/how-to-use-your-free-trial-account 
[TwilioVerifyPersonalPhoneNumber]: https://www.twilio.com/docs/usage/tutorials/how-to-use-your-free-trial-account
[TwilioGetPhoneNumber]: https://www.twilio.com/docs/usage/tutorials/how-to-use-your-free-trial-account#get-your-first-twilio-phone-number