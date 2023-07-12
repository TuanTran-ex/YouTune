<?php

namespace App\Services;

use App\Http\Resources\FileUploadResource;
use App\Models\Post;
use App\Models\Upload;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class UploadService
{
    protected $upload;

    private const IMAGE_PATH = '/images';

    private const MUSIC_PATH = '/musics';

    private const VIDEO_PATH = '/videos';

    public function __construct(Upload $upload)
    {
        $this->upload = $upload;
    }

    public function uploadFile($data, $file): FileUploadResource
    {
        try {
            ['model' => $modelName, 'id' => $id] = $data;
            $type = $this->getType($file);
            $path = '';
            if ((! in_array($modelName, [User::class, Post::class]))) {
                throw new NotFoundHttpException('model');
            }
            $model = app($modelName)->find($id);
            if (empty($model)) {
                throw (new ModelNotFoundException())->setModel($modelName);
            }
            $dataUpload = [];

            switch ($type) {
                case Upload::TYPES['image']:
                    $path = Storage::disk()->put(self::IMAGE_PATH, $file);
                    if ($model instanceof User) {
                        $this->deleteDumpFile($model);
                    }
                    $dataUpload = ['url' => $path, 'type' => $type];
                    break;
                case Upload::TYPES['music']:
                    $path = Storage::disk()->put(self::MUSIC_PATH, $file);
                    $dataUpload = ['url' => $path, 'name' => $data['name'], 'type' => $type];
                    break;
                case Upload::TYPES['video']:
                    $path = Storage::disk()->put(self::VIDEO_PATH, $file);
                    $dataUpload = ['url' => $path, 'type' => $type];
                    break;
                default:
                    throw new NotFoundHttpException('file type not found');
            }
            $fileUploaded = ($model instanceof Post)
                ? $model->uploads()->create($dataUpload)
                : $model->upload()->create($dataUpload);

            return new FileUploadResource($fileUploaded);
        } catch (\Exception $e) {
            logger($e);
            throw $e;
        }
    }

    private function getType($file)
    {
        $mime= $file->extension();
        if (in_array($mime, Upload::IMAGE_MIMES)) {
            return Upload::TYPES['image'];
        }
        if (in_array($mime, Upload::VIDEO_MIMES)) {
            return Upload::TYPES['video'];
        }
        if (in_array($mime, Upload::MUSIC_MIMES)) {
            return Upload::TYPES['music'];
        }
    }

    public function deleteDumpFile($model): void
    {
        $listFiles = $model->upload()->get();
        foreach ($listFiles as $file) {
            if (Storage::disk()->exists($file->url)) {
                Storage::disk()->delete($file->url);
            }
            $file->delete();
        }
    }
}
