import { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import { APP_NAME } from "../config"
import Link from 'next/link'
import {signout, isAuth} from '../actions/auth'
import Router from 'next/router';
import Nprogress from 'nprogress'
import Search from './blog/Search';

Router.onRouteChangeStart = url => Nprogress.start()
Router.onRouteChangeComplete = url => Nprogress.done()
Router.onRouteChangeError = url => Nprogress.done()


const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
          <Link href="/">
             <NavbarBrand className="font-weught-bold">{APP_NAME}</NavbarBrand>
          </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
          <NavItem>
              <Link href="/blogs">
                <NavLink>Blogs</NavLink>
              </Link>
            </NavItem>
            {!isAuth() && <> 
            <NavItem>
              <Link href="/signin/"><NavLink>SIGNIN</NavLink></Link>
            </NavItem>
            <NavItem>
              <Link href="/signup/"><NavLink>SIGNUP</NavLink></Link>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
            </NavItem> </>}
            {isAuth() && <NavItem>
              <NavLink onClick ={() => signout(() => Router.replace('/signin'))}>SIGNOUT</NavLink>
            </NavItem>}
            {isAuth() && isAuth().role === 0 && <NavItem>
              <Link href="/user"><NavLink>`${isAuth().name}'s Dashboard'`</NavLink></Link>
            </NavItem>}
            {isAuth() && isAuth().role === 1 && <NavItem>
              <Link href="/admin"><NavLink>`${isAuth().name}'s Dashboard'`</NavLink></Link>
            </NavItem>}
          </Nav>
        </Collapse>
      </Navbar>
      <Search />
    </div>
  );
}

export default Header;