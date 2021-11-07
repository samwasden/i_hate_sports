import Header from '../global_components/Header'
import MobileFooter from '../global_components/MobileFooter'
import './homepage_stylsheets/Home.css'
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { appAuth } from "../firebase/firebase";
import Loading from '../global_components/Loading';
import { fetchUserData } from '../firebase/team_management';
import Homepage from './Homepage';
import MyTeams from '../myteams_components/MyTeams';
import BrowseTeams from '../browseteams_components/BrowseTeams';
import MobileHeader from '../global_components/MobileHeader';
import MobileHomepage from './MobileHomepage';
import MobileBrowseTeams from '../browseteams_components/MobileBrowseTeams';

export default function Home() {

    const [user, loading] = useAuthState(appAuth);
    const history = useHistory();
    const [userloading, setuserloading] = useState(true)

    const isMobile = () => {
        if (window.innerWidth >= 768) {
            return false
        }
        return true
    }

    const [page, setpage] = useState({
        homepage: true,
        myteams: false,
        browseteams: false
    })
    
    const [userdata, setuserdata] = useState({
        email: 'email',
        username: 'user',
        uid: 'UNKNOWN',
        likedTeams: [],
        hatedTeams: []
    })

    const getUserData = () => {
        Promise.resolve(fetchUserData (user)).then((value) => {
            setuserdata(value)
            setuserloading(false)
        })
    }
    
    useEffect(() => {
        if (loading) return <Loading />;
        if (!user) {
            return history.replace("/")
        }
        Promise.resolve(fetchUserData (user)).then((value) => {
            setuserdata(value)
            setuserloading(false)
        })
        if (userloading) return <Loading />;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, loading]);

    return (
        <div>
            {isMobile() ? <MobileHeader user={userdata} setpage={setpage} /> : <Header user={userdata} setpage={setpage} />}
                {page.homepage ? isMobile() ? <MobileHomepage user={userdata} setpage={setpage} userloading={userloading}  /> : <Homepage user={userdata} setpage={setpage} userloading={userloading} /> : null}
                {page.myteams ? <MyTeams userdata={userdata} setpage={setpage}/ > : null}
                {page.browseteams ? isMobile() ? <MobileBrowseTeams userdata={userdata} setuserdata={setuserdata} getUserData={getUserData} setpage={setpage}/> : <BrowseTeams userdata={userdata} setuserdata={setuserdata} getUserData={getUserData} setpage={setpage} /> : null}
            {isMobile() ? <MobileFooter /> : null}
        </div>
    )
}
