
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Dashboard } from './pages/Dashboard';
import ProductList from './pages/ProductList';
import EditProduct from './pages/updateProduct';
import NewProducts from './pages/addProduct';
function App() {
  return (
    <div className="App">
      <Router>
      <ProtectedRoute  component={Dashboard} path="/admin"/>
        <Switch>
          <Route component={Login} exact={true} path="/login" />
          <Route component={Register} path="/register" />
          <ProtectedRoute  exact component={ProductList}  path="/admin/" />
          <ProtectedRoute component={EditProduct} path="/admin/update-product" />
          <ProtectedRoute component={NewProducts} path="/admin/add-product" />
        </Switch>
    </Router>
    </div>
  );
}

export default App;
