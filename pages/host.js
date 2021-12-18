import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import TextField from '@mui/material/TextField';
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
  root: { backgroundColor: "white" },
  box: { backgroundColor: "white" },
  input: {
    root: { backgroundColor: "white", color: "white" }
  }
}));

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
          <label>Project name 
              <br/>
        
        <input className={styles.inputBox}>
        </input>
          </label>
        </div>


       


        <div className={styles.descriptionrg}>
          <label>Discription 
              <br/>
          <input className={styles.descinput}/>
          </label>
        </div>

      <div className={styles.hcd}>
      <p>Set goals for Errata </p>
      </div>

        <div className={styles.epochrg}>
        <label>Epoch number 
            <br/>
        <input className={styles.epochinput} />
        </label>


        <div className={styles.vulner}>
          <label> Target vulnerabilities in scope 
          <br/>
          <input className={styles.epochinput}></input>

          </label>

        </div>


        


   

      <div className={styles.giturl}>
        <label>Github Url 
            <br/>
        <input className={styles.gitinputBox} />
        </label>
      </div>




      <div className={styles.proweb}>
        <label>Project Website
            <br/>
        <input type="text" className={styles.prowebinput} />
        </label>
      </div>

      

      <button className={styles.launcherrata}>Launch Errata</button>

      </div>

      </div>


    
    );
  }