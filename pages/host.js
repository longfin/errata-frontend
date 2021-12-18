import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Host.module.css";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { getKeplrFromWindow } from "@keplr-wallet/stores";
import { chainInfo } from "../config/chain";
import { makeStyles } from "@material-ui/core/styles";

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
              Project name
              <br />
              <input className={styles.inputBox}></input>
            </label>
          </div>

          <div className={styles.descriptionrg}>
            <label>
              Discription
              <br />
              <input className={styles.descinput} />
            </label>
          </div>

          <div className={styles.hcd}>
            <p>Set goals for Errata </p>
          </div>

          <div className={styles.epochrg}>
            <label>
              Epoch number
              <br />
              <input className={styles.epochinput} />
            </label>

            <div className={styles.vulner}>
              <label>
                {" "}
                Target vulnerabilities in scope
                <br />
                <input className={styles.epochinput}></input>
              </label>
            </div>

            <div className={styles.giturl}>
              <label>
                Github Url
                <br />
                <input className={styles.gitinputBox} />
              </label>
            </div>

            <div className={styles.proweb}>
              <label>
                Project Website
                <br />
                <input type="text" className={styles.prowebinput} />
              </label>
            </div>

            <button className={styles.launcherrata}>Launch Errata</button>
          </div>
        </div>
      </div>
    </>
  );
}
