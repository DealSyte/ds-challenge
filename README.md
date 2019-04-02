# Claim test
The API documentation can be found down below
`API DOCS` : <https://claimrestapi.docs.apiary.io/#>

## Environment Variables

The Claim Test API env. **You must to create the Database previously (one for develop and other for test)**  

| Variable | Description |
| ------ | ------ |
| PORT | Current port of the app |
| JWT_SECRET | The JWT secret Key |
| NODE_ENV | Current environment of app |
| DB_USERNAME | Database user |
| DB_PASSWORD | Database password |
| DB_DATABASE | Database name |
| DB_HOST | Database Host |

### Main Dependencies

A shortly description of the main dependencies used on the code challenge. (Only the new ones)

* [Ramda] - This module let us use all the power of the functional programming, like curry, lexers, transducers, partial application, immutability, etc.
* [Passport] - A powerful tool that make the auth process a little bit easier with all its strategies.
* [bcryptjs] - All the user password are saved encrypted, because of that, It's necessary to use bcryptjs to decrypt them.
* [winston] - Great tool for handle logs into the STDOUT and STDERR
* [Sinon] - Have ever need to mock something? Well Sinon is the answer bro.
* 
### Getting Started
----
#### Clone the project

First at all you need to clone this code challenge

`$ git clone project`
`$ cd express-claim-test`

#### Install dependencies
You can install the dependencies with yarn or npm (I honestly always prefer yarn)
`$ yarn`
`$ npm install`

#### Load your Environment Variables

You will need to create a .env file and set the Environment Variables listed in the above table or load them manually through the **export VAR=VALUE** command.

**When you change NODE_ENV between development and test , you must remember to change the value of the DB_DATABASE Environment Variables to avoid migration problems**

#### Prepare the Environment

You will need to run the sequelize migrations and seeders. By this time only the user table is loaded with seeders.

**IMPORTANT:** The user's password must to be encrypted, you can use https://bcrypt-generator.com/ to generate your encrypted password and save them through the seeders process.

If you have the sequelize cli installed globally you can do:

`$ sequelize db:migrate`
`$ sequelize db:seed:all`

Otherwise you should do:

`$ node_modules/.bin/sequelize db:migrate`
`$ node_modules/.bin/sequelize db:seed:all`

#### Run the project

`$ yarn start`
`$ npm start`

#### Run the test

`$ yarn run test:unit`
`$ yarn run test:integration`
