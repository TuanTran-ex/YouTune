<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Ward extends Model
{
    use HasFactory;
    protected $table = 'm_wards';
    protected $fillable = [
        'name',
    ];
    public $timestamps = false;
    public function city(): BelongsTo
    {
        return $this->belongsTo(City::class, 'm_city_id');
    }
    public function addresses(): HasMany
    {
        return $this->hasMany(Address::class);
    }
}
