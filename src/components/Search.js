import React, { useState } from 'react';
import { SearchOutlined, CloseCircleOutlined} from '@ant-design/icons';
import { Input, Button, Tooltip} from 'antd';

import api from '../services/api';
import '../styles/css/search-user.css';

export function Search({resultSearchUser, typeSearch}){
  const [ searchValue, setSearchValue] = useState();
  const [ successSearch, setSuccessSearch ] = useState(false);

  function getValueSearch(event){
    setSearchValue(event.target.value);
  }

  function clearSearchValue(){
    setSearchValue("");
    setSuccessSearch(false);
    resultSearchUser(JSON.parse(localStorage.getItem('mainUsers')));
  }

  function requestSearch(){
    api.get(`${typeSearch}/${searchValue}`).then(res => {
      if(res.status === 200){
        getDataRequest(res);
      }
    })
  }

  function getDataRequest(res){
    switch(typeSearch){
      case 'users':
        resultSearchUser([res.data]);
        setSuccessSearch(true);
        break;
      case 'repos':
        console.log('opa ', res )
    }
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
              onClick={requestSearch}
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
              onClick={clearSearchValue}
            />
          </Tooltip>
        )
        break;
    }
  }

  return(
    <div className="search-user">
      <Input placeholder="Pesquise aqui..." onChange={getValueSearch} value={searchValue}/>
      {displayRule()}
    </div>
  )
}