import { AuthProvider } from "./contexts/authContext";
import FlowBiteTheme from "./contexts/FlowBiteTheme";
import { ThemeProvider } from "./contexts/themeContext";
import {
  socket,
  thisSessionId,
  SocketContext,
} from "./contexts/WebSocketContext";
import DisplayTopSideBar from "./features/displayControl/DisplayTopSideBar";
import ToastContainer from "./features/toast";

import AllRoutes from "./routing/AllRoutes";
import routes from "./routing/routes";

const webSocket = {
  socket: socket,
  thisSessionId: thisSessionId,
};

function App() {
  return (
    <SocketContext.Provider value={webSocket}>
      <ThemeProvider>
        <FlowBiteTheme>
          <AuthProvider>
            <DisplayTopSideBar>
              <AllRoutes routes={routes} />
            </DisplayTopSideBar>
            <ToastContainer />
          </AuthProvider>
        </FlowBiteTheme>
      </ThemeProvider>
    </SocketContext.Provider>
  );
}

export default App;
