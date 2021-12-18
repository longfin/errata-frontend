import Head from "next/head";
import Link from "next/link";
import { Nextpage } from "next";
import styles from "../styles/Home.module.css";
import investStyles from "../styles/Invest.module.css";
import Grid from '@mui/material/Grid';
import Header from '../components/Header'


const Invest = () => {
    return (
        <>
            <Header>
                
            </Header>
            {/* <Head className="header">
                <Grid container className={investStyles.headerStyle}>
                    <Grid item xs={4} className="Header Logo">
                        <Link href="/"  >
                            <img src="/logo.png" alt="hollo" className={styles.logoImage} />
                        </Link>
                    </Grid>
                    <Grid item xs={8}></Grid>
                </Grid>
            </Head> */}
            <main>
              
            </main>
        </>
    );
};

export default Invest;
