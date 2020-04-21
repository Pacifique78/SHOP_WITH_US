const url = 'https://akoonlineshop.herokuapp.com';
document.getElementById('verify').addEventListener('submit', async (e) => {
  e.preventDefault();
  document.getElementById('code-div').style.display = 'none';
  const verifyCode = document.getElementById('code').value;

  const response = await fetch(`${url}/auth/confirm`, {
    method: 'PATCH',
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
      Accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      verifyCode,
    }),
  });
  const json = await response.json();
  if (json.error) {
    const errorDiv = document.getElementById('code-div');
    errorDiv.innerHTML = json.error;
    errorDiv.style.display = 'inline';
    errorDiv.style.color = '#d84930';
  } else if (json.data.isbuyer) {
    window.location.href = '../html/dashboard2.html';
  } else {
    window.location.href = '../html/dashboard.html';
  }
});


document.getElementById('resend').addEventListener('click', async (e) => {
  e.preventDefault();
  document.getElementById('code-div').style.display = 'none';

  const response = await fetch(`${url}/auth/resend`, {
    method: 'GET',
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
      Accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
    },
  });
  const json = await response.json();

  if (json.error) {
    const errorDiv = document.getElementById('code-div');
    errorDiv.innerHTML = json.error;
    errorDiv.style.display = 'inline';
    errorDiv.style.color = '#d84930';
  } else {
    const messageDiv = document.getElementById('code-div');
    messageDiv.innerHTML = json.message;
    messageDiv.style.display = 'inline';
    messageDiv.style.color = '#28a745';
  }
});
