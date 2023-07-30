<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        return response()->json($categories);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $validator = Validator::make( $request->all(), [
            'category' => 'required|unique:categories,category',
        ] );

        if ( $validator->fails() ) {
            return response()->json($validator->errors(), 500);
        }
        
        $category = Category::create($request->all());
        return response()->json($category, 200);
    }

    public function show(Category $category)
    {
        return response()->json($category, 200);
    }

    public function edit(Category $category)
    {
        //
    }

    public function update(Request $request, Category $category)
    {
        $validator = Validator::make( $request->all(), [
            'category' => 'required|unique:categories,category,' . $category->id . ',id',
        ] );

        if ( $validator->fails() ) {
            return response()->json($validator->errors(), 500);
        }
        
        $category->update($request->all());
        return response()->json($category, 200);
    }

    public function destroy( Category $category)
    {
        $category->delete();
        return response()->json('',200);
    }
}
