import React from 'react';
import {Route , Routes} from 'react-router-dom'
import { pageRoutes } from '../router/router';

const AppRouter = () => {
    return (
        <Routes>
        {pageRoutes.map((routes)=>
            <Route
                key={routes.path}
                element={<routes.element/>}
                path={routes.path}
                exact={routes.exact}>
            </Route>
        )}
    </Routes>
    );
};

export default AppRouter;