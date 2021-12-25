import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Menu from './components/MenuComponent';
import { Navbar, NavbarBrand } from 'reactstrap';
import { DISHES } from './shared/dishes';
import { Component } from 'react/cjs/react.production.min';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES
    };
  }
  render() {
  return (
    <div>
        <Navbar dark color='primary'>
          <div className='container'>
            <NavbarBrand href="#">Restaurant Menu</NavbarBrand>
          </div>
        </Navbar>
        <Menu dishes={this.state.dishes}/>
    </div>
  );
}
}
export default App;
