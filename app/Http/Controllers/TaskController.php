<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Support\Str;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\TaskResource;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $query = Task::query();

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

            return inertia("Task/Index", [
                "tasks" => TaskResource::collection($tasks),
                'queryParams' => request()->query() ?: null,
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch tasks'], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return \inertia("Task/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        if ($image){
            $data['image_path'] = $image->store('task/'.Str::random(), 'public');
        }
        Task::create($data);

        return \to_route('task.index')->with('success', 'Ваша правка создана');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        $query = $task->tasks();

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

        return \inertia('Task/Show', [
            'task'=> new TaskResource($task),
            "tasks" => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        return inertia('Task/Edit', [
            'task' => new TaskResource($task),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();

        $image = $data['image'] ?? null;
        $data['updated_by'] = Auth::id();
        if ($image){
            if($task->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($task->image_path));
            }
            $data['image_path'] = $image->store('task/'.Str::random(), 'public');
        }
        $task->update($data);

        return to_route('task.index')->with('success', "Правка \"$task->name\" обновлена");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $name = $task->name;
        $task->delete();
        if($task->image_path) {
            Storage::disk('public')->deleteDirectory(dirname($task->image_path));
        }
        return to_route('task.index')->with('success',"Правка \"$name\" удалена");
    }
}
