<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FormsController;
use App\Http\Controllers\NotificationsController;
use App\Http\Controllers\ProjectsController;
use App\Http\Controllers\ReportsController;
use App\Http\Controllers\StarterController;
use App\Http\Controllers\TasksController;
use App\Http\Controllers\UserProfileController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', fn() => redirect()->route('dashboard'));

Route::get('/u/dashboard',           [DashboardController::class, 'index'])->name('dashboard');
Route::get('/u/tasks',               [TasksController::class, 'index'])->name('tasks');
Route::get('/u/reports',             [ReportsController::class, 'index'])->name('reports');
Route::get('/u/reports/export',      [ReportsController::class, 'export'])->name('reports.export');
Route::get('/u/projects',            [ProjectsController::class, 'index'])->name('projects');
Route::get('/u/projects/archived',   [ProjectsController::class, 'archived'])->name('projects.archived');
Route::get('/u/profile',             [UserProfileController::class, 'index'])->name('profile');
Route::get('/u/notifications',       [NotificationsController::class, 'index'])->name('notifications');
Route::get('/u/forms',               [FormsController::class, 'index'])->name('forms');

Route::get('/starter', [StarterController::class, 'index'])->name('starter');
