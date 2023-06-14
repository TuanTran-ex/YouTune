<?php

use Illuminate\Support\Facades\Storage;

if (! function_exists('generate_file_url')) {
    function generate_file_url($file)
    {
        if (config('filesystems.default') == config('constants.s3_driver')) {
            return Storage::disk(config('constant.s3_driver'))->temporaryUrl(
                $file->url,
                now()->addMinutes(env('S3_TOKEN_EXPIRED_AT', 1000))
            );
        }
        return $file->url;
    }
}
if (! function_exists('mail_url')) {
    function mail_url($path = '/', $id = '')
    {
        return env('FRONTEND_URL') . $path . $id;
    }
}
