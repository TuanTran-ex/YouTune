<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create(
            'addresses',
            function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('address', 100);
                $table->float('lat');
                $table->float('long');
                $table->string('addressable_type', 255);
                $table->bigInteger('addressable_id');
                $table->unsignedBigInteger('m_ward_id')->nullable();
                $table->foreign('m_ward_id')->references('id')->on('m_wards')->constrained()->cascadeOnDelete();
                $table->softDeletes();
                $table->timestamps();
            }
        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('addresses');
    }
};
