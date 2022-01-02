import React from 'react';
import Head from 'next/head';
import { AppBar } from '@mui/material';

export default function Layout() {
    return (
        <div>
            <Head>
                <title>Ekomerce</title>
            </Head>

            <AppBar></AppBar>
        </div>
    )
}
