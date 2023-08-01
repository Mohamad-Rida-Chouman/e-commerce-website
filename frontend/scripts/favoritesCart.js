const CART_ITEMS_URL = 'http://127.0.0.1:8000/api/products_cart/';
const FAV_ITEMS_URL = 'http://127.0.0.1:8000/api/products_favorites/';
$BASE_URL = '';
const getProducts = async () => {
	try {
		const response = await axios.get(`${$BASE_URL}`);

		const products = response.data;

		return products;
	} catch (errors) {
		console.error(errors);
	}
};
const logout = async () => {
	try {
		localStorage.removeItem('token');
		return true;
	} catch (errors) {
		console.error(errors);
	}
};

window.addEventListener("load", async()=>{
    const userId = localStorage.getItem('token');
    const cartDiv = document.getElementById('cart')
    const favDiv = document.getElementById('fav')

    const buttonChange = document.getElementById('login')
	if(userId){
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

    if(cartDiv){
        $BASE_URL = CART_ITEMS_URL+userId;
    }
    if(favDiv){
        
        $BASE_URL = FAV_ITEMS_URL+userId;
    }
    const products = await getProducts();

		let productsList = '';
        const productsContainer = document.getElementById('main-container');

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
				'</div></div>';
		}

		productsContainer.innerHTML = productsList;
})

