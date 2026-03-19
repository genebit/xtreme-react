<?php

namespace App\Http\Controllers\v1\Web;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class ProjectsController extends Controller
{
    public function index()
    {
        return Inertia::render('Demo/Projects/ProjectsPage');
    }

    public function archived()
    {
        return Inertia::render('Demo/Projects/ArchivedProjectsPage');
    }
}
