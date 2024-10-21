import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import TasksTable from "./TasksTable";

export default function Index({ auth, success,tasks, queryParams = null }) {
 
    
    return (
        <AuthenticatedLayout user={auth.user} header={ 
        <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Правки
        </h2>
        <Link href={route("task.create")} className="px-3 py-1 text-white transition-all rounded shadow bg bg-emerald-500 hover:bg-emerald-600">
        Добавить новый
        </Link>
        </div>
    }
    >
            <Head title="Задачи" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <TasksTable tasks={tasks} queryParams={queryParams} success={success} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
