window.addEventListener('load', async () => {
	//checking whether we're on the index page of products or not and then fetching all products
	const productsWrapper = document.getElementById('products-wrapper');
	if (productsWrapper) {
		const products = await getProducts();

		const productsUl = document.getElementById('products-list');

		let productsLis = '';

		for (const index in products) {
			const product = products[index];

			productsLis += '<li><span> Product name: ' + product.name + '</span> </span> ----- <span> <span> ID: ' + product.id + '</span> ----- <span><a href="javascript:;" class="edit-btn" data-id="' + product.id + '">Edit name</a></span> ----- <span> <a href="javascript:;" class="delete-btn" data-id="' + product.id + '">Delete</a></span></li>';
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

		const categories = await getCategories();

		const categoriesUl = document.getElementById('categories-list');

		let categoriesList = '';

		for (const index in categories) {
			const category = categories[index];

			categoriesList += '<option value="' + category.id+'" label= "' + category.category+'">';
		}

		categoriesUl.innerHTML = categoriesList;
	}

	// updating an existing product form
	const editProductWrapper = document.getElementById('edit-product-wrapper');

	if (editProductWrapper) {
		const editProductForm = document.getElementById('edit-product-form');

		const urlParams = new URLSearchParams(window.location.search);
		const productId = urlParams.get('product_id');

		const product = await getProduct(productId);
		console.log(product)
		editProductForm.querySelector('#product-name').value = product.name;
		editProductForm.querySelector('#product-description').value = product.description;
		editProductForm.querySelector('#product-price').value = product.price;
		// editProductForm.querySelector('#product-image').value = product.image;

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

const BASE_URL_cat = 'http://127.0.0.1:8000/api/categories';

const getCategories = async () => {
	try {
		const response = await axios.get(`${BASE_URL_cat}`);

		const categories = response.data;

		return categories;
	} catch (errors) {
		console.error(errors);
	}
};



const storeProduct = async (createProductForm) => {
	try {
		const name = createProductForm.querySelector('#product-name').value;
		const description = createProductForm.querySelector('#product-description').value;
		const price = createProductForm.querySelector('#product-price').value;
		// const image = createProductForm.querySelector('#product-image').value;
		const category = createProductForm.querySelector('#category').value;

		if (category == ''){
			const warning = document.getElementById('warning');
			warning.innerHTML=`Please select a category`;
			return
		}
		else{
			const product =  {
				name: name,
				description: description,
				price: price,
				// image: image,
			};
			const response = await axios.post(`${BASE_URL}`, product);
			const productResponse = response.data;
			
			const relationURL = BASE_URL+'/'+productResponse.id+'/categories'
		
			const response2 = await axios.post(`${relationURL}`, {category_ids:category});
			// const categoryResponse = response2.data;
			
			
	
			return productResponse;
		}
		
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
		const name = editProductForm.querySelector('#product-name').value;
		const description = editProductForm.querySelector('#product-description').value;
		const price = editProductForm.querySelector('#product-price').value;
		// const productImage = editProductForm.querySelector('#product-image').value;

		const product =  {
			name,
			description,
			price,
			// productImage,
		}
		console.log(product)

		const response = await axios.put(`${BASE_URL}/${productId}`,product);

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