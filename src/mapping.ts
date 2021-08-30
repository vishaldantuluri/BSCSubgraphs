import { BigInt } from "@graphprotocol/graph-ts"
import {
  NFT,
 Transfer
} from "../generated/NFT/NFT"
import {
  ERC721Shared,
  Transfer as BinanaceTransfer
} from "../generated/ERC721SHARED/ERC721Shared"
import {
  MintMulTRSRNFT,
  TransferSingle
 } from "../generated/MintMulTRSRNFT/MintMulTRSRNFT"
import { TokenInfo, TokenTransfer, CreatorInfo } from "../generated/schema"

export function handleTransfer(event: Transfer): void {
  let tokenTransfer = new TokenTransfer(
    event.transaction.hash.toHexString() + event.logIndex.toString()
  );
  tokenTransfer.from = event.params.from.toHexString();
  tokenTransfer.to = event.params.to.toHexString();
  tokenTransfer.transferredAt = event.block.timestamp;
  tokenTransfer.tokenId = event.params.tokenId;

  let tokenInfo = TokenInfo.load(
    event.params.tokenId.toString() + event.address.toHexString()
  );

  if (!tokenInfo) {
    tokenInfo = new TokenInfo(
      event.params.tokenId.toString() + event.address.toHexString()
    );
    tokenInfo.contractAddress = event.address.toHexString();
    tokenInfo.marketplace = "airNFT"
    tokenInfo.creatorAddress = event.params.to.toHexString();
    tokenInfo.blockNumber = event.block.number;
    tokenInfo.mintTransactionHash = event.transaction.hash.toHexString();
    tokenInfo.createdOn = event.block.timestamp;
    tokenInfo.owner = event.params.to.toHexString();
    tokenInfo.lastTransfer = event.block.timestamp;
    tokenInfo.numberOfTransfers = 1;
    //tokenInfo.transfers = [event.logIndex.toString()];
    let tokenContract = NFT.bind(event.address);
    let result = tokenContract.try_tokenURI(event.params.tokenId);
    if (result.reverted) tokenInfo.tokenURI = "";
    else tokenInfo.tokenURI = result.value;
    let creatorInfo = CreatorInfo.load(event.params.to.toHexString());
    if(!creatorInfo){
      creatorInfo = new CreatorInfo(event.params.to.toHexString());
      creatorInfo.address = event.params.to.toHexString();
      creatorInfo.numberOfCreations = 1;
    } else {
      creatorInfo.numberOfCreations = creatorInfo.numberOfCreations + 1;
    }
    tokenInfo.creatorInfo = tokenInfo.creatorAddress;
    creatorInfo.save();
  } else {
    tokenInfo.numberOfTransfers = tokenInfo.numberOfTransfers + 1;
    tokenInfo.owner = event.params.to.toHexString();
    tokenInfo.lastTransfer = event.block.timestamp;
    tokenInfo.blockNumber = event.block.timestamp;
    // tokenInfo.transfers.push(event.logIndex.toString());
  }
  tokenTransfer.tokenInfo =
    event.params.tokenId.toString() + event.address.toHexString();
  tokenTransfer.save();
  tokenInfo.save();
}

export function handleBinanceTransfer(event: BinanaceTransfer): void {
  let tokenTransfer = new TokenTransfer(
    event.transaction.hash.toHexString() + event.logIndex.toString()
  );
  tokenTransfer.from = event.params.from.toHexString();
  tokenTransfer.to = event.params.to.toHexString();
  tokenTransfer.transferredAt = event.block.timestamp;
  tokenTransfer.tokenId = event.params.tokenId;

  let tokenInfo = TokenInfo.load(
    event.params.tokenId.toString() + event.address.toHexString()
  );

  if (!tokenInfo) {
    tokenInfo = new TokenInfo(
      event.params.tokenId.toString() + event.address.toHexString()
    );
    tokenInfo.contractAddress = event.address.toHexString();
    tokenInfo.marketplace = "Binance"
    tokenInfo.creatorAddress = event.params.to.toHexString();
    tokenInfo.blockNumber = event.block.number;
    tokenInfo.mintTransactionHash = event.transaction.hash.toHexString();
    tokenInfo.createdOn = event.block.timestamp;
    tokenInfo.owner = event.params.to.toHexString();
    tokenInfo.lastTransfer = event.block.timestamp;
    tokenInfo.numberOfTransfers = 1;
    //tokenInfo.transfers = [event.logIndex.toString()];
    let tokenContract = ERC721Shared.bind(event.address);
    let result = tokenContract.try_tokenURI(event.params.tokenId);
    if (result.reverted) tokenInfo.tokenURI = "";
    else tokenInfo.tokenURI = result.value;
    let creatorInfo = CreatorInfo.load(event.params.to.toHexString());
    if(!creatorInfo){
      creatorInfo = new CreatorInfo(event.params.to.toHexString())
      creatorInfo.address = event.params.to.toHexString();
      creatorInfo.numberOfCreations = 1;
    } else {
      creatorInfo.numberOfCreations = creatorInfo.numberOfCreations + 1;
    }
    tokenInfo.creatorInfo = tokenInfo.creatorAddress;
    creatorInfo.save();
  } else {
    tokenInfo.numberOfTransfers = tokenInfo.numberOfTransfers + 1;
    tokenInfo.owner = event.params.to.toHexString();
    tokenInfo.lastTransfer = event.block.timestamp;
    tokenInfo.blockNumber = event.block.timestamp;
    // tokenInfo.transfers.push(event.logIndex.toString());
  }
  tokenTransfer.tokenInfo =
    event.params.tokenId.toString() + event.address.toHexString();
  tokenTransfer.save();
  tokenInfo.save();
}

export function handleTransferSingle(event: TransferSingle): void {
  let tokenTransfer = new TokenTransfer(
    event.transaction.hash.toHexString() + event.logIndex.toString()
  );
  tokenTransfer.from = event.params.from.toHexString();
  tokenTransfer.to = event.params.to.toHexString();
  tokenTransfer.transferredAt = event.block.timestamp;
  tokenTransfer.tokenId = event.params.id

  let tokenInfo = TokenInfo.load(
    event.params.id.toString() + event.address.toHexString()
  );

  if (!tokenInfo) {
    tokenInfo = new TokenInfo(
      event.params.id.toString() + event.address.toHexString()
    );
    tokenInfo.contractAddress = event.address.toHexString();
    tokenInfo.marketplace = "Treasureland"
    tokenInfo.creatorAddress = event.params.to.toHexString();
    tokenInfo.blockNumber = event.block.number;
    tokenInfo.mintTransactionHash = event.transaction.hash.toHexString();
    tokenInfo.createdOn = event.block.timestamp;
    tokenInfo.owner = event.params.to.toHexString();
    tokenInfo.lastTransfer = event.block.timestamp;
    tokenInfo.numberOfTransfers = 1;
    //tokenInfo.transfers = [event.logIndex.toString()];
    let tokenContract = MintMulTRSRNFT.bind(event.address);
    let result = tokenContract.try_uri(event.params.id);
    if (result.reverted) tokenInfo.tokenURI = "";
    else tokenInfo.tokenURI = result.value;
    let creatorInfo = CreatorInfo.load(event.params.to.toHexString());
    if(!creatorInfo){
      creatorInfo = new CreatorInfo(event.params.to.toHexString())
      creatorInfo.address = event.params.to.toHexString();
      creatorInfo.numberOfCreations = 1;
    } else {
      creatorInfo.numberOfCreations = creatorInfo.numberOfCreations + 1;
    }
    tokenInfo.creatorInfo = tokenInfo.creatorAddress;
    creatorInfo.save();
  } else {
    tokenInfo.numberOfTransfers = tokenInfo.numberOfTransfers + 1;
    tokenInfo.owner = event.params.to.toHexString();
    tokenInfo.lastTransfer = event.block.timestamp;
    tokenInfo.blockNumber = event.block.timestamp;
    // tokenInfo.transfers.push(event.logIndex.toString());
  }
  tokenTransfer.tokenInfo =
    event.params.id.toString() + event.address.toHexString();
  tokenTransfer.save();
  tokenInfo.save();
}
