import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Nextpage } from "next";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { getKeplrFromWindow } from "@keplr-wallet/stores";

import investStyles from "../styles/Invest.module.css";
import Grid from '@mui/material/Grid';


export default function invest () {
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

    return(
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
        </div>
    )
}