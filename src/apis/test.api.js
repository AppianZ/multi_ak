import { ajaxGet, query as urlQuery } from '../js/ajaxtools';

// 获得初始化的列表
export function getInitList(data) {
	return ajaxGet('/test', data);
}

export const query = urlQuery;