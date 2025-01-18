import Image from "next/image";
import styles from "./page.module.css";
import ChatComponent from "./Components/ChatComponent";

export default function Home() {
  return (
    <div className={styles.center}>
      <ChatComponent />
    </div>
  );
}
