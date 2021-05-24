import React, { useEffect, useState } from 'react';

import { useHistory } from "react-router-dom";
import { Card, Avatar } from 'antd';
import '../styles/css/card-user.css';

export function CardUser({searchUser, avatar, login, userUrl, getAreaUser}){
	const history = useHistory();
	const { Meta } = Card;

	function openAreaUser(){
		let data = {
			login: login,
			userUrl: userUrl
		}
		getAreaUser(data);
		history.push(`/${login}`);
	}

	return(
		<div className="card-user">
			<Card
				className={searchUser.length > 0 && 'researching-user'}
				onClick={openAreaUser}
			>
				<Meta
					avatar={
						<Avatar src={avatar} />
					}
					title={login}
					description="Clique para ver mais!"
				/>
			</Card>
		</div>
	)
}