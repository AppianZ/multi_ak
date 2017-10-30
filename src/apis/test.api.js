import { ajaxPost, query as urlQuery } from '../js/ajaxtools';

// 获得初始化的列表
export function getInitList(data) {
	return ajaxPost('/uac/oauth/token', data);
}

export const query = urlQuery;