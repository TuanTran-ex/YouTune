<?php

namespace App\Utils;

use Illuminate\Support\Str;

class StringUtil
{
    public static function getModelFromModelClassName($modelClassName)
    {
        return Str::lower(explode('\\', $modelClassName)[2]);
    }
}
