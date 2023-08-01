window.addEventListener('load', async () => {
	//checking whether we're on the index page of categories or not and then fetching all categories
	const categoriesWrapper = document.getElementById('categories-wrapper');
	if (categoriesWrapper) {
		const categories = await getCategories();

		const categoriesUl = document.getElementById('categories-list');

		let categoriesLis = '';

		for (const index in categories) {
			const category = categories[index];

			categoriesLis +=
				'<li class="flex justify-between"><span><span>' +
				category.category +
				'</span></span>&nbsp;&nbsp;&nbsp;<span><span><a href="javascript:;" class="edit-btn" data-id="' +
				category.id +
				'">Edit name</a></span>&nbsp;&nbsp;&nbsp;<span> <a href="javascript:;" class="delete-btn" data-id="' +
				category.id +
				'">Delete</a></span></span></li>';
		}

		categoriesUl.innerHTML = categoriesLis;
	}

	// adding a new category form
	const createCategoryWrapper = document.getElementById(
		'create-category-wrapper'
	);

	if (createCategoryWrapper) {
		const createCategoryForm = document.getElementById('create-category-form');

		createCategoryForm.addEventListener('submit', async (event) => {
			event.preventDefault();

			const category = await storeCategory(createCategoryForm);

			if (category) {
				window.location.href = 'dashboard.html';
			}
		});
	}

	// updating an existing category form
	const editCategoryWrapper = document.getElementById('edit-category-wrapper');

	if (editCategoryWrapper) {
		const editCategoryForm = document.getElementById('edit-category-form');

		const urlParams = new URLSearchParams(window.location.search);
		const categoryId = urlParams.get('category_id');

		const category = await getCategory(categoryId);
		console.log(category);
		editCategoryForm.querySelector('#category').value = category.category;

		editCategoryForm.addEventListener('submit', async (event) => {
			event.preventDefault();

			const category = await editCategory(editCategoryForm, categoryId);

			if (category) {
				window.location.href = `dashboard.html`;
			}
		});
	}

	const deleteBtns = document.querySelectorAll('.delete-btn');

	if (deleteBtns) {
		deleteBtns.forEach((deleteBtn) => {
			deleteBtn.addEventListener('click', async (event) => {
				event.preventDefault();

				const target = event.target;
				const categoryId = target.getAttribute('data-id');

				const result = await deleteCategory(categoryId);

				if (result) {
					location.reload();
				}
			});
		});
	}

	const editBtns = document.querySelectorAll('.edit-btn');

	if (editBtns) {
		editBtns.forEach((editBtn) => {
			editBtn.addEventListener('click', async (event) => {
				event.preventDefault();

				const target = event.target;
				const categoryId = target.getAttribute('data-id');

				if (categoryId) {
					window.location.href = `editCategory.html?category_id=${categoryId}`;
				}
			});
		});
	}
});

const CAT_BASE_URL = 'http://127.0.0.1:8000/api/categories';

const getCategories = async () => {
	try {
		const response = await axios.get(`${CAT_BASE_URL}`);

		const categories = response.data;

		return categories;
	} catch (errors) {
		console.error(errors);
	}
};

const storeCategory = async (createCategoryForm) => {
	try {
		const category = createCategoryForm.querySelector('#category').value;

		const response = await axios.post(`${CAT_BASE_URL}`, {
			category: category,
		});

		const categoryResponse = response.data;

		return categoryResponse;
	} catch (errors) {
		console.error(errors);
	}
};

const getCategory = async (categoryId) => {
	try {
		const response = await axios.get(`${CAT_BASE_URL}/${categoryId}`);

		const category = response.data;

		return category;
	} catch (errors) {
		console.error(errors);
	}
};

const editCategory = async (editCategoryForm, categoryId) => {
	try {
		const category = editCategoryForm.querySelector('#category').value;

		const response = await axios.put(`${CAT_BASE_URL}/${categoryId}`, {
			category: category,
		});

		const categoryResponse = response.data;

		return categoryResponse;
	} catch (errors) {
		console.error(errors);
	}
};

const deleteCategory = async (categoryId) => {
	try {
		const response = await axios.delete(`${CAT_BASE_URL}/${categoryId}`);

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
