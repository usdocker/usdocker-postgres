# Useful script for 'postgres' service

This Useful Script creates a postgres server based on a Docker Image.
You don't have know docker to use this solution.

## Installing

```bash
npm install -g @usdocker/usdocker  # Install it first
npm install -g @usdocker/postgres
usdocker -r    # Update USDocker database
```

## Start the postgres service

```bash
usdocker postgres up
```

## Stop the postgres service

```bash
usdocker postgres down
```

## Check the postgres status

```bash
usdocker postgres status
```

## Use the `psql` command line client

```bash
usdocker postgres client -- [args]
```

## Run the bash 

```bash
usdocker postgres connect -- [args]
```


## Customize your service

You can setup the variables by using:

```bash
usdocker postgres --set variable=value
```

Default values

 - image: "postgres:9-alpine",
 - folder: "/home/jg/.usdocker/data/postgres",
 - user: "postgres",
 - password: "password",
 - port: 5432

