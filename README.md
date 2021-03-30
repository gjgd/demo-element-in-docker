# Element in docker

Based on https://github.com/transmute-industries/sidetree.js/issues/154

Shows how to initialize Element

## Without docker

```bash
npm i
npm run build
npm start
```

## With docker

```
docker build . -t element-in-docker
docker run --rm -it element-in-docker
```
