import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { 
    TASK_STATUS_CLASS_MAP, 
    TASK_STATUS_TEXT_MAP,
    TASK_PRIORITY_CLASS_MAP, 
    TASK_PRIORITY_TEXT_MAP,
} from "@/constants.jsx";

export default function Show({ auth,task,}) {
    return (
        <AuthenticatedLayout
        user={auth.user} header={<div className="flex items-center justify-between"><h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">{`Правка "${task.name}"`}</h2>
        <Link href={route("task.edit", task.id)} className="px-3 py-1 text-white transition-all rounded shadow bg bg-emerald-500 hover:bg-emerald-600">
            Редактировать
            </Link>
        </div>}
        >
            <Head title={`Правка "${task.name}"`} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                    <div>
                                <img
                                src={task.image_path}
                                alt=""
                                className="object-cover w-full h-64"
                                />
                            </div>
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="grid grid-cols-2 gap-1 mt-2">
                                <div>
                                    <div>
                                        <label className="text-lg font-bold">ID Правки:</label>
                                        <p className="mt-1">{task.id}</p>
                                    </div>
                                    
                                    <div className="mt-4">
                                        <label className="text-lg font-bold">Название правки:</label>
                                        <p className="mt-1">{task.name}</p>
                                    </div>

                                    <div className="mt-4">
                                        <label className="text-lg font-bold">Статус Правки:</label>
                                        <p className="mt-1">
                                        <span className={
                                                    "px-2 py-1 rounded text-white " +
                                                    TASK_STATUS_CLASS_MAP[task.status]
                                                }>
                                                    {TASK_STATUS_TEXT_MAP[task.status]}
                                                </span>
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="text-lg font-bold">Приоритет Правки:</label>
                                        <p className="mt-1">
                                        <span className={
                                                    "px-2 py-1 rounded text-white " +
                                                    TASK_PRIORITY_CLASS_MAP[task.priority]
                                                }>
                                                    {TASK_PRIORITY_TEXT_MAP[task.priority]}
                                                </span>
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="text-lg font-bold">Создан</label>
                                        <p className="mt-1">{task.createdBy.name}</p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label className="text-lg font-bold">Дедлайн</label>
                                        <p className="mt-1">{task.due_date}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="text-lg font-bold">Создано</label>
                                        <p className="mt-1">{task.created_at}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="text-lg font-bold">Проект</label>
                                        <p className="mt-1">
                                            <Link href={route('project.show', task.project.id)}
                                            className="hover:underline">{task.project.name}</Link>
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="text-lg font-bold">Назначенный пользователь</label>
                                        <p className="mt-1">
                                            {task.assignedUser.name}
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="text-lg font-bold">Редактировано</label>
                                        <p className="mt-1">{task.updatedBy.name}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-4">
                                <label className="text-lg font-bold">Описание правки</label>
                                <p className="mt-1">{task.description}</p>
                            </div>
                        </div>
                        </div>
                        </div>
                        </div>
        </AuthenticatedLayout>
    )
}