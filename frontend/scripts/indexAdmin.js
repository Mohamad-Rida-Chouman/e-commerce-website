window.addEventListener('load', () => {
	const loginBtn = document.getElementById('login-btn');

	loginBtn.addEventListener('click', (e) => {
		const loginAdminAccount = document.getElementById('login-admin');

		loginAdminAccount.addEventListener('submit', async (event) => {
			event.preventDefault();

			const loginSuccess = await loginAdmin(loginAdminAccount);
			if (loginSuccess) {
				e.preventDefault();
				window.location.href = `dashboard.html`;
			}
		});
	});
});

const LOGIN_BASE_URL = 'http://127.0.0.1:8000/api/adminLogin';

const loginAdmin = async (loginAdminAccount) => {
	try {
		const email = loginAdminAccount.querySelector('#email').value;
		const password = loginAdminAccount.querySelector('#password').value;
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
			const adminAccount = {
				email: email,
				password: password,
			};
			const response = await axios.post(`${LOGIN_BASE_URL}`, adminAccount);
			const adminAccountResponse = response.data;


			return adminAccountResponse;
		}
	} catch (errors) {
		console.error(errors);
        const warningLogin = document.getElementById('warning-login');
			warningLogin.innerHTML = `Please enter valid credentials`;
	}
};
