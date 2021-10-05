import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import NavBar from './Components/NavBar'
import Grid from './Components/Grid'
import Footer from './Components/Footer'
import './App.css';
import {Typography,Paper, IconButton} from '@material-ui/core'; 
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import Amplify, { API,graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';


import SecurityIcon from '@material-ui/icons/Security';
import EventNoteIcon from '@material-ui/icons/EventNote';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import ComputerIcon from '@material-ui/icons/Computer';
import HttpIcon from '@material-ui/icons/Http';
import { listProducts } from './graphql/queries';



Amplify.configure(awsconfig);

const initialFormState = { name: '', url: '' }

const theme = createTheme({
  palette: {
    primary: {
      main:"#2e1667",
    },
    secondary: {
      main:"#c7d8ed",
    },
  },
  typography: {
    fontFamily: [
      'Roboto'
    ],
    h4: {
      fontWeight: 600,
      fontSize: 28,
      lineHeight: '2rem',
      },
    h5: {
      fontWeight: 100,
      lineHeight: '2rem',
    },
  },
});


const styles = makeStyles({
  wrapper: {
    width: "65%",
    margin: "auto",
    textAlign: "center"
  },
  bigSpace: {
    marginTop: "5rem"
  },
  littleSpace:{
    marginTop: "2.5rem",
  },
  grid:{
    display: "flex", 
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap", 
  },
})

function App() {


  const [products, setProducts] = useState([])


  useEffect(() => {

    fetchInfo();
  }, []);


  const fetchInfo = async () => {

    try{
      const productData = await API.graphql(graphqlOperation(listProducts));
      const productList = productData.data.listProducts.items;
      console.log('produce list is: ', productList);
      setProducts(productList)


    }
    catch(error){

      console.log('error on fetching products from API',error);

      


    }
  }
  const classes = styles();

  return (
    <div className="App">
      
      <ThemeProvider theme={theme}>
        <NavBar/>
        <div className={classes.wrapper}>
          <Typography variant="h4" className={classes.bigSpace} color="primary">
             At BBP we keep up-to-date with all of the best crypto technology!
          </Typography>
          <Typography variant="h5" className={classes.littleSpace} color="primary">
          </Typography>
        </div>

        <div className="productList">
          {
            products.map((product , idx) => {

              return (
                <Paper variant="outlined" elevation={2} key={`product${idx}`} >
                
                  <div className="productCard"> 
                  <IconButton color="primary" aria-label="add to shopping cart">
                    <AddShoppingCartIcon />
                    </IconButton>
                    <div>
                      <div className="productTitle"> {product.name}<div>
                      <div className="productDesc">{product.description}</div>
                    </div>
                    </div>
                    </div>


                  
                  </div>
            
                  </Paper>
              )


            })
          }

          </div>


       
      
        
        {/* <div className={`${classes.grid} ${classes.bigSpace}`}>
          <Grid icon={<SecurityIcon style={{fill: "#4360A6", height:"125", width:"125"}}/>}  title="Secure" btnTitle="Show me More" />
          <Grid icon={<EventNoteIcon style={{fill: "#449A76", height:"125", width:"125"}}/>} title="Reliable" btnTitle="Show me More"/>
          <Grid icon={<TrendingUpIcon style={{fill: "#D05B2D", height:"125", width:"125"}}/>}  title="Performant" btnTitle="Show me More"/>
        </div>
        
      
        <div className={`${classes.grid} ${classes.littleSpace}`}>  
          <Grid icon={<ImportExportIcon style={{fill: "#5EA780", height:"125", width:"125"}}/>}  title="Modular" btnTitle="Show me More"/>
          <Grid icon={<ComputerIcon style={{fill: "#E69426", height:"125", width:"125"}}/>}  title="Multi-Platform" btnTitle="Show me More"/>
          <Grid icon={<HttpIcon style={{fill: "#2EA09D", height:"125", width:"125"}}/>} title="Connected" btnTitle="Show me More"/>
        </div> */}
        <div className={classes.bigSpace}>
          <Footer/>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default withAuthenticator(App);
