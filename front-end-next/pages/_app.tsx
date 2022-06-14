import Navbar from "../components/navbar/Navbar";
import "../styles/globals.css";
import { DataProvider } from '../components/mainContext/globalData';
import StartUp from "../components/StartUp";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return <>
    <DataProvider>
      <Head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"></link>
      </Head>
      <StartUp />
      <Navbar />
      <Component {...pageProps} />
    </DataProvider>
  </>;
}

export default MyApp;
