
import React, { useEffect, useState } from 'react';
import { GithubOutlined} from '@ant-design/icons';
import { Search } from '../components/Search';
import { CardUser } from '../components/CardUser';

import api from '../services/api';
import '../styles/css/home.css';

export function Home({getAreaUser}){
  const [ mainUsers, setMainUsers ] = useState([]);
  const [ searchUser, setSearchUser ] = useState([]);

  function getUsers(){
    let validateUsers = JSON.parse(localStorage.getItem('mainUsers'));

    if(validateUsers === null){
      api.get('users').then(res => {
        if(res.status === 200){
          setMainUsers(res.data);
          localStorage.setItem('mainUsers', JSON.stringify(res.data))
        }
      })
    }
    else {
      setMainUsers(validateUsers);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if(searchUser.length > 0)
      setMainUsers(searchUser)
  }, [searchUser])

  return(
    <div className="home">
      <header>
        <div>
          <GithubOutlined className="icon-github" />
          <Search resultSearchUser={setSearchUser} typeSearch="users"></Search>
        </div>
      </header>

      <div className="content-home">
        { mainUsers && mainUsers.map((user, index) => {
          return(
            <CardUser 
              key={index}
              searchUser={searchUser}
              avatar={user.avatar_url}
              login={user.login}
              userUrl={user.url}
              getAreaUser={getAreaUser}
            >
            </CardUser>
          )
        })}
      </div>
    </div>
  )
}