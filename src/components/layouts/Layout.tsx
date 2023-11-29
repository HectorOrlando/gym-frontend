// src\components\layouts\Layout.tsx

import { FC, ReactNode } from 'react'
import Head from 'next/head'

import { Box } from '@mui/material'
import Navbar from '../ui/Navbar';


interface Props {
    title?: string;
    children: ReactNode;
}

export const Layout: FC<Props> = ({ title = 'Gym', children }) => {
    return (
        <Box>
            <Head>
                <title>{title || 'Skeleton-Next'}</title>
                <meta name='author' content='Hector Orlando' />
                <meta name='description' content={`Informanción sobre la página ${title}`} />
                <meta name='keywords' content={`${title}, Next.js, TypeScript, Node.js`} />
            </Head>
            <Navbar />
            <main style={{
                padding: '30px 20px 200px 20px'
            }}>
                {children}
            </main>
        </Box>
    )
}
