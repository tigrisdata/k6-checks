# k6-checks

Set of checks that are run through [k6](https://k6.io/docs/).

## Installation

Install k6 by following the instructions available
[here](https://k6.io/docs/getting-started/installation/).

Set up the npm project

```shell
npm install .
```

## Usage

The checks are available in the [src](./src) directory. They can be executed
as follows:

Run the HTTP health check

```shell
k6 run src/https-healthcheck.js
```

Run the gRPC health check

```shell
k6 run src/grpc-healthcheck.js
```
