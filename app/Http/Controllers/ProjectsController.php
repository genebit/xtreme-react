<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ProjectsController extends Controller
{
    public function index()
    {
        return Inertia::render('Authenticated/Projects/ProjectsPage');
    }

    public function archived()
    {
        return Inertia::render('Authenticated/Projects/ArchivedProjectsPage');
    }
}
