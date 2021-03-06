import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/InvestList.module.css";
import { chainInfo } from "../config/chain";
import { useEffect, useState } from "react";
import { getKeplrFromWindow } from "@keplr-wallet/stores";

export default function investList() {
  const [keplr, setKeplr] = useState(null);
  const [bech32Address, setBech32Address] = useState("");
  const KeyAccountAutoConnect = "account_auto_connect";
  const [protocols, setProtocols] = useState([]);

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
    fetch(`${chainInfo.rest}/errata/audit/v1beta1/protocols`).then(async res => {
      var data = await res.json();
      setProtocols(data.Protocol);
    })
  }, []);

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
              <Image
                src="/logo.png"
                alt="logo"
                width="170"
                height="45.5"
                left="40"
              />
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
        <div className={styles.ilMainSection}>
          <a className={styles.prot}>Project</a>{" "}
          <a className={styles.epot}>Epoch</a>{" "}
          <a className={styles.joit}>Join</a>
        </div>
        <div className={styles.maincontainer}>
          <div className={styles.projectList}>
            { protocols != null && protocols.map(
                p => 
                <div key={p.id} className={styles.project}>
                  <div className={styles.projectName}>{p.title}</div>
                  <div className={styles.ilEpoch}>Epoch 3</div>
                  <Link href="/Osmosis">
                    <button className={styles.invbutton}>Invest</button>
                  </Link>
                </div>)
            }
          </div>
        </div>
      </div>
    </>
  );
}
