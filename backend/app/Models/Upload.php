<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Upload extends Model
{
    use HasFactory;

    protected $table = 'uploads';
    protected $fillable = [
        'name',
        'image',
        'url',
        'uploadable_id',
        'uploadable_type',
    ];

    public const TYPES = ['image' => 0, 'music' => 1, 'video' => 2];
    public function uploadable(): MorphTo
    {
        return $this->morphTo();
    }
}
