import TopBarItem from "./TopBarItem";
import styles from "./topbar.module.css"

export default function TopBar() {
  return (
    <div className={styles.topbarcontainer}>
        <TopBarItem title="Branch" pageRef="/branch"/>
        <TopBarItem title="Staff" pageRef="/staff" />
        <TopBarItem title="Machine" pageRef="/machine"/>
    </div>
  );
}
