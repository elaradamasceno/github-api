import React, { useState } from 'react';
import { SearchOutlined, CloseCircleOutlined} from '@ant-design/icons';
import { Input, Button, Tooltip} from 'antd';

import axios from 'axios';
import '../styles/css/search-user.css';
import { responsiveArray } from 'antd/lib/_util/responsiveObserve';

export function SearchUser({resultSearchUser}){
  const [ searchValue, setSearchValue] = useState();
  const [ successSearch, setSuccessSearch ] = useState(false);

  function getValueSearch(event){
    setSearchValue(event.target.value);
  }

  function displayRule(){
    switch(successSearch){
      case false:
        return(
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
        )
        break;
      case true:
        return(
          <Tooltip title="Limpar">
            <Button 
              alt="Botão pesquisar" 
              id="search" 
              type="primary" 
              shape="circle" 
              icon={<CloseCircleOutlined />} 
            />
          </Tooltip>
        )
        break;

    }
  }

  function requestSearchUser(){
    let url = `https://api.github.com/users/${searchValue}`;
    axios.get(url)
    .then(res => {
      if(res.status === 200){
        resultSearchUser([res.data]);
        setSuccessSearch(true);
      }
    })
  }

  return(
    <div className="search-user">
      <Input placeholder="Pesquise aqui..." onChange={getValueSearch}/>
      {displayRule()}
    </div>
  )
}