import React from 'react';
import Aux from '../../containers/Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends React.Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        //console.log('closedd handler');
        
        this.setState({showSideDrawer: false})
    }

    sideDrawerToggleHandler = () => {
        //console.log('clicked');
        
        this.setState((prevState) => {
            //console.log(prevState);
            
            return {
                showSideDrawer: !prevState.showSideDrawer
            };
        })
    }
    render(){
        return(
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer 
                open={this.state.showSideDrawer} 
                closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;