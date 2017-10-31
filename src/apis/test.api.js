import { ajaxGet, ajaxPost, query as urlQuery } from '../js/ajaxtools';

// 获得初始化的列表
export function getInitList(data) {
	return ajaxPost('/auths', JSON.stringify(data));
}

export const query = urlQuery;