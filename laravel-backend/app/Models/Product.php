<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    protected $fillable = [
        'name', 'description', 'price', 'image',
    ];

    public function categories() {
        return $this->belongsToMany(Category::class, 'product_category', 'product_id', 'category_id')
                    ->withTimestamps();
    }

    public function usersCart() {
        return $this->belongsToMany(User::class, 'cart_items', 'product_id', 'user_id')
                    ->withTimestamps();
    }

    public function usersFav() {
        return $this->belongsToMany(User::class, 'favorites', 'product_id', 'user_id')
                    ->withTimestamps();
    }
    
}