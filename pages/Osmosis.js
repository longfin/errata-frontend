import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { chainInfo } from "../config/chain";
import { useEffect, useState } from "react";
import { getKeplrFromWindow } from "@keplr-wallet/stores";
import { Dec, DecUtils } from "@keplr-wallet/unit";
import {
  makeSignDoc,
  makeStdTx,
} from "@cosmjs/launchpad";


export default function Invest () {
  // FIXME should be changed;
  const protocolId = 1;
  const [keplr, setKeplr] = useState(null);
  const [bech32Address, setBech32Address] = useState("");  
  const KeyAccountAutoConnect = "account_auto_connect";
  const [protocol, setProtocol] = useState(null);
  
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

  useEffect(() => {
    fetch(`${chainInfo.rest}/errata/audit/v1beta1/protocol/${protocolId}`).then(async res => {
      const data = await res.json();
      setProtocol(data);
    });
  }, []);

  async function sendTx(type, amount)
  {
    var res = await fetch(`${chainInfo.rest}/auth/accounts/${bech32Address}`);
    var accountData = await res.json();
    const accountNumber =
      (accountData && accountData.result.value.account_number) || "0";
    const sequence = (accountData && accountData.result.value.sequence) || "0";
    const aminoMsgs = [
      {
        type: type,
        value: {
          sender: bech32Address,
          pool_id: protocolId,
          token_in: parseInt(amount, 10),
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
      /*
      await keplr.sendTx(
        chainInfo.chainId,
        signedTx,
        "async"
      );
      */
      if (type === "errata/audit/MsgJoinAttackPool") {
        protocol.attack_pool = (parseInt(protocol.attack_pool, 10) + parseInt(amount, 10)).toString();
      }
      else {
        protocol.defense_pool = (parseInt(protocol.defense_pool, 10) + parseInt(amount, 10)).toString();
      }

      setProtocol({...protocol});
    }
    catch (e){
    }
  }

  async function handleAttack() {
    var amount = prompt("Please enter an amount to invest the attack pool");
    await sendTx("errata/audit/MsgJoinAttackPool", amount);
  }

  async function handleDefense() {
    var amount = prompt("Please enter an amount to invest the defense pool");
    await sendTx("errata/audit/MsgJoinDefensePool", amount);
  }

  return (
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
          {protocol === null ? "-" : protocol.attack_pool} ERT
        </div>

        <div className={styles.defensecircle}>
        </div>

        <div className={styles.defens}>
          Defense
        </div>

        <div className={styles.defensbalance}>
          {protocol === null ? "-" : protocol.defense_pool} ERT
        </div>

        <div className={styles.osmo}>Osmosis
        </div>   

        <div className={styles.osmoepoch}>Epoch 4</div>    

        <button className={styles.abutton} onClick={() => {handleAttack()}}>Attack</button> 

        <button className={styles.dbutton} onClick={() => {handleDefense()}}>Defense</button>

        <button className={styles.submitbutton}>Submit Errata</button>
 
        <div className={styles.boxx}>
            <h2 className={styles.overview}>Overview</h2>
            <br/>
            <br/>
            <br/>
            <div className={styles.ovv}>
            <p >
            Osmosis is an indexing protocol for querying networks like Ethereum and IPFS. It is a decentralized network comprised of multiple stakeholders incentivized to build and offer an efficient and reliable open data marketplace, through GraphQL-based APIs.

The Graph learns what and how to index Blockchain data based on subgraph descriptions, known as the subgraph manifest. The subgraph description defines the smart contracts of interest for a subgraph, the events in those contracts to pay attention to, and how to map data to data that The Graph will index and store in its decentralized network, to be served by Indexers. Indexers are network participants responsible for running their own infrastructure capable of indexing subgraphs and subsequently serve such data.

The network is fully permissionless, meaning that every stakeholder can design, implement and deploy subgraphs, with Indexers choosing which subgraphs to index based on a number of factors such as Curators’ interest (signaling high-quality ones which may result in high query volume). Delegators are another key network participant in this open data economy, who delegate their stake towards Indexers, receiving, in turn, a portion of both network rewards and fees from subsequently served queries. Like Delegators, Curators also receive a portion of the query fees, when staking their own GRT in a subgraph’s bounding curve (signaling).

            </p>
            <h2 className={styles.reward}>
            Reward by Threat Level
            </h2>
            <p>
            Rewards are distributed according to the impact of the vulnerability based on the Immunefi Vulnerability Severity Classification System. This is a simplified 5-level scale, with separate scales for websites/apps and smart contracts/blockchains, encompassing everything from the consequence of exploitation to privilege required to the likelihood of a successful exploit.
<br/>
<br/>
Rewards for critical vulnerabilities are capped at 10% of economic damage, primarily focusing on the possible loss of funds for Indexers, Delegators, and Curators at Smart Contract level only, but also taking into consideration other aspects such as branding and PR, at the discretion of The Graph Foundation.
<br/>
<br/>
In order to qualify for a reward, bug bounty hunters will need to provide KYC through https://register.thegraph.com. Additionally, all bug reports must come with log components, reproduction, and data about vulnerabilities to support learnings and bug fixes. This can be satisfied by providing relevant screenshots, docs, code, and steps to reproduce the issue.


            </p>

            <h2 className={styles.scope}>
            Assets in Scope
            </h2>
            <Image src="/scope.png" alt="scope" width="1400" height="843px"/>
            </div>
        </div>
      </div>
    );

};