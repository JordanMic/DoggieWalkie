import {HttpHeaders} from '@angular/common/http';

export const getAuthorizationHeader = (): HttpHeaders => {
  const token = window.localStorage.getItem('token');

  let headers = new HttpHeaders();
  if (token) {
    headers = headers.append('Authorization', `Bearer ${token}`);
  }

  console.log(headers);
  return headers;
};
