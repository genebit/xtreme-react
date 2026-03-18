<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class UserProfileController extends Controller
{
    public function index()
    {
        return Inertia::render('Authenticated/Profile/ProfilePage');
    }
}
