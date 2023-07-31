localStorage.removeItem('token')

window.addEventListener('load', () => {
	const isAuthenticated = () => {
		const token = localStorage.getItem('token');
		return !!token;
	};

	if (isAuthenticated()) {
		window.location.href = 'index.html';
	}

	const loginBtn = document.getElementById('login-btn-user');
	loginBtn.addEventListener('click', (e) => {
		const loginAccount = document.getElementById('login-user');

		loginAccount.addEventListener('submit', async (event) => {
			event.preventDefault();

			const loginSuccess = await login(loginAccount);
			if (loginSuccess) {
				e.preventDefault();
				window.location.href = `index.html`;
			}
		});
	});
    const signupBtn = document.getElementById('signup-btn-user');
	signupBtn.addEventListener('click', (e) => {
		const signupAccount = document.getElementById('signup-user');

		signupAccount.addEventListener('submit', async (event) => {
			event.preventDefault();

			const registerSuccess = await register(signupAccount);
			if (registerSuccess) {
				e.preventDefault();
				window.location.href = `index.html`;
			}
		});
	});
});

const LOGIN_USER = 'http://127.0.0.1:8000/api/login';

const login = async (loginAccount) => {
	try {
		const email = loginAccount.querySelector('#email').value;
		const password = loginAccount.querySelector('#password').value;
		if (email == '') {
			const warningEmail = document.getElementById('warning-email');
			warningEmail.innerHTML = `Please enter an email`;
			const warningPassword = document.getElementById('warning-password');
			warningPassword.innerHTML = ``;
			return;
		} else if (password == '') {
			const warningPassword = document.getElementById('warning-password');
			warningPassword.innerHTML = `Please enter a password`;
			const warningEmail = document.getElementById('warning-email');
			warningEmail.innerHTML = ``;
			return;
		} else {
			const userAccount = {
				email: email,
				password: password,
			};

			const response = await axios.post(`${LOGIN_USER}`, userAccount);

			const token = response.data.user.id;
			localStorage.setItem('token', token);

			const userAccountResponse = response.data;
			return userAccountResponse;
		}
	} catch (errors) {
		console.error(errors);
		const warningLogin = document.getElementById('warning-login');
		warningLogin.innerHTML = `Please enter valid credentials`;
	}
};

const SIGNUP_USER = 'http://127.0.0.1:8000/api/register';

const register = async (signupAccount) => {
	try {
		const username = signupAccount.querySelector('#username-signup').value;
		const email = signupAccount.querySelector('#email-signup').value;
		const password = signupAccount.querySelector('#password-signup').value;
        if (username == '') {
			const warningUsername = document.getElementById('warning-username');
			warningUsername.innerHTML = `Please enter a username`;
			const warningEmail = document.getElementById('warning-email');
			warningEmail.innerHTML = ``;
			const warningPassword = document.getElementById('warning-password');
			warningPassword.innerHTML = ``;
			return;
        }
		if (email == '') {
			const warningEmail = document.getElementById('warning-email');
			warningEmail.innerHTML = `Please enter an email`;
			const warningUsername = document.getElementById('warning-username');
			warningUsername.innerHTML = ``;
			const warningPassword = document.getElementById('warning-password');
			warningPassword.innerHTML = ``;
			return;
		} else if (password == '') {
			const warningUsername = document.getElementById('warning-username');
			warningUsername.innerHTML = ``;
			const warningPassword = document.getElementById('warning-password');
			warningPassword.innerHTML = `Please enter a password`;
			const warningEmail = document.getElementById('warning-email');
			warningEmail.innerHTML = ``;
			return;
		} else {
			const userAccount = {
                name: username,
				email: email,
				password: password,
			};
            console.log(userAccount)

			const response = await axios.post(`${SIGNUP_USER}`, userAccount);

			const token = response.data.user.id;
			localStorage.setItem('token', token);

			const userAccountResponse = response.data;
			return userAccountResponse;
		}
	} catch (errors) {
		console.error(errors);
		const warningLogin = document.getElementById('warning-login');
		warningLogin.innerHTML = `Please enter valid credentials`;
	}
};