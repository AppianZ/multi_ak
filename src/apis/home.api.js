import { ajaxGet, ajaxPost, query as urlQuery } from '../js/ajaxtools';

// 获得初始化的列表
export function getInitList(data) {
	return ajaxPost('/auth', data);
}

export function getTestSocket(data) {
  return ajaxGet('/test/socket', data);
}

export function addUser(data) {
  return ajaxPost('/test/adduser', data);
}

export const query = urlQuery;