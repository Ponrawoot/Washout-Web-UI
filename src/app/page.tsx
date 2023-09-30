import styles from './page.module.css';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import Button from '@mui/material/Button';

export default function Home() {
  return (
    <main className={styles.main}>

      <div className={styles.container}>
        <div className={styles.header}>
            <p>Login</p>
        </div>
        
        <div className={styles.inputs}>
            <div className={styles.input}>
              < PersonIcon className={styles.icon} />
              <input type='text' placeholder='Username'/>
            </div>
        </div>

        <div className={styles.inputs}>
            <div className={styles.input}>
              < LockIcon className={styles.icon} />
                <input type='password' placeholder='Password'/>
            </div>
        </div>
        
        <div className={styles.submit_container}>
            <Button className={styles.submit} variant="contained">Log In</Button>
        </div>
        
        </div>

    </main>
  )
}