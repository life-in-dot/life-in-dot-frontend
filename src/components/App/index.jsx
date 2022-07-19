import { Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import styled from "styled-components";
import GlobalStyle from "../../styles/GlobalStyle";

import GlobalModal from "../GlobalModal";
import AppHeader from "../AppHeader";
import ProtectedRoute from "../ProtectedRoute";

import MainPage from "../../pages/MainPage";
import LifePage from "../../pages/LifePage";
import YearPage from "../../pages/YearPage";

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
              <GlobalStyle />
              <GlobalModal />
              <AppHeader />
              <Main>
                <Routes>
                  <Route path="/" element={<MainPage />}></Route>
                  <Route element={<ProtectedRoute />}>
                    <Route path="/life" element={<LifePage />}></Route>
                    <Route path="/year" element={<YearPage />}></Route>
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

const Main = styled.main``;

export default App;
