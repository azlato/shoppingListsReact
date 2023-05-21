const headers = {
  'Content-Type': 'application/json',
};

const simpleApiClient = (url: string, method: string = 'GET', body?: Object) => {
  const data = body ? { body: JSON.stringify(body) } : {};

  return fetch(
    url,
    {
      method,
      headers,
      ...data,
    },
  );
};

export default simpleApiClient;
