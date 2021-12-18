import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { chainInfo } from "../config/chain";
import { useEffect, useState } from "react";
import { getKeplrFromWindow } from "@keplr-wallet/stores";

export default function Home() {
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
      if (keplr != null)
      {
        const key= await keplr.getKey(chainInfo.chainId);
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
            <Image src="/logo.png" alt="logo" width="250" height="62.5"/>
          </Link>
          { 
            (bech32Address !== "") 
            ? <span className={styles.bech32Address}>Connected as <code>{bech32Address}</code></span>
            : <button className={styles.connectwallet} onClick={connectWallet}>
              Connect Wallet
            </button>
          }
        </header>
        <div className={styles.mainSection}>
          <div className={styles.left}>
            <div className={styles.title}>
              <div>Decentralized</div>
              <div>Audit!</div>
              <div className={styles.lastWord}>Organization</div>
            </div>
            <div className={styles.description}>
              <p>A platform where token sales and audits <br/>
                are conducted simultaneously within <br/>
                a transparent investment environment.
              </p>
            </div>
            <div className={styles.buttons}>
              <Link href="/host">
                <a className={styles.hostButton}>Host Errata</a>
              </Link>
              <Link href="/investList">
                <a className={styles.investButton}>Invest</a>
              </Link>
            </div>
            <a className={styles.hew}>How Errata works →</a>
          </div>
          <div className={styles.right}>
            <div className={styles.ongoing}>Ongoing Errata</div>
            <Link href="investList">
            <div className={styles.projects}>
              <div className={styles.project}>
                <div className={styles.projectName}>Project 1</div>
                <div className={styles.epoch}>Epoch 3</div>
              </div>
              <div className={styles.project}>
                <div className={styles.projectName}>Project 1</div>
                <div className={styles.epoch}>Epoch 3</div>
              </div>
              <div className={styles.project}>
                <div className={styles.projectName}>Project 1</div>
                <div className={styles.epoch}>Epoch 3</div>
              </div>
              <div className={styles.project}>
                <div className={styles.projectName}>Project 1</div>
                <div className={styles.epoch}>Epoch 3</div>
              </div>
       
             
            </div>
            </Link>
            <Link href="/investList">
              <a className={styles.exp}>Explore projects →</a>
            </Link>
          </div>
 
        </div>
      </div>
    </>
  )
};
