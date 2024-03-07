<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Playlist extends Model
{
    use HasFactory;

    public const TYPES = ['public' => 0, 'private' => 1];
    protected $fillable = [
        'name',
        'type',
        'user_id',
    ];

    public function uploads(): MorphMany
    {
        return $this->morphMany(Upload::class, 'uploadable');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
