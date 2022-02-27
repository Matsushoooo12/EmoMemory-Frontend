import { memo, useContext, VFC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AuthContext } from '../App';
import { SignIn } from '../components/pages/auth/SignIn';
import { SignUp } from '../components/pages/auth/SignUp';
import { Home } from '../components/pages/post/Home';
import { Index } from '../components/pages/post/Index';
import { MyUser } from '../components/pages/user/MyUser';
import { HeaderLayout } from '../components/templates/HeaderLayout';

export const Router: VFC = memo(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { loading, isSignedIn } = useContext<any>(AuthContext);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  );
});
