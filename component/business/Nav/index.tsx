'use client';
import { useRouter } from 'next/navigation';
import styles from './index.module.scss';
import { LoginOutlined } from '@ant-design/icons';

function Nav() {
  const router = useRouter();
  const goLogin = () => {
    router.push('/login');
  };
  return (
    <div className={styles.nav}>
      <span title='登录' onClick={goLogin}>
        <LoginOutlined />
      </span>
    </div>
  );
}

export default Nav;
