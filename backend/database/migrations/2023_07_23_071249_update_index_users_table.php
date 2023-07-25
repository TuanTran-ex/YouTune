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
        Schema::table('users', function (Blueprint $table) {
            $table->smallInteger('gender')->change();
            $table->string('phone')->nullable()->change();
            $table->fullText('full_name');
            $table->fullText('username');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropFullText('users_username_fulltext');
            $table->dropFullText('users_full_name_fulltext');
            $table->double('phone')->change();
            $table->text('gender', User::GENDER_TYPES)->change();
        });
    }
};
