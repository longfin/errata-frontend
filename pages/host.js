import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";


export default function Host() {
    return (
      <div className={styles.Host}>

        <div className={styles.headbox}>
          <Link href="/"  >
            <img src="/logo.png" alt="hollo" className={styles.logoImage} />
          </Link>
        </div>

        <div className={styles.caef}>
          <p>Create an Errata form</p>
        </div>

        <div className={styles.titlerg}>
          <lable>Project name
              <br/>
          <input type="text" className="titler"/>
          </lable>
        </div>


        <div className={styles.logorg}>
          <label>Logo
              <br/>
          <input type="file" className={styles.logof}/>
          </label>
        </div>


        <div className={styles.descriptionrg}>
          <label>Discription
              <br/>
          <input type="file" className="descf" />
          </label>
        </div>

      <div className={styles.hcd}>
      <p>Help contributors discover your Errata</p>
      </div>

        <div className={styles.epochrg}>
        <label>Epoch number
            <br/>
        <input type="range" min="1" max="20" step="1" />
        </label>

        <div className={styles.fundingrg}>
        <label>External funding history
            <br/>
        <input type="text" className="textbox" />
        </label>
      </div>


      </div>


      </div>
    );
  }