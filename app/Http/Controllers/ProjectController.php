<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;

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
                'success' => session('success')
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
        return \inertia("Project/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        if ($image){
            $data['image_path'] = $image->store('project/'.Str::random(), 'public');
        }
        Project::create($data);

        return \to_route('project.index')->with('success', 'Ваш проект создан');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $query = $project->tasks();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("status")) {
            $query->where("status", request("status"));
        }

        $tasks = $query->orderBy($sortField, $sortDirection)
        ->paginate(10)
        ->onEachSide(1);

        return \inertia('Project/Show', [
            'project'=> new ProjectResource($project),
            "tasks" => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
        ]);
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
