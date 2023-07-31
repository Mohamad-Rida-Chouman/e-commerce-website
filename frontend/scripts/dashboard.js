window.addEventListener('load', () => {
	const logoutBtn = document.getElementById('logout-btn');

	logoutBtn.addEventListener('click', async (e) => {
        console.log("clicked")
		const logoutSuccess = await logoutAdmin();
		if (logoutSuccess) {
			e.preventDefault();
			window.location.href = `indexAdmin.html`;
		}
	});
});

const logoutAdmin = async () => {
	try {
		localStorage.removeItem('adminToken');
		return true;
	} catch (errors) {
		console.error(errors);
	}
};
