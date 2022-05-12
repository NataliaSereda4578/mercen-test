import Router from 'next/router';

export const login = async ({ email, password }) => {
  // eslint-disable-next-line no-undef
  const responce = await fetch(`${process.env.NEXT_PUBLIC_ORIGIN}api/user/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!responce.ok) {
    throw new Error('Failed to login!');
  }
  Router.push('/');
};

export const register = async ({ email, password, fullname }) => {
  // eslint-disable-next-line no-undef
  const responce = await fetch(`${process.env.NEXT_PUBLIC_ORIGIN}api/user/register`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      fullname,
    }),
  });

  if (!responce.ok) {
    throw new Error('Registration failed!');
  }

  login({ email, password });
  Router.push('/');
};

export const getUserInfo = async (token) => {
  if (!token) {
    throw new Error('No token!');
  }
  const responce = await fetch(
    `${process.env.NEXT_PUBLIC_ORIGIN}api/user/me?${new URLSearchParams({
      token,
    })}`
  );

  if (!responce.ok) {
    removeCookies('token');
    throw new Error('Cant load user info!');
  }

  const userData = await responce.json();
  return userData;
};

export const logout = () => {
  // eslint-disable-next-line no-undef
  fetch(`${process.env.NEXT_PUBLIC_ORIGIN}api/user/logout`);
  Router.push('/login');
};
