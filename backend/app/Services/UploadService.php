<?php

namespace App\Services;

use App\Http\Resources\FileUploadResource;
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
            ['model' => $modelName, 'id' => $id, 'type' => $type] = $data;
            $path = '';
            if ((!in_array($modelName, [User::class]))) {
                throw new NotFoundHttpException('model');
            }
            $model = app($modelName);
            $model = $model->find($id);
            if (empty($model)) {
                throw (new ModelNotFoundException())->setModel($modelName);
            }
            switch ($type) {
                case Upload::TYPES['image']:
                    $path = Storage::disk()->put(self::IMAGE_PATH, $file);
                    if($model instanceof User) {
                        $this->deleteDumpFile($model);
                    }
                    $fileUploaded = $model->upload()->create(['url' => $path]);
                    break;
                case Upload::TYPES['music']:
                    $path = Storage::disk()->put(self::MUSIC_PATH, $file);
                    $fileUploaded = $model->upload()->create(['url' => $path, 'name' => $data['name']]);
                    break;
                case Upload::TYPES['video']:
                    $path = Storage::disk()->put(self::VIDEO_PATH, $file);
                    $fileUploaded = $model->upload()->create(['url' => $path, 'name' => $data['name']]);
                    break;
                default:
                    throw new NotFoundHttpException('file type not found');
            }
            return new FileUploadResource($fileUploaded);
        } catch (\Throwable $th) {
            logger($th);
            throw $th;
        }
    }

    private function deleteDumpFile($model): void
    {
        $listFiles = $model->upload()->get();
        foreach ($listFiles as $file) {
            if(Storage::disk()->exists($file->url)) {
                Storage::disk()->delete($file->url);
            }
            $file->delete();
        }
    }
}
