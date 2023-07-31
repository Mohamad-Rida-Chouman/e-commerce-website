window.addEventListener("load", () => {
	const token = localStorage.getItem('token');
	const buttonChange = document.getElementById('login')
	if(token){
		buttonChange.innerHTML = `logout`;
		buttonChange.addEventListener('click', () => {
			if(logout()){

				console.log("logged out")
				window.location.reload();

			}
		})
	}
	else{
		buttonChange.addEventListener('click', () => {
		window.location.href = `userLogin.html`;
	});
	}
})

const leftContainer = document.querySelector('.left-container');
const rightContainer = document.querySelector('.right-container');

leftContainer.addEventListener('mouseenter', () => {
	leftContainer.classList.add('expand-background');
});

leftContainer.addEventListener('mouseleave', () => {
	leftContainer.classList.remove('expand-background');
});

rightContainer.addEventListener('mouseenter', () => {
	rightContainer.classList.add('expand-background');
});

rightContainer.addEventListener('mouseleave', () => {
	rightContainer.classList.remove('expand-background');
});

const mangaBtn = document.getElementById('manga');
mangaBtn.addEventListener('click', () => {
	window.location.href = `products.html?category=manga`;
});

const logout = async () => {
	try {
		localStorage.removeItem('token');
		return true;
	} catch (errors) {
		console.error(errors);
	}
};
