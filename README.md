# Element in docker

Based on https://github.com/transmute-industries/sidetree.js/issues/154

Shows how to initialize Element in Docker

Here we use docker-compose because we need mongo, ipfs and ganache running locally

```
docker-compose up --build
```

If you update `mongoDbConnectionString` `contentAddressableStoreServiceUri` and `ethereumRpcUrl` values to point to remote services, you don't need docker-compose and you can run:

```
docker build . -t element-in-docker
docker run -it element-in-docker
```
