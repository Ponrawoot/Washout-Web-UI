"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import Button from '@mui/material/Button';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()

  const handleLogin = () => {
    if (username === 'Admin' && password === '1234') {
      router.push('/branch');
    } else if (username === 'Staff01' && password === '1234') {
      router.push('/locker');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <main className={styles.main}>
      <div className='w-full h-[220px]'>
      </div>
      <div className={styles.container}>
        <div className={styles.header}>
          <p>Login</p>
        </div>

        <div className={styles.inputs}>
          <div className={styles.input}>
            <PersonIcon className={styles.icon} />
            <input
              type='text'
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.inputs}>
          <div className={styles.input}>
            <LockIcon className={styles.icon} />
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.submit_container}>
          <Button className={styles.submit} variant="contained" onClick={handleLogin}>
            Log In
          </Button>
        </div>
      </div>
      <div className='w-full h-[221px]'>
      </div>
    </main>
  );
}