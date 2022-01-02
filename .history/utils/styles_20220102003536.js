import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    navbar: {
        backgroundColor: '#203040',
        '& a': {
            color: "#fff",
            marginLeft: 10,
        }

    },
    brand: {
        fontWeight: "bold",
        fontSize: "1.5rem"
    },
    main: {
        minHeight: '80vh',
    },

    footer: {
        textAlign: 'center'
    },

})

export default useStyles;