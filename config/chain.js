import { Bech32Address } from "@keplr-wallet/cosmos";

export const chainInfo = {
    rpc: "http://localhost:26657",
    rest: "http://localhost:1317",
    chainId: "errata-localnet-1",
    chainName: "Errata",
    stakeCurrency: {
      coinDenom: "ERT",
      coinMinimalDenom: "uert",
      coinDecimals: 6,
    },
    bip44: {
      coinType: 118,
    },
    bech32Config: Bech32Address.defaultBech32Config("errata"),
    currencies: [
      {
        coinDenom: "ERT",
        coinMinimalDenom: "uert",
        coinDecimals: 6,
      },
    ],
    feeCurrencies: [
      {
        coinDenom: "ERT",
        coinMinimalDenom: "uert",
        coinDecimals: 6,
      },
    ],
    features: ["stargate", "ibc-transfer"],
  };
