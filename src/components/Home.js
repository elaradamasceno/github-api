
import { GithubOutlined } from '@ant-design/icons';
import { Fragment } from 'react';
import '../styles/css/home.css';

export function Home(){

  return(
    <section className="content-home">
      <header>
        <GithubOutlined className="icon-github"/>
      </header>
    </section>
  )
}