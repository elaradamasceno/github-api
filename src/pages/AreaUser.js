import React, { useState, useEffect } from 'react';
import { Skeleton, Avatar, Card } from 'antd';
import axios from 'axios';

import { UserSwitchOutlined, FolderOutlined } from '@ant-design/icons';

import '../styles/css/area-user.css';
import { responsiveArray } from 'antd/lib/_util/responsiveObserve';

export function AreaUser({userUrl}){
  const [dataUser, setDataUser] = useState([]);
  const [dataRepos, setDataRepos ] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        if(res.status === 200)
          setDataRepos(res.data);

        console.log(res)
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
        </div>

        <div className="content-repo">
          {dataRepos && dataRepos.map((repo, index) => {
            return(
              <div key={index}>
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
                </Card>
              </div>
          
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

  function renderSkeleton(){
    return(
      <div className="content-skeleton">
        <Skeleton loading={isLoading} active avatar></Skeleton>
      </div>
    )
  }

  useEffect(() => {
    requestUserUrl();
  }, []);

  useEffect(() => {}, [isLoading]);
  useEffect(() => {
    requestUserRepo();
  }, [dataUser])

  return (
    <div className="area-user">
      {!isLoading ? renderAreaUser() : renderSkeleton() }
    </div>
  )
}