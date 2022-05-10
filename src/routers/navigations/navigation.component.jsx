import React from 'react';
import { Fragment } from "react";
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { ReactComponent as CrwnLogo} from '../../assets/crown.svg' 
import { selectCurrentUser } from '../../store/user/user.selector';
import { signOutStart } from '../../store/user/user.action';
import { useDispatch } from 'react-redux';

 
import { signOutUser } from '../../utils/firebase/firebase/firebase.utils.js'


import { NavLink, NavigationContainer,NavLinks, LogoContainer } from './navigatin.styles.jsx'
import { selectCartIsOpen } from '../../store/cart/cart.selector';

const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectCartIsOpen);

  const signOutUser = () => dispatch(signOutStart()); 

    return (
        <Fragment>
            <NavigationContainer>
               <LogoContainer to='/'>
                 <CrwnLogo/> 
               </LogoContainer> 
               <NavLinks>
                 <NavLink to='/shop'>
                     SHOP
                 </NavLink>   
                 {currentUser ? (
                   <NavLink as='span' onClick={signOutUser}>SING OUT</NavLink>
                 ) : (
                 <NavLink to='/auth'>
                     SIGN IN
                 </NavLink>                
                 )}    
                 <CartIcon/>     
               </NavLinks>
               {isCartOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet/>
        </Fragment>
    );
}

export default Navigation;