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
}