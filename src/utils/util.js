import config from '../config';

export function get(url, data) {
  return request(url, 'GET', data);
}

export function post(url, data) {
  return request(url, 'POST', data);
}
export function request(url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      data,
      method,
      url,
      success: res => {
        if (res.statusCode ===200) {
          // 在promise.then()中返回的是两种不同返回结果，为什么？
          // resolve(res);
          resolve(res.data);
        } else {
          reject(res.data);
        }
      }
    })
    ;
  });
}