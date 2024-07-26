import Image from "next/image";
import styles from "./page.module.css";
import Blackjack from "./components/blackjack";

export default function Home() {
  return (
    <main className={styles.main}>
      <Blackjack/>
      
    </main>
  );
}
