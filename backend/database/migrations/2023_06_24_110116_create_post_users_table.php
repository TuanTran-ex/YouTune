<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('post_users', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->enum('type', User::USER_POST_TYPES);
            $table->text('content')->nullable();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')
                ->constrained()->cascadeOnDelete();
            $table->unsignedBigInteger('post_id');
            $table->foreign('post_id')->references('id')->on('posts')
                ->constrained()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('post_users');
    }
};
