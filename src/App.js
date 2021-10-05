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
import DescriptionIcon from '@material-ui/icons/Description';
import CustomButton from './Components/CustomButton'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

import SecurityIcon from '@material-ui/icons/Security';
import EventNoteIcon from '@material-ui/icons/EventNote';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import ComputerIcon from '@material-ui/icons/Computer';
import HttpIcon from '@material-ui/icons/Http';
import { getProducts, listProducts } from './graphql/queries';



Amplify.configure(awsconfig);

// const initialFormState = { name: '', url: '' }

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
      console.log('product list is: ', productList);
      setProducts(productList)


    }
    catch(error){

      console.log('error on fetching products from API',error);

      


    }
  }
  const classes = styles();

  

  function display(idx){

    const product = products[idx];
    alert(product.description);
    
    
    
  
  
  }

  
  
  

  return (
    <div className="App">
      
      <ThemeProvider theme={theme}>
        <NavBar/>
        <div className={classes.wrapper}>
          <Typography variant="h4" className={classes.bigSpace} color="primary">
             At BCP we keep up-to-date with all of the best crypto technology!
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

                  <Grid icon={<MonetizationOnIcon style={{fill: "#4360A6", height:"125", width:"125"}}/>}  title="{product[idx].name}" btnTitle="View Product Description" />
                                
                                <div>
                                    <IconButton aria-label="add to cart">
                                        < ShoppingCartIcon/>
                                    </IconButton>
                                    
                                </div>
                                <div>
                                    <div className="productTitle">
                                    <p className="productName"> {product.name} </p>
                                      </div>
                                    <div className="productDesc">
                                      
                                    <p className="productD"> {product.description} </p></div>
                                </div>
                                
                                {/* <div className="productDescription">{product.description}</div> */}
                                <div>
                                    <IconButton aria-label="view Description">
                                      
                                      
                                        < DescriptionIcon/>
                                    </IconButton>
                                    
                                </div>
                            </div>
            
                  </Paper>
              )


            })
          }

          </div>

        <div className={classes.bigSpace}>
          <Footer/>
        </div>
      </ThemeProvider>
    </div>
  );
}



export default withAuthenticator(App);
