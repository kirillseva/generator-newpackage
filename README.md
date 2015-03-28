R package generator
========

This generator scaffolds the files for your new R project.
The resulting file structure looks like this:
```
{packagename}
|
├── DESCRIPTION
├── NAMESPACE
├── NEWS.md
├── R
│   ├── pending.R
│   └── {packagename}-package.R
├── README.md
├── man
│   └── {packagename}.Rd
└── tests
    ├── test-all.R
    └── testthat
        └── test-pending.R
```

Included out of the box
* Easy installation/distribution using [**devtools**](https://github.com/hadley/devtools)::install()
* Documentation with [**roxygen2**](https://github.com/klutometis/roxygen)
* Tests using [**testthat**](https://github.com/hadley/testthat)
* *.travis.yml* config for [Travis-CI](https://travis-ci.org/)
* [Coveralls](https://coveralls.io/) integration with [**covr**](https://github.com/jimhester/covr)

Requires the following to be installed:
* Obviously, [R](http://www.r-project.org/)
* [npm](https://www.npmjs.com/)
* [**devtools**](https://github.com/hadley/devtools),
[**roxygen2**](https://github.com/klutometis/roxygen),
[**testthat**](https://github.com/hadley/testthat) R packages (not required, but would make your life easier)

Installation on mac:
```r
# install dependencies
brew install npm # sudo apt-get install npm on ubuntu
sudo npm install -g yo generator-newpackage

# start using
cd package/directory
yo newpackage # creates a package in the current folder
# or
yo newpackage packageName # creates a new folder

# subgenerators
yo newpackage:function somefunction # creates R/somefunction.R
yo newpackage:test sometest # creates tests/testthat/sometest.R
```
