import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { 
    PROJECT_STATUS_CLASS_MAP, 
    PROJECT_STATUS_TEXT_MAP,
} from "@/constants.jsx";
import TasksTable from "../Task/TasksTable";

export default function Show({ auth, success, project, tasks, queryParams}) {
    return (
        <AuthenticatedLayout
        user={auth.user} header={<div className="flex justify-between item-center"><h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">{`Проект "${project.name}"`}</h2>
        <Link href={route("project.edit", project.id)} className="px-3 py-1 text-white transition-all rounded shadow bg bg-emerald-500 hover:bg-emerald-600">
            Редактировать
            </Link>
        </div>
    
    }
        >
            <Head title={`Проект "${project.name}"`} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                    <div>
                                <img
                                src={project.image_path}
                                alt=""
                                className="object-cover w-full h-64"
                                />
                            </div>
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="grid grid-cols-2 gap-1 mt-2">
                                <div>
                                    <div>
                                        <label className="text-lg font-bold">ID Проекта:</label>
                                        <p className="mt-1">{project.id}</p>
                                    </div>
                                    
                                    <div className="mt-4">
                                        <label className="text-lg font-bold">Название проекта:</label>
                                        <p className="mt-1">{project.name}</p>
                                    </div>

                                    <div className="mt-4">
                                        <label className="text-lg font-bold">Статус Проекта:</label>
                                        <p className="mt-1">
                                        <span className={
                                                    "px-2 py-1 rounded text-white " +
                                                    PROJECT_STATUS_CLASS_MAP[project.status]
                                                }>
                                                    {PROJECT_STATUS_TEXT_MAP[project.status]}
                                                </span>
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="text-lg font-bold">Создан</label>
                                        <p className="mt-1">{project.createdBy.name}</p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label className="text-lg font-bold">Дедлайн</label>
                                        <p className="mt-1">{project.due_date}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="text-lg font-bold">Создано</label>
                                        <p className="mt-1">{project.created_at}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="text-lg font-bold">Редактировано</label>
                                        <p className="mt-1">{project.updatedBy.name}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-4">
                                <label className="text-lg font-bold">Описание проекта</label>
                                <p className="mt-1">{project.description}</p>
                            </div>
                        </div>
                        </div>
                        </div>
                        </div>

                        <div className="pb-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <TasksTable tasks={tasks} success={success} queryParams={queryParams} hideProjectColumn={true}/>
                        </div>
                        </div>
                        </div>
                        </div>
        </AuthenticatedLayout>
    )
}