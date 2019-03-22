import React from 'react';

import classes from './DrawerToggleButton.module.css';

const drawerToggleButton = props => (
    <button className={classes.toggle_button} onClick={props.click}>
        <div className={classes.toggle_button_line}/>
        <div className={classes.toggle_button_line}/>
        <div className={classes.toggle_button_line}/>
    </button>
);

export default drawerToggleButton;