
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GithubOutlined } from '@ant-design/icons';
import { Input } from 'antd';

import '../styles/css/home.css';

import { CardUser } from './CardUser';


export function Home(){
  const [ mainUsers, setMainUsers ] = useState([]);

  function getUsers(){
    let url = 'https://api.github.com/users'

    axios.get(url)
    .then(res => {
      if(res.status === 200){
        setMainUsers(res.data);
      }
    })
  }

  useEffect(() => {
    getUsers()
  }, []);

  return(
    <div className="home">
      <header>
        <div>
          <GithubOutlined className="icon-github" />
          <Input placeholder="Pesquise aqui..." />
        </div>
      </header>

      <section className="content-home">
        <CardUser></CardUser>
      </section>
    </div>
  )
}