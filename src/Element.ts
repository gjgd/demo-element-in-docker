import Web3 from 'web3'
import { EthereumLedger } from '@sidetree/ethereum'
import { IpfsCasWithCache } from '@sidetree/cas-ipfs'
import { Element } from '@sidetree/element'
import { MongoDb } from '@sidetree/db';

export interface ElementConfig {
  applicationWalletPrivateKey: string
  contentAddressableStoreServiceUri: string
  databaseName: string
  didMethodName: string
  ethereumRpcUrl: string
  mongoDbConnectionString: string
  batchingIntervalInSeconds: number
  observingIntervalInSeconds: number
  maxConcurrentDownloads: number
  elementAnchorContract: string
  versions: any
}

export class DidElement {
  static getLedger = async (config: ElementConfig): Promise<EthereumLedger> => {
    const web3 = new Web3(config.ethereumRpcUrl)
    // const { applicationWalletPrivateKey } = config
    // const acct = web3.eth.accounts.privateKeyToAccount(applicationWalletPrivateKey)
    // web3.eth.accounts.wallet.add(acct)
    // const a = web3.eth.accounts.create()
    return new EthereumLedger(web3, config.elementAnchorContract)
  }

  static getCas = async (config: ElementConfig): Promise<IpfsCasWithCache> => {
    return new IpfsCasWithCache(
      config.contentAddressableStoreServiceUri,
      config.mongoDbConnectionString,
      config.databaseName
    )
  }

  static initialize = async (config: ElementConfig, startObserver = false, startBatchWriter = false): Promise<Element> => {
    try {
      await MongoDb.resetDatabase(
        config.mongoDbConnectionString,
        config.databaseName!
      );
      
      const cas = await DidElement.getCas(config)
      const ledger = await DidElement.getLedger(config)

      const element = new Element(config, config.versions, ledger, cas)
      await element.initialize(startObserver, startBatchWriter)
      return element
    } catch (error) {
      throw new Error(`could not initialize Sidetree Element: ${error}`)
    }
  }
}
