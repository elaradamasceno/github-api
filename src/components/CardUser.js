import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Avatar } from 'antd';
import '../styles/css/card-user.css';

export function CardUser({searchUser, avatar, login, userUrl}){
	const { Meta } = Card;
	const [detailsUser, setDetailsUser] = useState([]);

	useEffect(() => {
		// console.log(searchUser)
	}, [])


	return(
		<div className="card-user">
			<Card
				// style={searchUser.length > 0 && { width: 400 }}
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