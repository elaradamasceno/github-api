import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Avatar } from 'antd';

import '../styles/css/area-user.css';

export function AreaUser({userUrl}){
  const [dataUser, setDataUser] = useState([]);

  function requestUserUrl(){
    console.log(userUrl)
    axios.get(userUrl)
    .then(res => {
      if(res.status === 200)
        setDataUser(res.data);

      console.log(res)
    })
  }

  useEffect(() => {
    requestUserUrl();
  }, []);

  return (
    <div className="area-user">
      <div className="info-user">
        <Avatar size={200} src={dataUser.avatar_url} />
        <div>
          <h1>{dataUser.name}</h1>
          <span>{dataUser.login}</span>
        </div>
      </div>
      <div>
        olááááá
      </div>
    </div>
  )
}