import { Card, Avatar } from 'antd';
const { Meta } = Card;

export function CardUser(){
	return(
		<Card
			style={{ width: 300 }}
		>
			<Meta
				avatar={
					<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
				}
				title="Card title"
				description="This is the description"
			/>
		</Card>
	)
}