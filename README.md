# Front End Boilerpalte
A design system framework

### Start

* Clone the repository `git  clone -b frontend-startup https://github.com/shawnsandy/idea my-app-dir-name`
* Change dir `cd my-app-dir-name`
* Remove the git remote `git remote -rm origin`
* Run `yarn` to install npm packages
* Start development server `yarn start`
* Write you code
* Build production files `yarn build`
* Open / Edit README.md, package.js replace defaults like package name, email, urls, emails etc, with your own.
* You may need to set the `PORT` in your `./webpack-config.js` to avoid port conflict
``` js
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3030; //change
const PROXY = `http://${HOST}:${PORT}`;
```
* WAKANDA FOREVER...
* Enjoy!
