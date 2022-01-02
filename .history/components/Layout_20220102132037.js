import React from 'react';
import Head from 'next/head';
import { AppBar, Toolbar, Typography, Container, Link, createTheme } from '@mui/material';
import NextLink from "next/link"
import useStyles from '../utils/styles';

export default function Layout({ title, description, children }) {
    const theme = createTheme({
        typography: {
            h1: {
                fontSize: '1.6rem',
                fontWeight: 400,
                margin: '';
            }
        }
    })
    const classes = useStyles()

    return (
        <div>
            <Head>
                <title>{title ? `${title} - Ekomerce` : 'Ekomerce'}</title>
            </Head>

            {/** App bar */}
            <AppBar position="static" className={classes.navbar}>
                <Toolbar>
                    <NextLink href="/" passHref>
                        <Link>
                            <Typography className={classes.brand}>
                                Ekomers
                            </Typography>
                        </Link>
                    </NextLink>
                    <div className={classes.grow}></div>
                    <div>
                        <NextLink href="/cart" passHref>
                            <Link>Cart</Link>
                        </NextLink>

                        <NextLink href="/login" passHref>
                            <Link>Login</Link>
                        </NextLink>
                    </div>
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
