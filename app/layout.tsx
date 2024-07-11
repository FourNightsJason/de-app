import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import './globals.scss';
import indexDB from '@/utils/indexeddb';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '好用DE网站',
  description: '各种需求的网站',
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
