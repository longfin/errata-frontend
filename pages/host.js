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
          <lable>Project name <a className={styles.required}>' Required '</a>  
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
          <label>Discription <a className={styles.required}>' Required '</a>  
              <br/>
          <input type="file" className="descf" />
          </label>
        </div>

      <div className={styles.hcd}>
      <p>Set goals for Errata </p>
      </div>

        <div className={styles.epochrg}>
        <label>Epoch number <a className={styles.required}>' Required '</a>  
            <br/>
        <input type="range" min="1" max="20" step="1" />
        </label>

        <div className={styles.epochl}>
          <label> Epoch length <a className={styles.required}>' Required '</a>  
          <br/>
          <input type="number"></input>

          </label>


        </div>

        <div className={styles.fundingrg}>
        <label>External funding history
            <br/>
        <input type="text" className="textbox" />
        </label>
      </div>

      <div className={styles.giturl}>
        <label>Githib Url <a className={styles.required}>' Required '</a>  
            <br/>
        <input type="text" className="textbox" />
        </label>
      </div>

      <div className={styles.proweb}>
        <label>Project Website
            <br/>
        <input type="text" className="textbox" />
        </label>
      </div>

      <div className={styles.setgoal}>
        <label>Set goals for each epoch
          <br/>
      <input type="text"></input>
        </label>
      </div>

      <div>
        <label className={styles.vulner}>Target vulnerabilities in scope
          <br/>
        <input type="file"></input>
        </label>
      </div>

    
      <div className={styles.help}>
      <p> Help contributers discover your Errata </p>
      </div>

      <label className={styles.category}>
       Category
       <br/>
        <input type="text"></input>
      </label>


      <button className={styles.launcherrata}>Launch Errata</button>

      </div>

      </div>


    
    );
  }