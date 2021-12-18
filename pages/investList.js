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

              <div>
                  <a className={styles.prot}>Project</a>  <a className={styles.epot}>Epoch</a>    <a className={styles.joit}>Join</a>
              </div>
 <div className={styles.maincontainer}>
              <div className={styles.projectList}>
              <div className={styles.project}>
                <div className={styles.projectName}>Osmosis</div>
                <div className={styles.epoch}>Epoch 4</div>
                <button className={styles.invbutton1}>Invest</button>
              </div>
      

              <div className={styles.project}>
                <div className={styles.projectName}>Planetarium</div>
                <div className={styles.epoch}>Epoch 3</div>
                <button className={styles.invbutton2}>Invest</button>
              </div>
  

              <div className={styles.project}>
                <div className={styles.projectName}>Near</div>
                <div className={styles.epoch}>Epoch 3</div>
                <button className={styles.invbutton3}>Invest</button>
              </div>


              <div className={styles.project}>
                <div className={styles.projectName}>Cosmos</div>
                <div className={styles.epoch}>Epoch 3</div>
                <button className={styles.invbutton4}>Invest</button>
              </div>

              <div className={styles.project}>
                <div className={styles.projectName}>Cosmos</div>
                <div className={styles.epoch}>Epoch 3</div>
                <button className={styles.invbutton5}>Invest</button>
              </div>

              <div className={styles.project}>
                <div className={styles.projectName}>Cosmos</div>
                <div className={styles.epoch}>Epoch 3</div>
                <button className={styles.invbutton6}>Invest</button>
              </div>

              <div className={styles.project}>
                <div className={styles.projectName}>Cosmos</div>
                <div className={styles.epoch}>Epoch 3</div>
                <button className={styles.invbutton7}>Invest</button>
              </div>

              
   
           </div>
      </div>
 </div>
    );

};