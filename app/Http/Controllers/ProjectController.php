<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $query = Project::query();

            $sortField = request("sort_field", 'created_at');
            $sortDirection = request("sort_direction", "desc");

            if (request("name")) {
                $query->where("name", "like", "%" . request("name") . "%");
            }
            if (request("status")) {
                $query->where("status", request("status"));
            }

            // Применяем пагинацию к запросу с фильтрами
            $projects = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

            return inertia("Project/Index", [
                "projects" => ProjectResource::collection($projects),
                'queryParams' => request()->query() ?: null,
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch projects'], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Ваш код для создания проекта
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        // Ваш код для сохранения проекта
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        // Ваш код для отображения проекта
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        // Ваш код для редактирования проекта
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        // Ваш код для обновления проекта
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        // Ваш код для удаления проекта
    }
}
