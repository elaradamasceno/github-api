
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GithubOutlined } from '@ant-design/icons';
import { Input } from 'antd';

import '../styles/css/home.css';

import { CardUser } from './CardUser';


export function Home(){
  const [ mainUsers, setMainUsers ] = useState([]);

  function getUsers(){
    let url = 'https://api.github.com/users';

    let validateUsers = JSON.parse(localStorage.getItem('mainUsers'));

    if(validateUsers === null){
      axios.get(url)
      .then(res => {
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

  return(
    <div className="home">
      <header>
        <div>
          <GithubOutlined className="icon-github" />
          <Input placeholder="Pesquise aqui..." />
        </div>
      </header>

      <div className="content-home">
        {mainUsers && mainUsers.map((user, index) => {
          console.log(user)
          return(
            <CardUser 
              key={index}
              avatar={user.avatar_url}
              login={user.login}
              userUrl={user.url}
            >
            </CardUser>
          )
        })}
      </div>
    </div>
  )
}