 # Puente Data Collection and Asset Identification Application 

![travis](https://travis-ci.com/hopetambala/puente-ionic-datacollection.svg?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6cb2291fdaa74cbb864d3d07230e6f03)](https://www.codacy.com/app/hopetambala/puente-ionic-datacollection?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=hopetambala/puente-ionic-datacollection&amp;utm_campaign=Badge_Grade)
[![codecov](https://codecov.io/gh/hopetambala/puente-ionic-datacollection/branch/master/graph/badge.svg)](https://codecov.io/gh/hopetambala/puente-ionic-datacollection)
![](https://img.shields.io/badge/ionic_3-✓-blue.svg)
![](https://img.shields.io/badge/angular_4+-✓-blue.svg)
![](https://img.shields.io/badge/parse_server-✓-blueviolet.svg)


# THIS PROJECT IS DEPRECATED
Puente Mobile Data Collection is not maintained anymore. See [Puente Collect](https://github.com/puente-development-international/collect) for our new mobile data collection.

You can still Puente Mobile Data Collection for inspiration on using Ionic v3 and Parse-Server together..

## What now?
Consider using and contributing Puente Collect! We're excited about introducing it to the international development community.

- It's opinionated. We made intentional decisions to switch to React-Native.
- It's more human-centered. We went through a rigourous discover and design phase to make sure Puente Collect was designed for everyone.
- It's more sustainably built. We made intentional decisions to make sure we follow best practices for code management and releases, aggressively using testing, documentation, and linting to keep the codebase looking clean.

------------------------------------

## About this Program

This is a Community Health Records Data Collection Application that integrates Ionic 3, Angular 2+ and Parse Server. It's being used for community development data collection and assessment in the Dominican Republic. 

## Key Libraries

Google Maps Javascript SDK

## Screenshots

<p align="middle">
  <img src="https://github.com/hopetambala/puente-ionic-datacollection/blob/master/resources/screenshots/home.jpg" width="40%" />
  <img src="https://github.com/hopetambala/puente-ionic-datacollection/blob/master/resources/screenshots/db.jpg" width="40%"/>
</p>

## Development

Here are terminal commands to get both Ionic and Cordova installed on your machine

```
npm install ionic -g
npm install cordova@8.1.2
```

Here are some quick commands to get started after install Ionic and Cordova:

- `npm install`: Install Node dependencies
- `npm start`: Start the hot reloading development server.
- `npm test`: Run the test suit and watch for changes.
- `npm build`: Build a production optimized bundle of the app.
- `npm lint`: Run the ESLinter.

## File structure

```
puente-data-collection/
│
├── resources/
│
├── src/
│   ├── app/                      *Holds main logic for application
│   │   ├── app.constant.ts       
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   ├── app.template.html
│   │   └── main.ts
│   │
│   ├── assets/
│   │   └── icon/
│   │       └── favicon.ico
│   │
│   ├── pages/                    * Holds Model, View, and Controller for each page of the application
│   │
│   ├── providers/                * Provides "services" or functions to be used/re-used throughout application
│   │
│   ├── theme/
│   │   └── variables.scss        * Defines CSS scheme for application
│   │
│   └── index.html
│
├── typings/
│    └── cordova-typings.d.ts
│
├── .editorconfig                 * Defines coding styles between editors
├── .gitignore                    * Example git ignore file
├── config.xml                    * Cordova configuration file
├── ionic.config.json             * Ionic configuration file
├── LICENSE                       * MIT License
├── package.json                  * Defines our JavaScript dependencies
├── package-lock.json             * Defines our exact JavaScript dependencies tree
├── README.md                     * This file
├── tsconfig.json                 * Defines the root files and the compiler options
├── tslint.json
└── *.png                         * Images for the README.md
```

## Ionic Framework

The Ionic framework allows for the creation of highly interactive, **cross-platform mobile applications** that can be deployed across iOS, Android, and Windows devices. These hybrid applications include native functionalities, exhaustive gestures, and customizable tools to enhance user-friendliness. Those powerful capabilities are brought to Ionic because it provides mobile-friendly `HTML`, `JS`, and `CSS` components to developers.

Some of its advantages are:

- Open source
- Code once, run on all mobile devices
- One programming language for all mobile OS
- Use of well-known web technologies
- A huge community

## Parse Server

**Parse Server** is an open source version of the Parse backend that can be deployed to any infrastructure that can run `Node.js`. It works with the Express web application framework and can be added to existing web applications, or run by itself. Its repository is on [Github](https://github.com/parse-community/parse-server).

Parse offer a backend to store data, push notifications, social media integration for our app etc. The features provided tend to be helpful in prototyping quickly.

- **General Purpose**: Open Source
- **Hosting**: Self-hosting or Parse Server Hosting providers. Supports local testing and development
- **Custom Code**: Supported via Cloud Code
- **Database**: Mongo DB
- **Push**: Support push notifications for Android, iOS. Also users can manage Push Notifications campaigns
- **Storage**: No restricted time limits and no file storage restrictions. Control over backup, restore and database indexes
- **Ideal for**: General purpose applications

## Known Issues and Troubleshooting

### ios-deploy isn't working!

[From here](https://stackoverflow.com/questions/34733740/ios-deploy-not-found-under-os-x-el-capitan)
```
sudo npm install -g ios-deploy --unsafe-perm=true --allow-root
```

Sometimes running one of ios build scripts

```
npm run ios:build
```
doesn't work if you have an iPad or iPhone attached to the computer during building.

## Documentation
https://hopetambala.github.io/puente-ionic-datacollection/


## Contribution
- Report issues
- Open pull request with improvements
- Spread the word
- Reach out to me directly at <hope@puente-dr.com>
