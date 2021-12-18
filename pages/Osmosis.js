import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { chainInfo } from "../config/chain";
import { useEffect, useState } from "react";
import { getKeplrFromWindow } from "@keplr-wallet/stores";


export default function investList () {
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
        <hr className={styles.line}/>
        
        
        <p className={styles.totalinv}>
            Total Investment
        </p>

        <div className={styles.attakcircle}>   
        </div>

        <div className={styles.attak}>
            Attack
        </div>

        <div className={styles.attakbalance}>
              30.16 ERT
        </div>

        <div className={styles.defensecircle}>

        </div>

        <div className={styles.defens}>
              Defense
        </div>

        <div className={styles.defensbalance}>
              20.71 ERT
        </div>

        <div className={styles.osmo}>Osmosis
        </div>   

        <div className={styles.osmoepoch}>Epoch 4</div>    

        <button className={styles.abutton}>Attack</button> 


        
        <button className={styles.dbutton}>Defense</button>      

        <button className={styles.submitbutton}>Submit Errata</button>
 
        <div className={styles.boxx}>
              <h2 className={styles.overview}>Overview</h2>
              <br/>
              <br/>
              <br/>
              <div className={styles.ovv}>
              <p >
              The Graph is an indexing protocol for querying networks like Ethereum and IPFS. It is a decentralized network comprised of multiple stakeholders incentivized to build and offer an efficient and reliable open data marketplace, through GraphQL-based APIs.

The Graph learns what and how to index Blockchain data based on subgraph descriptions, known as the subgraph manifest. The subgraph description defines the smart contracts of interest for a subgraph, the events in those contracts to pay attention to, and how to map data to data that The Graph will index and store in its decentralized network, to be served by Indexers. Indexers are network participants responsible for running their own infrastructure capable of indexing subgraphs and subsequently serve such data.

The network is fully permissionless, meaning that every stakeholder can design, implement and deploy subgraphs, with Indexers choosing which subgraphs to index based on a number of factors such as Curators’ interest (signaling high-quality ones which may result in high query volume). Delegators are another key network participant in this open data economy, who delegate their stake towards Indexers, receiving, in turn, a portion of both network rewards and fees from subsequently served queries. Like Delegators, Curators also receive a portion of the query fees, when staking their own GRT in a subgraph’s bounding curve (signaling).

              </p>
              </div>
        </div>
      </div>

    );

};