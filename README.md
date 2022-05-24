# Truelayer Full Stack Engineer Challenge

This project was generated using [Nx](https://nx.dev), a smart, fast and extensible build system with first class monorepo support and powerful integrations.

## Getting started

To get this project running locally:

- Clone this repo
- Install [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) if you haven't
- Run `yarn install` to install all the required dependencies

## Running Locally

Run `yarn nx serve api` to start up the [backend server](apps/api).

Run `yarn nx serve shakespearean-pokedex` to start up the [React frontend](apps/shakespearean-pokedex). Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Running unit tests

Run `yarn nx test shakespearean-pokedex` to execute the unit tests via [Jest](https://jestjs.io).

Run `yarn nx affected:test` to execute the unit tests affected by a change.

## Understand the workspace

Run `yarn nx graph` to see a diagram of the dependencies of your projects.
