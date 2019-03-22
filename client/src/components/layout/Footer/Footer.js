import React from 'react';

import classes from './Footer.module.css';

export default () => {
  return (
    <footer className={classes.footer}>
        Copyright &copy; {new Date().getFullYear()} Cardboard Express 
    </footer>
  );
};
