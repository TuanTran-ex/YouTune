<?php

namespace Database\Seeders;

use App\Models\Ward;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class WardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $json = File::get('database/data/ward.json');
        $data = json_decode($json, true);
        try {
            foreach ($data as $value) {
                Ward::create(
                    [
                    'name' => $value['name'],
                    'm_city_id' => $value['m_city_id']
                    ]
                );
            }
        } catch (\Exception $e) {
            logger($e->getMessage());
        }
    }
}
