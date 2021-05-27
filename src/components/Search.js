import React, { useState } from 'react';
import { SearchOutlined, CloseCircleOutlined} from '@ant-design/icons';
import { Input, Button, Tooltip} from 'antd';

import api from '../services/api';
import '../styles/css/search-user.css';

export function Search({resultSearch, typeSearch, updateRepo}){
  const [ searchValue, setSearchValue] = useState();
  const [ successSearch, setSuccessSearch ] = useState(false);

  function getValueSearch(event){
    setSearchValue(event.target.value);
  }

  function clearSearchValue(){
    setSearchValue("");
    setSuccessSearch(false);
    resultSearch(JSON.parse(localStorage.getItem('mainUsers')));
  }

  function actionButtonSearch(){
    switch(typeSearch){
      case 'users':
        requestSearch();
        break;
      case 'repos':
        resultSearch.filter((repo, i) => {
          let validate = repo.name.includes(searchValue);
          if(validate)
            updateRepo([resultSearch[i]]);
        })
    }
  }

  function requestSearch(){
    api.get(`${typeSearch}/${searchValue}`).then(res => {
      if(res.status === 200){
        resultSearch([res.data]);
        setSuccessSearch(true);
      }
    })
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
              onClick={actionButtonSearch}
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