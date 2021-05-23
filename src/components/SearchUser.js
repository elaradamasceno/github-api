import React, { useState } from 'react';
import { SearchOutlined} from '@ant-design/icons';
import { Input, Button, Tooltip} from 'antd';

import axios from 'axios';
import '../styles/css/search-user.css';
import { responsiveArray } from 'antd/lib/_util/responsiveObserve';

export function SearchUser(){
  const [ searchUser, setSearchUser] = useState();
  const [ dataSeach, setDataSearch ] = useState([]);

  function getValueSearch(event){
    setSearchUser(event.target.value);
  }

  function requestSearchUser(){
    let url = `https://api.github.com/users/${searchUser}`;
    axios.get(url)
    .then(res => {
      if(res.status === 200)
        setDataSearch(res.data);
    })
  }



  return(
    <div className="search-user">
      <Input placeholder="Pesquise aqui..." onChange={getValueSearch}/>
      <Tooltip title="Pesquisar">
        <Button 
          alt="Botão pesquisar" 
          id="search" 
          type="primary" 
          shape="circle" 
          icon={<SearchOutlined />} 
          onClick={requestSearchUser}
        />
      </Tooltip>
    </div>
  )
}