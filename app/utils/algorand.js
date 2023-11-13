"use client";

import algosdk from "algosdk";
import crypto from 'crypto-js';

const config = {
  algodClientUrl: process.env.NEXT_PUBLIC_ALGOD_CLIENT_URL,
  algodClientPort: "",
  algodClientToken: process.env.NEXT_PUBLIC_ALGOD_CLIENT_TOKEN,
}

const mnemonic = process.env.NEXT_PUBLIC_ALGO_ACCOUNT_KEY;

const algodClient = new algosdk.Algodv2(
  {
    'X-API-Key': config.algodClientToken,
  },
  config.algodClientUrl,
  config.algodClientPort,
);

const waitForConfirmation = async function (txId) {
  let response = await algodClient.status().do();
  let lastround = response["last-round"];
  while (true) {
    const pendingInfo = await algodClient
      .pendingTransactionInformation(txId)
      .do();
    if (
      pendingInfo["confirmed-round"] !== null &&
      pendingInfo["confirmed-round"] > 0
    ) {
      console.log(
        "Transaction " +
          txId +
          " confirmed in round " +
          pendingInfo["confirmed-round"]
      );
      break;
    }
    lastround++;
    await algodClient.statusAfterBlock(lastround).do();
  }
}

export const createAlgorandNFT = async (image, metadata) => {
  const account = algosdk.mnemonicToSecretKey(mnemonic);
  const params = await algodClient.getTransactionParams().do();

  const defaultFrozen = false;
  const unitName = metadata?.name?.substr(0, 3);
  const assetName = metadata?.name || image.split('.')[0];
  const url = image.split('?')[0];

  const managerAddr = account.addr;
  const reserveAddr = undefined;
  const freezeAddr = undefined;
  const clawbackAddr = undefined;
  const decimals = 0;
  const total = 1;

  const metadataUint8Array = JSON.stringify(metadata);

  // Create a CryptoKey from the ArrayBuffer
  const hashedData = crypto.SHA256(metadataUint8Array).toString(crypto.enc.Hex);

  const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
    from: account.addr,
    total,
    decimals,
    assetName,
    unitName,
    assetURL: url,
    assetMetadataHash: hashedData.slice(0, 32),
    defaultFrozen,
    freeze: freezeAddr,
    manager: managerAddr,
    clawback: clawbackAddr,
    reserve: reserveAddr,
    suggestedParams: params,
  });

  const rawSignedTxn = txn.signTxn(account.sk);
  const tx = await algodClient.sendRawTransaction(rawSignedTxn).do();

  await waitForConfirmation(tx.txId);
  const ptx = await algodClient.pendingTransactionInformation(tx.txId).do();
  const assetID = ptx["asset-index"];

  console.log('Account: ',account.addr,' Has created ASA with ID: ', assetID);
  console.log(`https://testnet.algoexplorer.io/asset/${assetID}`);
  const nftUrl = `https://testnet.algoexplorer.io/asset/${assetID}`;
  return { nftUrl };
};
