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
