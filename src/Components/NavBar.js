import React from 'react'
import CustomButton from './CustomButton'
import BTC from '../BTC.svg'
import logo from '../logo.svg'
import {Toolbar, Typography} from '@material-ui/core'
import {makeStyles} from "@material-ui/core/styles"; 
import { AmplifySignOut } from '@aws-amplify/ui-react'

const styles = makeStyles({
    bar:{
        paddingTop: "1.15rem",
        backgroundColor: "#fff",
        ['@media (max-width:780px)']: { 
           flexDirection: "column"
          }
    },
   

    BTC: {
        width: "15%", 
        ['@media (max-width:780px)']: { 
           display: "none"
           }
    },
    menuItem: {
        cursor: "pointer", 
        flexGrow: 1,
        "&:hover": {
            color:  "#4f25c8"
        },
        ['@media (max-width:780px)']: { 
            paddingBottom: "1rem"    }
    }
})

function NavBar() {
    const classes = styles()
    return (
            <Toolbar position="sticky" color="rgba(0, 0, 0, 0.87)" className={classes.bar}>   
                <img src={BTC} className={classes.BTC}/> 
                {/* <img src={logoMobile} className={classes.logoMobile}/>  */}
                <Typography variant="h6" className={classes.menuItem}>
                   About
                </Typography>
                {/* <Typography variant="h6" className={classes.menuItem}>
                    Blog
                </Typography>
                <Typography variant="h6" className={classes.menuItem}>
                    Careers
                </Typography> */}
                <Typography variant="h6" className={classes.menuItem}>
                    Shop 
                </Typography>
                <Typography variant="h6" className={classes.menuItem}>
                    Crypto News 
                </Typography>
                <Typography variant="h6" className={classes.menuItem}>
                     <AmplifySignOut/>
                </Typography>
            </Toolbar>
    )
}

export default NavBar