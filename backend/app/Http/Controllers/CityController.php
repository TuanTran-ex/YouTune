<?php

namespace App\Http\Controllers;

use App\Services\CityService;
use Illuminate\Http\JsonResponse;

class CityController extends ApiController
{
    protected $cityService;
    public function __construct(CityService $cityService)
    {
        $this->cityService = $cityService;
    }

    public function index(): JsonResponse
    {
        try {
            $cities = $this->cityService->listCity();
            return $this->resSuccess($cities);
        } catch (\Throwable $th) {
            logger($th);
            throw $th;
        }
    }

    public function show($id): JsonResponse
    {
        try {
            $city = $this->cityService->getCity($id);
            return $this->resSuccess($city);
        } catch (\Throwable $th) {
            logger($th);
            throw $th;
        }
    }
}
