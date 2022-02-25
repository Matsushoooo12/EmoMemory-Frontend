import { createContext, useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import { User } from "./types/user";
import { getCurrentUser } from "./api/auth";
import { SignIn } from "./components/pages/auth/SignIn";
import { SignUp } from "./components/pages/auth/SignUp";
import { Home } from "./components/pages/post/Home";
import theme from "./theme/theme";
import { HeaderLayout } from "./components/templates/HeaderLayout";
import { Index } from "./components/pages/post/Index";
import { MyUser } from "./components/pages/user/MyUser";

export const AuthContext = createContext({});

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User>();

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();

      if (res?.data.isLogin === true) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.data);
        console.log(res.data.data);
      } else {
        console.log("no current user");
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, [setCurrentUser]);

  const Private = ({ children }: any) => {
    if (!loading) {
      if (isSignedIn) {
        return children;
      } else {
        return <Redirect to="/signin" />;
      }
    } else {
      return <></>;
    }
  };
  return (
    <ChakraProvider theme={theme}>
      <AuthContext.Provider
        value={{
          loading,
          setLoading,
          isSignedIn,
          setIsSignedIn,
          currentUser,
          setCurrentUser,
          handleGetCurrentUser,
        }}
      >
        <BrowserRouter>
          <Switch>
            <HeaderLayout>
              <Route exact path="/signup">
                <SignUp />
              </Route>
              <Route exact path="/signin">
                <SignIn />
              </Route>
              <Private>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/index">
                  <Index />
                </Route>
                <Route path="/profile/:id">
                  <MyUser showLabel="MyProfile" />
                </Route>
                <Route path="/mypost/:id">
                  <MyUser showLabel="MyPost" />
                </Route>
              </Private>
            </HeaderLayout>
          </Switch>
        </BrowserRouter>
      </AuthContext.Provider>
    </ChakraProvider>
  );
}

export default App;
