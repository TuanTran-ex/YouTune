<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class City extends Model
{
    use HasFactory;
    protected $table = 'm_cities';
    protected $fillable = [
        'name',
    ];
    public $timestamps = false;

    public function wards(): HasMany
    {
        return $this->hasMany(Ward::class, 'm_city_id');
    }
}
