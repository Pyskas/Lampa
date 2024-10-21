import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import TextAreaInput from "@/Components/TextAreaInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link  } from "@inertiajs/react";
import SelectInput from "@/Components/SelectInput";

export default function Create({ auth, task, projects, users }) {
    const {data, setData, post, errors, reset} = useForm({
        image: "",
        name: task.name || "",
        status: task.status || "",
        description: task.description || "",
        due_date: task.due_date || "",
        project_id: task.project_id || "",
        priority: task.priority || "",
        assigned_user_id: task.assigned_user_id || "",
        _method:'PUT'
    })

    const onSubmit = (e) => {
        e.preventDefault();
        
        post(route("task.update", task.id));
    }
    
    return (
        <AuthenticatedLayout
        user={auth.user} 
        header={
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Редактировать правка "{task.name}"</h2>
            
            </div>
        }
        >
             <Head title="Правкаы" />

<div className="py-12">
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                <form onSubmit={onSubmit}
                 className="p-4 bg-white shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                    {task.image_path && <div className="mb-4">
                        <img src={task.image_path} className="w-64" />
                        </div>}
                        <div>
                        <InputLabel htmlFor="task_project_id" 
                        value="Проект"
                        />
                        <SelectInput
                        name="project_id"
                        id="task_project_id"
                        value={data.project_id}
                        className="block w-full mt-1"
                        onChange={(e) => setData("project_id", e.target.value)}
                        >
                            <option value="">Выбрать проект</option>
                            {projects.data.map(project => (
                                <option value={project.id} key={project.id}>{project.name}</option>
                            ))}
                        </SelectInput>

                        <InputError message={errors.project_id}
                        className="mt-2" />
                    </div>
                    <div>
                        <InputLabel 
                        htmlFor="task_image_path" 
                        value="Фото Правкаа" 
                        />
                        <TextInput 
                        id="task_image_path"
                         type="file"
                          name="image"
                        className="block w-full mt-1"
                        onChange={ (e) => setData('image', e.target.files[0])}
                         />
                         <InputError message={errors.image} className="mt-2" />
                    </div>
                    <div className="mt-4">
                        <InputLabel htmlFor="task_name" value="Название правкаа"/>
                        <TextInput
                        id="task_name"
                        type="text"
                        name="name"
                        value={data.name}
                        className="block w-full mt-1"
                        isFocused={true}
                        onChange={(e) => setData("name", e.target.value)}
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div className="mt-4">
                        <InputLabel
                        htmlFor="task_description"
                        value="Описание правкаа"
                        />
                        <TextAreaInput
                        id="task_description"
                        name="description"
                        value={data.description}
                        className="block w-full mt-1"
                        onChange={(e) => setData("description", e.target.value)}
                        />
                        <InputError message={errors.description}
                        className="mt-2" />
                    </div>
                    <div className="mt-4">
                        <InputLabel
                        htmlFor="task_due_date"
                        value="Дедлайн"
                        />
                        
                        <TextInput
                        id="task_due_date"
                        type="date"
                        name="due_date"
                        value={data.due_date}
                        className="block w-full mt-1"
                        onChange={(e) => setData("due_date", e.target.value)}
                        />
                        <InputError message={errors.due_date} className="mt-2" />
                    </div>
                    <div className="mt-4">
                        <InputLabel htmlFor="task_status" 
                        value="Статус Правкаа"
                        />
                        <SelectInput
                        name="status"
                        id="task_status"
                        value={data.status}
                        className="block w-full mt-1"
                        onChange={(e) => setData("status", e.target.value)}
                        >
                            <option value="">Выберите статус</option>
                            <option value="pending">Рассматривается</option>
                            <option value="in_progress">В процессе</option>
                            <option value="completed">Завершенные</option>
                        </SelectInput>

                        <InputError message={errors.task_status}
                        className="mt-2" />
                    </div>
                    <div className="mt-4">
                        <InputLabel htmlFor="task_priority" 
                        value="Приоритет правки"
                        />
                        <SelectInput
                        name="priority"
                        id="task_priority"
                        value={data.priority}
                        className="block w-full mt-1"
                        onChange={(e) => setData("priority", e.target.value)}
                        >
                            <option value="">Выберите приоритет</option>
                            <option value="low">Низкий</option>
                            <option value="medium">Средний</option>
                            <option value="high">Высокий</option>
                        </SelectInput>

                        <InputError message={errors.priority}
                        className="mt-2" />
                    </div>
                    <div className="mt-4">
                        <InputLabel htmlFor="task_assigned_user" 
                        value="Назначенные пользователи"
                        />
                        <SelectInput
                        name="assigned_user_id"
                        id="task_assigned_user"
                        value={data.assigned_user_id}
                        className="block w-full mt-1"
                        onChange={(e) => setData("assigned_user_id", e.target.value)}
                        >
                            <option value="">Выбрать пользователя</option>
                            {users.data.map(user => (
                                <option value={user.id} key={user.id}>{user.name}</option>
                            ))}
                        </SelectInput>

                        <InputError message={errors.assigned_user_id}
                        className="mt-2" />
                    </div>
                    <div className="mt-4 text-right">
                        <Link href={route("task.index")} className="px-3 py-1 mr-2 text-gray-800 transition-all bg-gray-100 rounded shadow hover:bg-gray-200">
                            Отмена
                        </Link>
                        <button className="px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600">
                            Создать
                        </button>
                    </div>
                </form>
                </div>
                </div>
                </div>
        </AuthenticatedLayout>
    )
}