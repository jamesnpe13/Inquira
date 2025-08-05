import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div className='App'>
      {!isAuthenticated && (
        <button
          onClick={() => {
            loginWithRedirect();
          }}
        >
          Auth0 Login
        </button>
      )}
      {isAuthenticated && (
        <>
          <button
            onClick={() => {
              logout();
            }}
          >
            Logout
          </button>
          <p>{JSON.stringify(user)}</p>
        </>
      )}
    </div>
  );
}

export default App;
