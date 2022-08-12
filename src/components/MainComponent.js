import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from "./DishdetailComponent";
import { DISHES } from '../shared/dishes';
import { Navbar, NavbarBrand } from 'reactstrap';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            selectedDish: null
        }
    }

    onDishSelect(dishId) {
        this.setState({ selectedDish: dishId })
    }

    render() {
        return (
            <div>
                <Navbar dark color='primary'>
                    <NavbarBrand>
                        Ristorante Con Fusion
                    </NavbarBrand>
                </Navbar>
                <Menu dishes={this.state.dishes}
                    onClick={(dishId) => this.onDishSelect(dishId)} />
                <DishDetail
                    dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
            </div>
        );
    }
}

export default Main;