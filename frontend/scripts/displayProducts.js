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
				'</div> <a href="#" class="fav-btn" id="'+product.id+'">Add to favorites</a> <a href="#" class="cart-btn" id="cart-btn">Add to cart</a></div>';
		}

		productsContainer.innerHTML = productsList;

		const favBtn = document.querySelectorAll(".fav-btn")
		// favBtn.addEventListener("click",()=>{
		// 	console.log(favBtn.id)
		// })

		favBtn.forEach(function(btn) {
			btn.addEventListener('click', ()=> {
				console.log(btn.id)
			});
		  });
	}
});
