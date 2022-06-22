<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $keyType = 'char';

    public $incrementing = false;

    protected $perPage = 30;

    protected $fillable = [
        'id',
        'name'
    ];
}
