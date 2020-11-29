// export const setUserCookie = (userId, name, phone, image) => {
// 	document.cookie = `userId=${userId}`;
// 	document.cookie = `name=${name}`;
// 	document.cookie = `phone=${phone}`;
// 	document.cookie = `image=${image}`;
// }

export const setUser = user => {
  document.cookie = `user=${user}`;
}

export const setJwtToken = token => {
  document.cookie = `token=${token}`;
}

export const getUserCookie = name => {
	const value = `; ${document.cookie}`;
  	const parts = value.split(`; ${name}=`);

  	if (parts.length === 2)
    return parts
      .pop()
      .split(';')
      .shift();
  	return '';
}

export const deleteCookie = () => {
  // document.cookie = 'userId=';
  // document.cookie = 'name=';
  // document.cookie = 'phone=';
  // document.cookie = 'image=';
  document.cookie = 'token=';
  document.cookie = 'user=';
}