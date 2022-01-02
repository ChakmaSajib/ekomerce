import React from 'react';
import Head from 'next/head';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

export default function Layout({ children }) {
    return (
        <div>
            <Head>
                <title>Ekomerce</title>
            </Head>

            {/** App bar */}
            <AppBar position="static">
                <Toolbar>
                    <Typography>
                        ekomerce
                    </Typography>
                </Toolbar>
            </AppBar>

            {/** Main Container */}
            <Container>
                {children}
            </Container>

            {/** Footer */}

            <footer>
                <Typography> All rights reserved. Next Ekomerce </Typography>
            </footer>
        </div>
    )
}
