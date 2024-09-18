import UserList from "./components/UserList/UserList";
import styles from "./page.module.css"

export default function Home() {

  return (
    <div className={styles.page}>
      <UserList />
    </div>
  );
}
