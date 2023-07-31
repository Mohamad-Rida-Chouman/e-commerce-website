<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return response()->json($products);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $validator = Validator::make( $request->all(), [
            'name' => 'required|string',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'image' => 'string',
        ]);

        if ( $validator->fails() ) {
            return response()->json($validator->errors(), 500);
        }

        $product = Product::create($request->all());
        return response()->json($product, 200);
    }

    public function show(Product $product)
    {
        return response()->json($product, 200);
    }

    public function edit(Product $product)
    {
        //
    }

    public function update(Request $request, Product $product)
    {
        $validator = Validator::make( $request->all(), [
            'name' => 'required|unique:products,name',
            'description' => 'required|string',
            'price' => 'required|numeric',
            // 'image' => 'string',
        ]);

        if ( $validator->fails() ) {
            return response()->json($validator->errors(), 500);
        }

        $product = Product::create($request->all());
        return response()->json($product, 200);
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json('',200);
    }

    public function assignCategories(Request $request, Product $product) {
        $categoryIds = $request->get('category_ids');
        if ($categoryIds) {
            $product->categories()->sync($categoryIds);
        }
    }
    public function assigntoCart(Request $request, Product $product) {
        $userId = $request->get('user_id');
        if ($userId) {
            $product->usersCart()->sync($userId);
        }
    }
    public function assigntoFav(Request $request, Product $product) {
        $userId = $request->get('user_id');
        if ($userId) {
            $product->usersFav()->sync($userId);
        }
    }
    public function productsWithCategory(Request $request, $categoryName){
        // $categoryName = $request->get('category_name');
        $products = Product::whereHas("categories", function($query) use ($categoryName) {
            $query->where("name", $categoryName);
        }) -> get();
        return response()->json($products);
    }

    public function getProducts(Request $request, $category_filter){
        // $category = $request->query('category');
        $c = $category_filter;
        
        $products = Product::select('*')
        ->whereIn('id',function($query) use($c) {
            $query->select('product_id')
                ->from('product_category')
                ->where('category_id', $c);
        })->get();

    return response()->json($products);
}
}
