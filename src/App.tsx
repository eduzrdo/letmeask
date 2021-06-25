import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { AuthContextProvider } from "./contexts/AuthContext";
import { PageTitleContextProvider } from "./contexts/PageTitleContext";

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <PageTitleContextProvider>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/rooms/new' component={NewRoom} />
            <Route path='/rooms/:id' component={Room} />
            <Route path='/admin/rooms/:id' component={AdminRoom} />
          </Switch>
        </PageTitleContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
