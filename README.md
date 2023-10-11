# Versions

#### Node: 14.19.3
#### Typescript: 5.2.2
#### Testing: JEST



# Environment Setup

Starting from cloning the repository by the following command:

```
git clone git@github.com:abid-mahmood/node-assignment.git
```

or using HTTPS (if you haven't added your SSH):
```
git clone https://github.com/abid-mahmood/node-assignment.git
```


After confirming the versions on your local machine and cloning the repository to the local, you will need to run the following command:

```
npm run install
```

When the command will be completed, it will add the `node_modules/` directory to your local environment.

We are using the `nodemon` in order to cater the real-time changes so, for the development purposes, please run the following command to run the project:

```
npm run dev
```

Above command will run the `server` on the port `3000` so, you can access the APIs using POSTMAN with the following url:

```
localhost:3000/
```

For tests, you will need to run the following command:

```
npm run test
```
