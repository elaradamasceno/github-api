import React, { useState, useEffect } from 'react';
import {Avatar, Card, Button } from 'antd';
import axios from 'axios';

import { UserSwitchOutlined, FolderOutlined, StarOutlined } from '@ant-design/icons';
import { Search } from '../components/Search';
import { Loading } from '../components/Loading';

import api from '../services/api';
import '../styles/css/area-user.css';

export function AreaUser({userUrl}){
  const [searchRepo, setSearchRepo] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [dataRepos, setDataRepos ] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [starredIsVisible, setStarredIsVisible] = useState(false);

  function actionButtonStarred(){
    api.get(`users/${dataUser.login}/starred`).then(res => {
      if(res.status === 200){
        console.log(res.data)
        setDataRepos(res.data);
        setStarredIsVisible(true);
      }
    })
  }

  function requestUserUrl(){
    axios.get(userUrl)
    .then(res => {
      if(res.status === 200)
        setDataUser(res.data);

      setTimeout(() => {
        setIsLoading(false);
      }, 300)
    })
  }

  function requestUserRepo(){
    let url = dataUser.repos_url;

    if(url){
      axios.get(url)
      .then(res => {
        if(res.status === 200){
          setDataRepos(res.data);
          localStorage.setItem('userRepos', JSON.stringify(res.data))
        }
      })
    }
  }

  function renderInfoUser(){
    return (
      <div className="info-user">
        <Avatar size={200} src={dataUser.avatar_url} />

        <div className="data-user">
          <h1>{dataUser.name}</h1>
          <div className="login">
            <span>{dataUser.login}</span>
          </div>

          <div className="bio">
            <span>{dataUser.bio}</span>
          </div>

          <div className="followers">
            <UserSwitchOutlined />
            <span>{dataUser.followers} Followers | {dataUser.following} Following</span>
          </div>
        </div>
      </div>
    )
  }

  function renderReposUser(){
    return(
      <div className="repositories">
        <div className="title">
          <span> Repositórios </span>
          <div className="buttons-repository">
            <Search resultSearch={dataRepos} typeSearch="repos" updateRepo={setSearchRepo}></Search>
            <Button className="starred" type="primary" shape="round" onClick={actionButtonStarred}> Starred </Button>
          </div>
        </div>
        <div className="content-repo">
          {dataRepos && dataRepos.map((repo, index) => {
            return(
              <a href={repo.html_url} target="_blank" key={index}>
                <Card style={{ width: 250 }}>
                    <p className="name">
                      <FolderOutlined />
                      {repo.name}
                    </p>

                    <p className="description">
                      {repo.description}
                    </p>
                    <p className="language">
                      {repo.language}
                    </p>

                    { starredIsVisible && (
                      <div>
                        <StarOutlined />
                        <span> - {repo.stargazers_count}</span>
                      </div>
                    )}
                </Card>
              </a>          
            )
          })}

        </div>
      </div>
    )
  }

  function renderAreaUser(){
    return(
      <div className="content-area-user">
        {renderInfoUser()}
        {renderReposUser()}
      </div>
    )
  }

  useEffect(() => {
    requestUserUrl();
  }, []);

  useEffect(() => {}, [isLoading]);
  useEffect(() => {
    requestUserRepo();
  }, [dataUser]);

  useEffect(() => {
    if(searchRepo)
      setDataRepos(searchRepo)
  }, [searchRepo])

  return (
    <div className="area-user">
      {!isLoading ? renderAreaUser() : ( <Loading/>) }
    </div>
  )
}