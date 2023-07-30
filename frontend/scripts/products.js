window.addEventListener('load', async () => {
	//checking whether we're on the index page of products or not and then fetching all products
	const productsWrapper = document.getElementById('products-wrapper');
	if (productsWrapper) {
		const products = await getProducts();

		const productsUl = document.getElementById('products-list');

		let productsLis = '';

		for (const index in products) {
			const product = products[index];

			productsLis += '<li><span>' + product.product + '</span> ----- <span><a href="javascript:;" class="edit-btn" data-id="' + product.id + '">Edit name</a></span> ----- <span> <a href="javascript:;" class="delete-btn" data-id="' + product.id + '">Delete</a></span></li>';
		}

		productsUl.innerHTML = productsLis;
	}

	// adding a new product form
	const createProductWrapper = document.getElementById(
		'create-product-wrapper'
	);

	if (createProductWrapper) {
		const createProductForm = document.getElementById('create-product-form');

		createProductForm.addEventListener('submit', async (event) => {
			event.preventDefault();

			const product = await storeProduct(createProductForm);

			if (product) {
				window.location.href = `index.html`;
			}
		});
	}

	// updating an existing product form
	const editProductWrapper = document.getElementById('edit-product-wrapper');

	if (editProductWrapper) {
		const editProductForm = document.getElementById('edit-product-form');

		const urlParams = new URLSearchParams(window.location.search);
		const productId = urlParams.get('product_id');

		const product = await getProduct(productId);
		console.log(product)
		editProductForm.querySelector('#product').value = product.product;

		editProductForm.addEventListener('submit', async (event) => {
			event.preventDefault();

			const product = await editProduct(editProductForm, productId);

			if (product) {
				window.location.href = `index.html`;
			}
		});
	}

    const deleteBtns = document.querySelectorAll('.delete-btn');

    if (deleteBtns) {
        deleteBtns.forEach(deleteBtn => {
            deleteBtn.addEventListener('click', async (event) => {
                event.preventDefault();
    
                const target = event.target;
                const productId = target.getAttribute('data-id');
    
                const result = await deleteProduct(productId);
    
                if (result) {
                    location.reload();
                }
            });
        })
    }

	const editBtns = document.querySelectorAll('.edit-btn');

    if (editBtns) {
        editBtns.forEach(editBtn => {
            editBtn.addEventListener('click', async (event) => {
                event.preventDefault();
    
                const target = event.target;
                const productId = target.getAttribute('data-id');
    
                if (productId) {
                    window.location.href = `edit.html?product_id=${productId}`;
                }
            });
        })
    }
});

const BASE_URL = 'http://127.0.0.1:8000/api/products';

const getProducts = async () => {
	try {
		const response = await axios.get(`${BASE_URL}`);

		const products = response.data;

		return products;
	} catch (errors) {
		console.error(errors);
	}
};

const storeProduct = async (createProductForm) => {
	try {
		const product = createProductForm.querySelector('#product').value;

		const response = await axios.post(`${BASE_URL}`, { product: product });

		const productResponse = response.data;

		return productResponse;
	} catch (errors) {
		console.error(errors);
	}
};

const getProduct = async (productId) => {
	try {
		const response = await axios.get(`${BASE_URL}/${productId}`);

		const product = response.data;

		return product;
	} catch (errors) {
		console.error(errors);
	}
};

const editProduct = async (editProductForm, productId) => {
	try {
		const product = editProductForm.querySelector('#product').value;

		const response = await axios.put(`${BASE_URL}/${productId}`, {
			product: product,
		});

		const productResponse = response.data;

		return productResponse;
	} catch (errors) {
		console.error(errors);
	}
};

const deleteProduct = async (productId) => {
	try {
		const response = await axios.delete(`${BASE_URL}/${productId}`);

		const status = response.status;

        if (status == 200) {
            return true;
        } else {
            return false;
        }
	} catch (errors) {
		console.error(errors);
	}
};