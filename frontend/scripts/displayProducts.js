const PROD_BASE_URL = 'http://127.0.0.1:8000/api/products';

const getProducts = async () => {
	try {
		const response = await axios.get(`${PROD_BASE_URL}`);

		const products = response.data;

		return products;
	} catch (errors) {
		console.error(errors);
	}
};

window.addEventListener('load', async () => {
    const productsContainer = document.getElementById('main-container');
        if (productsContainer) {
            const products = await getProducts();

            let productsList = '';

            for (const index in products) {
                const product = products[index];
                $initialPath = product.image;
                $removePath = 'C:\\fakepath\\';
                $imgPath = $initialPath.replace($removePath, '');
                productsList += '<div class="product-container flex flex-col padding-s gap-s" id="product-container"><div class="product-title">'+product.name+'</div><div class="product-image"><img class="product-cover" src="./assets/cover-images/'+$imgPath+'"></div><div class="product-details">'+product.description+'</div><div class="product-price">'+product.price+'</div></div>';

                }

                productsContainer.innerHTML = productsList;
        }
    });

