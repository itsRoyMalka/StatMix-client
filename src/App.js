import {BrowserRouter, Route, Routes} from "react-router-dom";
import {DashboardLayout} from "./pages/dashboard/layout/DashboardLayout";
import {Home} from "./pages/dashboard/home/Home";
import {Statistics} from "./pages/dashboard/statistics/Statistics";
import {Auth} from "./pages/auth/Auth";

import {Profile} from "./pages/dashboard/profile/Profile";
import {Signout} from "./pages/dashboard/signout/Signout";
import {EventsPage} from "./pages/dashboard/events/EventsPage";
import {NotFound} from "./pages/notFound/NotFound";
import {Event} from "./pages/public/Event";
import {GenresPage} from "./pages/dashboard/genres/GenresPage";
import axios from "axios";
import {Live} from "./pages/dashboard/live/Live";
import {LiveRedirect} from "./pages/dashboard/live/LiveRedirect";
import {Search} from "./pages/dashboard/search/Search";
import {HomePage} from "./pages/public/HomePage";
import {UserContextProvider} from "./context/UserContext";




function App() {

    axios.defaults.baseURL = (process.env.NODE_ENV === 'production' ? ('https://statmix-api.onrender.com') : ('http://localhost:3001'))


    axios.defaults.withCredentials = true;

  return (
    <div className="App">

        <UserContextProvider>

         <BrowserRouter>

                <Routes>

                    {/* AUTH ROUTES */}
                    <Route path='/login' element={<Auth type={true} />} />
                    <Route path='/signup' element={<Auth type={false} />} />


                    {/* DASHBOARD ROUTES */}
                    <Route path='/dashboard' element={<DashboardLayout />}>
                        <Route path='/dashboard' element={<Home />} />
                        <Route path='/dashboard/events' element={<EventsPage />} />
                        <Route path='/dashboard/statistics' element={<Statistics />} />
                        <Route path='/dashboard/genres' element={<GenresPage />} />
                        <Route path='/dashboard/profile' element={<Profile />} />
                        <Route path='/dashboard/live' element={<LiveRedirect />} />
                        <Route path='/dashboard/live/:eventId' element={<Live />} />
                        <Route path='/dashboard/signout' element={<Signout />} />
                        <Route path='/dashboard/search' element={<Search />} />
                    </Route>
                    {/* PUBLIC ROUTES */}
                    <Route path='*' element={<NotFound />} />
                    <Route path='/' element={<HomePage />} />
                    <Route path='/event/:eventId' element={<Event />} />
                </Routes>

        </BrowserRouter>
        </UserContextProvider>
        

    </div>
  );
}

export default App;
