# Token Organization

This is a simple Dapp that basically spins of as many organizations as you need and each organization can have members and a token that represent the organization. 
The members will have vesting period after which they can collect their tokens

This project has a front-end attacted to it in the frontend folder

## hardhat configuration

To make you lives easier, we have added some custom scripts

to run a node

```shell
npm run node
```

> please configure your wallet to use it

To run the test scripts run the following command

```shell
npx run test
```

To run the deploy script in local node

```shell
npx run deploy
```

## frontend configuration

make sure to install the packages with `npm i` before running the frontend

rename the `.env.example` to `.env` and update the variables value.

> get your project id from https://cloud.walletconnect.com/

To update the networks, go to `/frontend/src/app/page.tsx` and update the `chains` array

!!!PLEASE DO NOT USE THIS FOR PRODUCTION UNDER ANY CIRCUMSTANCES!!!
