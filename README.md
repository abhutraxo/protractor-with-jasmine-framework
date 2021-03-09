## *Important note*
If you are working on angular app automation then don't forget to remove
browser.waitForAngularEnabled(false); e2e\page-objects\pages\base-page.ts Line-10

## Popular issue on docker
In case if any of you come across, chrome getting 'no session' or 'chrome not reachable' on docker
It's due to low shared memory
/dev/shm
Please [increase shared memory](https://stackoverflow.com/questions/30210362/how-to-increase-the-size-of-the-dev-shm-in-docker-container) to around 1G as default is only 64MB and might cause issues even with single instance


## Code organization

For integration tests the folder structure should be similar to this as our spec files are going to utilize multiple page objects for completing a test
```
─e2e
    │   tsconfig.e2e.json
    │
    ├───components
    │   ├───company
    │   │   ├───component-helpers
    │   │   │       component-helpers.ts
    │   │   │
    │   │   └───component-types
    │   │       └───(component-name)-component
    │   │    breadcrumbs-component-selectors.ts
    │   │
    │   ├───html
    │   │       (type)-helper.ts
    │   │
    │   ├───misc-utils
    │   │       common-label.ts
    │   │       constants.ts
    │   │       html-helper.ts
    │   │
    │   └───vendor
    │       └───vendor-name
    │    vendor-name.ts
    │
    ├───page-objects
    │   ├───contracts
    │   │       page.ts
    │   │
    │   └───pages
    │       │   base-page.ts
    │       │
    │       └───(page-name)
    │               (page-name)-page.constants.ts
    │               (page-name)-page.helper.ts
    │               (page-name)-page.validations.ts
    │               (page-name).po.ts
    │
    └───test-suites
        ├───(test-rail-suite-name)-test-suite
        │   └───(testrail-root-after-suite)
        │(testrail-root-after-suite).e2e-spec.ts
        │
        └───helpers
     suite-names.ts
```

If you guys are following these things then great otherwise if you have a better approach then please suggest

For Api Urls and Data They are supposed to be organized like
```
End point  
Customer/Orders/Create

Directory structure
--Customer
----Orders
----ApiObjects (Similar to Page Objects) - Where you keep all the Derived data and data constructions
----Constant file and so on
```
## Framework components


### Contracts


e2e\modules\Contracts are basically a kind of interface, like those things which are compulsory to be implemented by every page object file. Right now we have it for Page, so whatever is declared in it is a unified requirement for all the components that should be put in here. So this `Page` contract has to be inherited by all the page objects


### Base Page

e2e\page-objects\base-page it's basically a utility for all the tricky selectors so this page has to be inherited by all the page objects

### Naming convention


We are using default conventions which are suggested by angular team on top of that we are also using some more configuration parameters to produce high quality code.
https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines


### Spec files

We must post fix `.e2e-spec.ts` for all the test files

### Api Instructions

- Use strongly typed models for assertions and posting the data eg. [swagger-ts-generator](https://www.npmjs.com/package/swagger-ts-generator)
- Structure all the endpoints properly in separate them in each file
- All the session related repetitive code must be controlled from api invoker 
- Use ObjectBuilder for setting up specific properties

#### General instructions
- Create the item - POST
- Retrieve the created item (Step 1) with the same attributes which we sent in post-  GET
- Update the same item (Step 2) - PUT (To make it strong, Do GET again and assert it)
- Delete newly created item (Step 1) - DELETE  (To make it strong, Do GET again and assert not found)  


## Docker execution

We have a Dockerfile created in root of the repo for test execution in interactive mode and usage VNC for debugging as well. Documentation [here](https://docs.google.com/document/d/1JGfpa_HDR0COUyC58XlhJEv05SPn2ZGophMbC6X0jTw "Click here to see docker execuion documentation")


## Reporting component

Allure reporting is integrated. For configuration please visit https://github.com/allure-framework/allure-jasmine

On Team city we have to use [Native TeamCity plugin](https://github.com/allure-framework/allure-teamcity "Click here to go to allure TC plugin site") or [Third part TeamCity plugin](https://github.com/eroshenkoam/allure-teamcity-plugin "Click here to go to allure TC plugin third party site")

on local machine it can be generated via command line

```
npm install -g allure-commandline --save-dev
```

allure serve <path of artifacts>, example

```
allure serve allure-results
```


## Running parallel tests execution


multiCapabilities.maxInstances: 5  Default max instances for selenium grid

bsMultiCapabilities.maxInstances: 5 Default max instances for browser stack


3 Ways to pass the max instances

1. Using environment variable MAX_INSTANCES

2. Using command line param --params.maxInstances

3. Default is 5



## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Customization switches

Almost all the switches are configurable using Environment variable, Check the respective section for more details

### Passing parameters to NPM

NPM scripts can have parameters passed by command line.  E.g.:

```
// Notice extra -- with cmd line args
npm run e2e -- --baseUrl=<URL>

OR

protractor <conf-file> --baseUrl=<URL>
```



Following sections defines which parameters are accepted by Protractor and TestRail.

### Test rail switches


We have following various command line options available which can be specified as follows with `protractor` command
All of them are optional

--params.testrail.projectId = [N] : Testrail project id, it should not be passed via command line and can be specified in params section so all the info is unified


--params.testrail.milestoneName = [Milestone name] : This milestone will be used to create a milestone with a postfix as current week number or it's already created it will not be created


--params.testrail.versionName = [Version name] : This version name is basically a field in test rail test case result field, we might want to specify that which version it should be tagged to then we can specify


--params.testrail.host = This would be common across all the projects but still we have made it configurable


--params.testrail.user = [login id] - It is recommended to always pass it using continuous integration tool so it's secure


--params.testrail.password = [XXXX] - It is recommended to always pass it using continuous integration tool so it's secure it can be either a password or access key


* Test writing instructions - Please make sure that `suite name` in test rail and in *-specs.ts is same and test case has an id append to name with bracket, Here `suite name` is defined in describe and `test id` is defined as [1].
Example

```javascript
describe("This should be the suite name", function() {
  it("Mind the id at the end of this with bracket - [1]", function() {
    expect(true).toBe(true);
  });
});
```

### Defect linking in testrail for the ignored tests

If we want to associate bug id with test case in a run then we must append the bug id in test name like [BUG:XXX-00000],
Please note that it must be ignored then only it will be associated with test case, This test case will be marked as skipped
in test rail

Example

```javascript
describe("This should be the suite name", function() {
  xit("Mind the id at the end of this with bracket - [1] [BUG:SNSGCID-19909]", function() {
    expect(true).toBe(true);
  });
});
```

Environment variables configuration for test rail-

projectId - process.env.TESTRAIL_PROJECT_ID

milestoneName - process.env.TESTRAIL_MILESTONE_NAME

versionName - process.env.VERSION

host - process.env.TESTRAIL_HOST

user - process.env.TESTRAIL_USER

password - process.env.TESTRAIL_PASSWORD

### Misc. Switches

You might want to have some misc info to be passed from command line that can be specified using an object under param section of object in config
For example we have 2 switches right now like
--params.login.user = [XXXX]
--params.login.password = [XXXX]


### Product version switch
--params.testrail.versionName Or process.env.VERSION

Default - as Required

### Selenium hub switch
--params.selenium.hub Or process.env.SELENIUM_URL

Default - as Required


### Protractor switches

Browser stack related configuration can be passed command line and following options are available

--params.browserstack.user='bs-username'

--params.browserstack.key='bs-key'

--params.browserstack.local=[true|false]

Default is true

--params.browserstack.browser=browserName
Default is Chrome

Default browser names are available `Chrome`, `Firefox`, `IE`, `IE10`, `Edge`, `Safari`, `Safari9`

We can also have them using environment variables, Following keys are used for their respective values

'browserstack.user' - process.env.BROWSERSTACK_USERNAME

'browserstack.key' - process.env.BROWSERSTACK_ACCESS_KEY

'browserstack.local' - process.env.BROWSERSTACK_LOCAL

'browserstack.localIdentifier' - process.env.BROWSERSTACK_LOCAL_IDENTIFIER

'build' - process.env.BROWSERSTACK_BUILD

## Why Protractor is better than Selenium - [Test Team Discussion](https://drive.google.com/drive/u/0/folders/1HyLArAdrHXqVk1n8Y6Gf094lmsqFywy3)

## Interation with product team - [Test Team & PCA Discussion](https://drive.google.com/drive/folders/1RDotG-fud-0RCwXt7bqApMYkmFeZsQF1)

## Video recording of new architecture

* [Web UI Automation](https://drive.google.com/drive/u/0/folders/1ONb_FKTrrvAp5n3FtIftIwdKRGE28nQr)

* [Rest Api Automation](https://drive.google.com/drive/u/0/folders/1cVhMFa1hMv66eHkxHtM4xSuen1QZLKqh)

## How to write on our framework -

* Selectors
  * [Easier Components](https://drive.google.com/open?id=18QxLv34LUcxYMrLOsYRa2uIdrq8pd0ai)

* Web UI Automation test cases
  * [Fresh project](https://drive.google.com/drive/u/0/folders/1LXC1rYkb6i2Wwq0zvJ2ffm-8zmbJWpVt)
  * [Established project](https://drive.google.com/drive/u/0/folders/1bgSGKlEYpx5C8M0L9kdhZmqAMINB2c-Z)

* Api Automation test cases
  * [Fresh project](https://drive.google.com/drive/u/0/folders/1td6AFEOcYl_vPZ8FnayHWYZEkVBA8Aff)
  * [Established project](https://drive.google.com/drive/u/0/folders/19hswaVYAFnbST6BQwhR6M8_rVL6DoeXU)

## Thumb rules to be followed for organizing the code -

* `*.constant.ts`, can have field/objects/properties but not methods
* `*.po.ts` can have objects/properties but not methods
* `*.validation.ts` can have everything
* `*.helper.ts` can only have methods

## Automation best practices [documentation](https://docs.google.com/document/d/1e84nd7piGq-w_ZyguvHsKwRkt637-zwlIiO36MKLSB4/edit#heading=h.er9ghkoz1o6v)

## Test rail [documentation](https://docs.google.com/document/d/1QAv5gtNbiaAO1NWCzSnzzD0vTpKD20-hMEELQoJRU4k/edit)

## Training references

-[Javascript tutorials](https://www.w3schools.com/js/)

-[Typescript language](https://www.typescriptlang.org/)

-[Typescript Tutorials](https://www.tutorialspoint.com/typescript/)

-[Protractor Foundation & Api](http://www.protractortest.org/)

