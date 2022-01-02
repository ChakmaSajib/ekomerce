import React from 'react';
import Head from 'next/head';
import { AppBar, Toolbar, Typography } from '@mui/material';

export default function Layout() {
    return (
        <div>
            <Head>
                <title>Ekomerce</title>
            </Head>

            <AppBar position="static">
                <Toolbar>
                    <Typography>

                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}