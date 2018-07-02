# `angularJS-calc` — simple calculator in AngularJS

This project is an implementation of calculator application in a typical [AngularJS][angularjs] web app. You can use it
to calculate operations (add, subtract, multiply, divide, power, square root) based on two operands in series.

The project currently only contains the simple implementation of the calculator and scientific version skeleton is also present.

This project has used `angular-seed` for bootstraping the application.

## Limitations
1. Keyboard input is disabled
2. Complex operation of BODMAS is not supported

## Getting Started

To get you started you can simply clone the `angularJS-calc` repository and install the dependencies:

### Prerequisites

You need git to clone the `angularJS-calc` repository. You can get git from [here][git].

We also use a number of Node.js tools to initialize and test `angularJS-calc`. You must have Node.js
and its package manager (npm) installed. You can get them from [here][node].

### Clone `angularJS-calc`

Clone the `angularJS-calc` repository using git:

```
git clone https://github.com/rohan-jha/angularJS-calc
```
### Install Dependencies

We have two kinds of dependencies in this project: tools and Angular framework code. The tools help
us manage and test the application.

* We get the tools we depend upon via `npm`, the [Node package manager][npm].
* We get the Angular code via `bower`, a [client-side code package manager][bower].

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`. After that, you should find out that you have
two new folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the Angular framework files

*Note that the `bower_components` folder would normally be installed in the root folder but
`angularJS-calc` changes this location through the `.bowerrc` file. Putting it in the `app` folder
makes it easier to serve the files by a web server.*

### Run the Application

The project is preconfigured with a simple development web server. The simplest way to start
this server is:

```
npm start
```

Now browse to the app at [`http://localhost:8000/#/simple`][local-app-url].


## Directory Layout

```
app/                            --> all of the source files for the application
  components/                   --> all app specific modules
    simple-calc/
      simple-calc.ctrl.js       --> Simple Calculator Controller
      simple-calc.ctrl_test.js  --> Simple Calculator Controller Test
      simple-calc.srvc.js       --> Simple Calculator Service (Can be used to connect with remote services)
      simple-calc.tpl.html      --> Simple Calculator Partial
    scientific-calc/
      simple-calc.ctrl.js       --> Scientific Calculator Controller (Will be implemented later)
      simple-calc.ctrl_test.js  --> Scientific Calculator Controller Test (Will be implemented later)
      simple-calc.srvc.js       --> Scientific Calculator Service (Will be implemented later)
      simple-calc.tpl.html      --> Scientific Calculator Partial (Will be implemented later)
  app.css                       --> default stylesheet
  app.js                          --> main application module
  index.html                    --> app layout file (the main html template file of the app)
karma.conf.js                   --> config file for running unit tests with Karma

```


## Testing

### Running Unit Tests

The `angularJS-calc` app comes with configured unit tests. These are written in [Jasmine][jasmine],
which we run with the [Karma][karma] test runner. We provide a Karma configuration file to run them.

* The configuration is found at `karma.conf.js`.
* The unit tests are found next to the code they are testing and have an `_test.js` suffix (e.g.
  `simple-calc.ctrl_test.js`).

The easiest way to run the unit tests is to use the supplied npm script:

```
npm test
```

This script will start the Karma test runner to execute the unit tests. Moreover, Karma will start
watching the source and test files for changes and then re-run the tests whenever any of them
changes.
This is the recommended strategy; if your unit tests are being run every time you save a file then
you receive instant feedback on any changes that break the expected code functionality.

You can also ask Karma to do a single run of the tests and then exit. This is useful if you want to
check that a particular version of the code is operating as expected. The project contains a
predefined script to do this:

```
npm run test-single-run
```

## Contact

Please contact me @ rohan.jha@gmail.com
