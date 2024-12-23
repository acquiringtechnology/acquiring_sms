import * as Layout from '../layout';
import * as Pages from '../pages';
import routers from './routes';
import { BrowserRouter, Route, Routes } from "react-router";



export const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
      {routers.map(({ component, path, exact = false, childrens = [] }) => {
          if (childrens.length > 0) {
            const LayoutComponent = Layout[component];
            return (
              <Route
                path={path}
                exact={exact}
                key={path}
                element={<LayoutComponent />}
              >
                {childrens.map(
                  ({ component: ChildrenComponent, path: childrenPath }) => {
                    const PageComponent = Pages[ChildrenComponent];
                    return (
                      <Route
                        path={path + childrenPath}
                        key={path + childrenPath}
                        element={<PageComponent />}
                      />
                    );
                  }
                )}
              </Route>
            );
          }
          const PageComponent = Pages[component];
          return (
            <Route
              path={path}
              exact={exact}
              key={path}
              element={<PageComponent />}
            />
          );
        })}
            </Routes>
    </BrowserRouter>
  );
};
