import { ajaxGet, ajaxPost, query as urlQuery } from '../js/ajaxtools';

// 获得初始化的列表
export function getInitList() {
	return ajaxPost('/auth');
}

export function getToken() {
  return ajaxPost('/token');
}

export const query = urlQuery;