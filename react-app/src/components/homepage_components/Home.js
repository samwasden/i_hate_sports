import Header from '../global_components/Header'
import Footer from '../global_components/Footer'
import './homepage_stylsheets/Home.css'
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { auth } from "../firebase/firebase";

export default function Home() {

    const [user, loading] = useAuthState(auth);
    const history = useHistory();
    
    useEffect(() => {
      if (loading) return;
      if (!user) return history.replace("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, loading]);

    return (
        <div className='home'>
            <Header user={user} />
            <Footer />
        </div>
    )
}
