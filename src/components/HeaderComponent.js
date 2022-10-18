import React, { useState } from 'react';
import { Nav, Navbar, NavbarBrand, Collapse, NavItem, NavbarToggler } from 'reactstrap';
import { NavLink } from 'react-router-dom';

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return (
        <div>
            <Navbar dark expand='md' color='primary'>
                <div className='container'>
                    <NavbarToggler onClick={toggle} />
                    <NavbarBrand>
                        <img src='/assets/images/logo.png' width='40' alt='Quan ly nhan vien' />
                    </NavbarBrand>
                    <Collapse navbar isOpen={isOpen} >
                        <Nav navbar>
                            <NavItem>
                                <NavLink className='nav-link' to='/nhanvien'>
                                    <span className='fa fa-users fa-lg'></span> Nhân viên
                                </NavLink>
                            </NavItem>
                            <NavLink className='nav-link' to='/phongban'>
                                <NavItem>
                                    <span className='fa fa-id-card-o fa-lg'></span> Phòng ban
                                </NavItem>
                            </NavLink>
                            <NavLink className='nav-link' to='/luong'>
                                <NavItem>
                                    <span className='fa fa-money fa-lg'></span> Bảng lương
                                </NavItem>
                            </NavLink>
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>
        </div>
    );
}

export default Header;