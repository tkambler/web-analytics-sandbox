/**
 * Wraps a context around the app that provides essential global state (e.g. Does the current user have an active
 * session? Who are they?) To access this state, call the `useLoginState()` hook that is exported
 * from: @app/components/Setup/Setup
 */
import * as React from 'react';
import useReducerX from '@0y0/use-reducer-x';
import thunkMiddleware from 'redux-thunk';
import CircularProgress from '@mui/material/CircularProgress';
import { useLocation, useHistory } from '@app/lib/hooks';
import { createSession, destroySession, getSession } from '@app/lib/apis/session';
import { track } from '@app/lib/analytics';

const LoginStateContext = React.createContext(null);

export function useAppState() {
  return React.useContext(LoginStateContext);
}

export const actions = {
  login: (email, password, toast) => {
    return async (dispatch, getState) => {
      track('login_attempt', {
        email,
      });
      const session = await createSession(email, password);
      track('login', {
        email,
      });
      dispatch({
        type: 'setUser',
        payload: {
          value: session,
        },
      });
      toast.enqueue(`Welcome back, ${session.first_name}.`, {
        variant: 'success',
      });
    };
  },
  logout: (toast) => {
    return async (dispatch, getState) => {
      const { user } = getState();
      track('logout', {
        email: user.email,
      });
      await destroySession();
      dispatch({
        type: 'signout',
      });
      toast.enqueue('You have signed out.', {
        variant: 'success',
      });
    };
  },
  getSession: () => {
    return async (dispatch, getState) => {
      try {
        const session = await getSession();
        dispatch({
          type: 'initComplete',
          payload: {
            user: session,
          },
        });
      } catch (err) {
        dispatch({
          type: 'initComplete',
          payload: {
            user: null,
          },
        });
      }
    };
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'setUser':
      return {
        ...state,
        user: action.payload.value,
      };
    case 'initComplete':
      return {
        ...state,
        user: action.payload.user || null,
        initialized: true,
      };
    case 'signout':
      return {
        user: null,
        initialized: true,
      };
    default:
      throw new Error();
  }
}

export function withState(Component) {
  return (props) => {
    const location = useLocation();
    const history = useHistory();
    const [state, dispatch] = useReducerX(
      reducer,
      {
        user: null,
        initialized: false,
      },
      [thunkMiddleware]
    );

    React.useEffect(() => {
      if (!state.initialized) {
        dispatch(actions.getSession());
      }
    }, [state.initialized]);

    React.useEffect(() => {
      console.log('State changed:', state);
    }, [state]);

    if (!state.initialized) {
      return <CircularProgress />;
    }

    return (
      <LoginStateContext.Provider
        value={{
          ...state,
          dispatch,
        }}
      >
        <Component {...props} />
      </LoginStateContext.Provider>
    );
  };
}
