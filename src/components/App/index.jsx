import { Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import styled from "styled-components";

import AppHeader from "../AppHeader";
import ProtectedRoute from "../ProtectedRoute";

import MainPage from "../../pages/MainPage";
import LifePage from "../../pages/LifePage";
import FocusPage from "../../pages/FocusPage";

import Loading from "../Loading";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        suspense: true,
      },
    },
  });

  return (
    <>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<Loading />}>
            <ErrorBoundary
              fallbackRender={({
                error,
                resetErrorBoundary,
                componentStack,
              }) => (
                <>
                  <h1>Something went wrong...</h1>
                  <pre>{error.message}</pre>
                  <button onClick={resetErrorBoundary}>
                    Please try again.
                  </button>
                </>
              )}
            >
              <AppHeader />
              <Main>
                <Routes>
                  <Route path="/" element={<MainPage />}></Route>
                  <Route element={<ProtectedRoute />}>
                    <Route path="/life" element={<LifePage />}></Route>
                    <Route path="/focus" element={<FocusPage />}></Route>
                  </Route>
                </Routes>
              </Main>
            </ErrorBoundary>
          </Suspense>
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}

const Main = styled.main`
  margin-top: 30px;
`;

export default App;
