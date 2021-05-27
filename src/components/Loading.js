import { Space, Spin} from 'antd';

import '../styles/css/loading.css';

export function Loading(){
	return(
		<div className="content-loading">
			<Space size="middle">
			<Spin size="large" />
			</Space>
		</div>
	)
}