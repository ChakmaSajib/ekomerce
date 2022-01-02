import React from 'react';
import Head from 'next/head';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import useStyles from '../utils/styles';

export default function Layout({ children }) {
    const classes = useStyles()

    return (
        <div>
            <Head>
                <title>Ekomerce</title>
            </Head>

            {/** App bar */}
            <AppBar position="static" className={classes.navbar}>
                <Toolbar>
                    <Typography>
                        ekomerce
                    </Typography>
                </Toolbar>
            </AppBar>

            {/** Main Container */}
            <Container className={classes.main}>
                {children}
            </Container>

            {/** Footer */}

            <footer className={classes.footer}>
                <Typography> All rights reserved. Next Ekomerce </Typography>
            </footer>
        </div>
    )
}
