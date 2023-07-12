<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'content',
    ];

    public function uploads(): MorphMany
    {
        return $this->morphMany(Upload::class, 'uploadable');
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'post_users');
    }

    public function usersWithPivot()
    {
        return $this->users()->withPivot('type', 'content', 'created_at', 'updated_at');
    }

    public function getOwner()
    {
        return $this->users()->withPivot('type', 'content', 'created_at', 'updated_at')
            ->where('post_users.type', User::USER_POST_TYPES['owner'])
            ->first();
    }
}
