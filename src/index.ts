import { DidElement } from './Element';

const config = {
  applicationWalletPrivateKey: '',
  contentAddressableStoreServiceUri: '/ip4/127.0.0.1/tcp/5001',
  databaseName: '',
  didMethodName: '',
  ethereumRpcUrl: 'http://ganache:8545',
  mongoDbConnectionString: 'mongodb://mongo:27017',
  batchingIntervalInSeconds: 5,
  observingIntervalInSeconds: 5,
  maxConcurrentDownloads: 20,
  elementAnchorContract: '',
  versions: [
    {
      startingBlockchainTime: 0,
      version: 'latest',
    },
  ],
};

(async () => {
  // Wait a few seconds to allow for all the services to initialize
  await new Promise((resolve) => setTimeout(resolve, 5 * 1000));
  const element = await DidElement.initialize(config);
  console.log('Element initialized', Boolean(element));
})();
