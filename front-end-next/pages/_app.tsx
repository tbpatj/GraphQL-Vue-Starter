import Navbar from "../components/navbar/Navbar";
import "../styles/globals.css";
import { DataProvider } from '../components/mainContext/globalData';
import StartUp from "../components/StartUp";

function MyApp({ Component, pageProps }) {
  return <>
    <DataProvider>
      <StartUp />
      <Navbar />
      <Component {...pageProps} />
    </DataProvider>
  </>;
}

export default MyApp;
