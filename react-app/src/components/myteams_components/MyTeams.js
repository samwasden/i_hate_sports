import React, { useEffect, useState } from 'react'
import Header from '../global_components/Header'
import { addTeam } from '../firebase/team_management'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useHistory } from 'react-router';
import { auth } from '../firebase/firebase';

export default function MyTeams() {

    const [input, setinput] = useState('')

    const [user, loading] = useAuthState(auth);
    const history = useHistory();
  
    
    useEffect(() => {
      if (loading) return;
      if (!user) return history.replace("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, loading]);

    return (
        <div>
            <Header />
            <div className='page_content'>
                <input onChange={(e) => setinput(e.target.value)}/>
                <div>
                    <button onClick={() => addTeam(user, {input})}>add more teams</button>
                </div>
                <div id='liked_teams' className='team_list'>

                </div>
                <div id='hated_teams' className='team_list'>

                </div>
            </div>
        </div>
    )
}
