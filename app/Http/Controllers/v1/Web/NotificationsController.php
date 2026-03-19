<?php

namespace App\Http\Controllers\v1\Web;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class NotificationsController extends Controller
{
    public function index()
    {
        return Inertia::render('Demo/Notifications/NotificationsPage');
    }
}
