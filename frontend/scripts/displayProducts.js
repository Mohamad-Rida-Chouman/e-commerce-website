const PROD_BASE_URL = 'http://127.0.0.1:8000/api/products';
const PROD_CAT_BASE_URL = 'http://127.0.0.1:8000/api/products_category';

const getProducts = async () => {
	try {
		const response = await axios.get(`${DISPLAY_URL}`);

		const products = response.data;

		return products;
	} catch (errors) {
		console.error(errors);
	}
};

window.addEventListener('load', async () => {
	const urlParams = new URLSearchParams(window.location.search);
	const category = urlParams.get('category');
	if(category){
		console.log('categry is: ', category);
		DISPLAY_URL = PROD_CAT_BASE_URL + '/' + category;
	}else{
		DISPLAY_URL = PROD_BASE_URL;
	}

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

	const productsContainer = document.getElementById('main-container');
	if (productsContainer) {
		const products = await getProducts();

		let productsList = '';

		for (const index in products) {
			const product = products[index];
			$initialPath = product.image;
			$removePath = 'C:\\fakepath\\';
			$imgPath = $initialPath.replace($removePath, '');
			productsList +=
				'<div class="product-container flex flex-col padding-s gap-s" id="product-container"><div class="product-title">' +
				product.name +
				'</div><div class="product-image"><img class="product-cover" src="../assets/cover-images/' +
				$imgPath +
				'"></div><div class="product-details">' +
				product.description +
				'</div><div class="product-price">' +
				product.price +
				'</div> <a href="#" class="fav-btn" id="fav'+product.id+'">Add to favorites</a> <a href="#" class="cart-btn" id="cart'+product.id+'">Add to cart</a></div>';
		}

		productsContainer.innerHTML = productsList;

		const token = localStorage.getItem('token');
		if(!token){
			const favBtn = document.querySelectorAll(".fav-btn");
			favBtn.forEach(function(btnFav) {
				document.getElementById(btnFav.id).style.display = "none";
			});
			const cartBtn = document.querySelectorAll(".cart-btn");
			
			cartBtn.forEach(function(btnCart) {
				console.log(btnCart.id)
				document.getElementById(btnCart.id).style.display = "none";
			});
		}

		const favBtn = document.querySelectorAll(".fav-btn");
		favBtn.forEach(function(btn) {
			btn.addEventListener('click', async()=> {
				$id = btn.id.replace('fav','')
				console.log($id)
				const FAV_URL = PROD_BASE_URL + '/' + $id + '/usersFav'

				const responseFav = await axios.post(`${FAV_URL}`, {
					user_id: localStorage.getItem('token'),
				});
			});
		  });
		const cartBtn = document.querySelectorAll(".cart-btn");
		cartBtn.forEach(function(btn) {
			btn.addEventListener('click', async()=> {
				$id = btn.id.replace('cart','')
				console.log($id)
				const CART_URL = PROD_BASE_URL + '/' + $id + '/usersCart'

				const responseCart = await axios.post(`${CART_URL}`, {
					user_id: localStorage.getItem('token'),
				});
			});
		  });
	}
});
const logout = async () => {
	try {
		localStorage.removeItem('token');
		return true;
	} catch (errors) {
		console.error(errors);
	}
};