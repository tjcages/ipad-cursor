import React from 'react';
import 'styles.css';
const myComponent = (props) => {
return(
  <div className="styled-component">
    {props.children}
  </div>);
};
export default myComponent;