import { Routes, Route } from "react-router-dom";
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
import ErrorModal from "../ErrorModal";

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
              fallbackRender={({ error, resetErrorBoundary, componentStack }) =>
                process.env.NODE_ENV === "development" ? (
                  <ErrorModal>{error.message}</ErrorModal>
                ) : (
                  <ErrorModal>
                    <Brand>
                      <BrandMessage>Something went wrong...</BrandMessage>
                      <ErrorButton onClick={resetErrorBoundary}>
                        Please try again.
                      </ErrorButton>
                    </Brand>
                  </ErrorModal>
                )
              }
            >
              <GlobalStyle />
              <GlobalModal />
              <AppHeader />
              <Main>
                <Routes>
                  <Route path="/" element={<MainPage />}></Route>
                  <Route element={<ProtectedRoute />}>
                    <Route path="/year" element={<LifePage />}></Route>
                    <Route path="/day" element={<YearPage />}></Route>
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

const Brand = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const BrandMessage = styled.div`
  padding-top: 30px;
  padding-bottom: 30px;
  font-size: 1.2em;
  font-family: Helvetica, sans-serif;
  font-weight: bold;
  opacity: 0.7;
`;

const Button = styled.button`
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  border-radius: 10px;
  height: 40px;
  width: 80%;
  cursor: pointer;
`;

const ErrorButton = styled(Button)`
  border: 1px solid #ffcdeb;
  background: #ffcdeb;
  opacity: 0.8;
  font-size: 1em;
  color: white;
`;
