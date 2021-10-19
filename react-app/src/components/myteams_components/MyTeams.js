import React, { useEffect } from 'react'
import Header from '../global_components/Header'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useHistory } from 'react-router';
import { auth } from '../firebase/firebase';
import './myteams_stylesheets/MyTeams.css'
import Footer from '../global_components/Footer'
import { Link } from 'react-router-dom';

export default function MyTeams() {

    const [user, loading] = useAuthState(auth);
    const history = useHistory();
  
    
    useEffect(() => {
      if (loading) return;
      if (!user) return history.replace("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, loading]);

    return (
        <div id='MyTeams' className='page'>
            <Header user={user}/>
            <div className='page_content'>
                <div id='addteams_box'>
                    <Link to='/browseteams' className='styled_button'>add/remove teams</Link>
                </div>
                <div id='liked_teams' className='team_list'>

                </div>
                <div id='hated_teams' className='team_list'>

                </div>
            </div>
            <Footer />
        </div>
    )
}
