import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { AuthContextProvider } from "./contexts/AuthContext";
import { PageTitleContextProvider } from "./contexts/PageTitleContext";
import { DarkThemeContextProvider } from "./contexts/DarkThemeContext";

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';
import { MyRooms } from './pages/MyRooms';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <PageTitleContextProvider>
          <DarkThemeContextProvider>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/rooms/new' component={NewRoom} />
              <Route path='/rooms/:id' component={Room} />
              <Route path='/admin/rooms/:id' component={AdminRoom} />
              <Route path='/admin/rooms/' component={MyRooms} />
            </Switch>
          </DarkThemeContextProvider>
        </PageTitleContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
