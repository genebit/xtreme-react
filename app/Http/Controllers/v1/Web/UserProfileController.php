<?php

namespace App\Http\Controllers\v1\Web;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class UserProfileController extends Controller
{
    public function index()
    {
        return Inertia::render('Demo/Profile/ProfilePage');
    }
}
