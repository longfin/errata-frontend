import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Host.module.css";
import { useEffect, useState } from "react";
import { getKeplrFromWindow } from "@keplr-wallet/stores";
import { chainInfo } from "../config/chain";
import { makeStyles } from "@material-ui/core/styles";
import {
  makeSignDoc,
  makeStdTx,
} from "@cosmjs/launchpad";

const useStyles = makeStyles((theme) => ({
  root: { backgroundColor: "white" },
  box: { backgroundColor: "white" },
  input: {
    root: { backgroundColor: "white", color: "white" },
  },
}));

export default function Host() {
  const [keplr, setKeplr] = useState(null);
  const [bech32Address, setBech32Address] = useState("");
  const KeyAccountAutoConnect = "account_auto_connect";

  const connectWallet = async () => {
    try {
      const newKeplr = await getKeplrFromWindow();

      if (!newKeplr) {
        throw new Error("Keplr extension not found");
      }

      await newKeplr.experimentalSuggestChain(chainInfo);
      await newKeplr.enable(chainInfo.chainId);

      localStorage?.setItem(KeyAccountAutoConnect, "true");
      setKeplr(newKeplr);
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    const shouldAutoConnectAccount =
      localStorage?.getItem(KeyAccountAutoConnect) != null;
    const loadAccountInfo = async () => {
      if (keplr != null) {
        const key = await keplr.getKey(chainInfo.chainId);
        setBech32Address(key.bech32Address);
      }
    };

    if (shouldAutoConnectAccount) {
      connectWallet();
    }

    loadAccountInfo();
  }, [keplr]);

  async function handleSubmit(e) {
    e.preventDefault();
    var res = await fetch(`${chainInfo.rest}/auth/accounts/${bech32Address}`);
    var accountData = await res.json();
    const accountNumber =
      (accountData && accountData.result.value.account_number) || "0";
    const sequence = (accountData && accountData.result.value.sequence) || "0";
    const aminoMsgs = [
      {
        type: "errata/audit/MsgRegisterProtocol",
        value: {
          sender: bech32Address,
          title: e.target['title'].value,
          description: e.target['description'].value,
          source_code:  e.target['sourceUrl'].value,
          project_home: e.target['projectUrl'].value,
          category: e.target['category'].value,
        },
      },
    ];
    const fee = {
      gas: "200000",
      amount: [
        {
          amount: "0",
          denom: "uert",
        },
      ],
    };

    const signDoc = makeSignDoc(
      aminoMsgs,
      fee,
      chainInfo.chainId,
      "",
      accountNumber.toString(),
      sequence.toString()
    );

    try {
      const signResponse = await keplr.signAmino(
        chainInfo.chainId,
        bech32Address,
        signDoc,
        undefined
      );
      const signedTx = makeStdTx(signResponse.signed, signResponse.signature);
      await keplr.sendTx(
        chainInfo.chainId,
        signedTx,
        "async"
      );
    }
    catch {
    }
  }

  return (
    <>
      <Head>
        <title>Errata</title>
        <meta name="description" content="Decentralized Audit Organization" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <header className={styles.header}>
          <Link href="/">
            <div className={styles.logoImage}>
              <Image src="/logo.png" alt="logo" width="170" height="45.5" />
            </div>
          </Link>
          {bech32Address !== "" ? (
            <span className={styles.bech32Address}>
              Connected as <code>{bech32Address}</code>
            </span>
          ) : (
            <button className={styles.connectwallet} onClick={connectWallet}>
              Connect Wallet
            </button>
          )}
        </header>
        <div className={styles.hostMainSection}>
        </div>
        <div className={styles.Host}>
          <div className={styles.caef}>
            <p>Create an Errata form</p>
          </div>
          <div className={styles.titlerg}>
            <label>
              Protocol name
              <br />
              <input className={styles.inputBox} placeholder=" Protocol Name"></input>
            </label>
          </div>

          <div className={styles.descriptionrg}>
            <label>
              Description
              <br />
              <input className={styles.descinput}  />
            </label>
          </div>

          <div className={styles.giturl}>
              <label>
                Github URL
                <br />
                <input className={styles.gitinputBox} placeholder=" https://github.com/mygrant" />
              </label>
          </div>

          <div className={styles.proweb}>
              <label>
                Project Website
                <br />
                <input type="text" className={styles.prowebinput} placeholder=" https://mywebsite.com"/>
              </label>
          </div>

          <div className={styles.errataCaef}>
            <p>Set goals for Errata</p>
          </div>

          <div className={styles.enum}>
              <label>
                Epoch Number
                <br />
                <input type="text" className={styles.prowebinput} placeholder=" 2, 3, 5"/>
              </label>
          </div>         

          <div className={styles.vul}>
              <label>
                External Funding & token sales
                <br />
                <input type="text" className={styles.prowebinput} placeholder=" 2, 3, 5"/>
              </label>
          </div>      
          <button className={styles.launcherrata}>Host Errata</button>
          <div className={styles.fin}> .
          </div>
        </div>
      </div>
    </>
  );
}
