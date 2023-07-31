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

    public function productsWithCategory(Request $request, $categoryName){
        // $categoryName = $request->get('category_name');
        $products = Product::whereHas("categories", function($query) use ($categoryName) {
            $query->where("name", $categoryName);
        }) -> get();
        return response()->json($products);
    }

    public function getProducts(Request $request){
    $category = $request->query('category');

    $products = Product::when($category, function ($query) use ($category) {
        return $query->whereHas('categories', function ($q) use ($category) {
            $q->where('name', $category);
        });
    })->get();

    return response()->json($products);
}
}
