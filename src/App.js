import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';


const styles = (theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    grid_root: {
        flexGrow: 1,
      },
     
});

const getCourseOptions = () => {

    return ({
        method: 'GET',
        headers: { 
            Accept: 'application/json',
            'Content-Type': 'application/json' ,
        }
        //body: JSON.stringify({ userId })
        })
};


const handleResponse = (response ) => {

    return response.text()
    .then( (text) => {

        console.log("handleResponse (text) : ---> ", text)

        const data = text && JSON.parse(text);

        console.log("handleResponse response text --> ",data)

        if (!response.ok) {
            if (response.status !== 200) {
                console.log("handleResponse", response)
            }
            const error = (data && (data.error || data.statusText) );
            console.log("error from handleResponse", error)
            return Promise.reject(error)
        }
        return data;
    })

};


class App extends Component {



    constructor(props) {
        super();

        this.state = {
            data: []
        }
    }


    handleFetchData = () => {

        console.log(getCourseOptions())

        fetch("/course", getCourseOptions())
        .then(handleResponse)
        .then( (data) => {
            console.log("getPosts (course) ", data.courses)
              
            //return data:  data.posts  
            this.setState({
                data: data.courses
            })


        })
        
        .catch( (err) => {
            console.log("get error", err)            
            //dispatch( { type: 'GETPOST_ERROR', err });
        })


    }


    render () {

        const {classes} = this.props;

        return (
            <div className={classes.root}>


            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={1}>
                        <Grid item>
                            <Paper className={classes.paper} >
                                my App
                            </Paper>
                        </Grid>
                    
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={1}>
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={this.handleFetchData}>
                                getData
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Grid container justify="center" spacing={1}>
                        
                            {this.state.data ? this.state.data.map(res => (
                                
                                
                                <Grid item key={res._id}>
        
                                {res._id}
                            
                                </Grid>
                            
                                                        )                            
                            )
                             : ""}

                    </Grid>
                </Grid>



            </Grid>

 

            </div>
            );
}}
    

export default withStyles(styles)(App);
