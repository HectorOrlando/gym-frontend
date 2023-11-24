// src\pages\index.tsx

import { Inter } from 'next/font/google'
import { Layout } from '@/components/layouts'
import  HomePage  from './home/index';

const inter = Inter({ subsets: ['latin'] })

export default function IndexPage() {
  return (
    <Layout title='Home - Gym'>
      <HomePage/>
    </Layout>
  )
}
