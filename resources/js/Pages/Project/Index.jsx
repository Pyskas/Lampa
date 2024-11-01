import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    PROJECT_STATUS_CLASS_MAP,
    PROJECT_STATUS_TEXT_MAP,
} from "@/constants.jsx";
import { Head, Link, router } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";

export default function Index({ auth, projects, queryParams = null, success }) {
    queryParams = queryParams || {}
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value
        } else {
            delete queryParams[name]
        }

        router.get(route('project.index'), queryParams)
        };

        const onKeyPress = (name, e) => {
            if (e.key !== 'Enter') return;

            searchFieldChanged(name, e.target.value);
        };

        const sortChanged = (name) => {
            if (name === queryParams.sort_field) {
                if (queryParams.sort_direction === 'asc') {
                    queryParams.sort_direction = 'desc';
                }else{
                    queryParams.sort_direction = 'asc';
                }
            } else {
                queryParams.sort_field = name;
                queryParams.sort_direction = 'asc';
            }
            router.get(route('project.index'), queryParams)
        };

        const deleteProject = (project) => {
            if(!window.confirm('Вы уверены что хотите удалить проект?'))
                {
                return;
            }
            router.delete(route('project.destroy', project.id));
        }

    return (
        <AuthenticatedLayout user={auth.user}
        header={
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Проекты</h2>
                {auth.user.role === 'admin' && (
                <Link
                    href={route("project.create")}
                    className="px-3 py-1 text-white transition-all rounded shadow bg bg-emerald-500 hover:bg-emerald-600"
                >
                    Добавить новый
                </Link>
            )}
            </div>
        }>
            <Head title="Проекты" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                {success && (
            <div className="px-4 py-2 mb-4 text-white rounded bg-emerald-500">
                {success}
            </div>
            )}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                           <div className="overflow-auto"> <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase border-b-2 border-gray-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr className="text-nowrap">
                                        <TableHeading name="id" sort_field={queryParams.sort_field}
                                        sort_direction={queryParams.sort_direction}
                                        sortChanged={sortChanged}
                                        >ID</TableHeading>
                                        <th className="px-3 py-3">Изображение</th>
                                        <TableHeading name="name" sort_field={queryParams.sort_field}
                                        sort_direction={queryParams.sort_direction}
                                        sortChanged={sortChanged}
                                        >Название</TableHeading>
                                        <TableHeading name="status" sort_field={queryParams.sort_field}
                                        sort_direction={queryParams.sort_direction}
                                        sortChanged={sortChanged}
                                        >Статус</TableHeading>
                                        <TableHeading name="created_at" sort_field={queryParams.sort_field}
                                        sort_direction={queryParams.sort_direction}
                                        sortChanged={sortChanged}
                                        >Создан</TableHeading>
                                        <TableHeading name="due_date" sort_field={queryParams.sort_field}
                                        sort_direction={queryParams.sort_direction}
                                        sortChanged={sortChanged}
                                        >Окончание</TableHeading>
                                        <th className="px-3 py-3">Создано</th>
                                        <th className="px-3 py-3 text-right">Действия</th>
                                    </tr>
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3">
                                            <TextInput
                                            className="w-full"
                                            defaultValue={queryParams.name}
                                            placeholder="Название проекта"
                                            onBlur={e => searchFieldChanged('name', e.target.value)}
                                            onKeyPress={e => onKeyPress('name', e)}
                                            />
                                        </th>
                                        <th className="px-3 py-3">
                                            <SelectInput className="w-full" defaultValue={queryParams.status} onChange={e => searchFieldChanged('status', e.target.value)
                                            }
                                            >
                                                <option value="">Выбрать статус</option>
                                                <option value="pending">Рассматривается</option>
                                                <option value="in_progress">В процессе</option>
                                                <option value="completed">Выполнены</option>
                                            </SelectInput>
                                        </th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {projects.data.map(project => {
                                        // Функция для форматирования даты
                                        const formatDate = (dateString) => {
                                            const date = new Date(dateString);
                                            if (!isNaN(date.getTime())) { // Проверка на корректность даты
                                                const day = String(date.getDate()).padStart(2, '0');
                                                const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
                                                const year = date.getFullYear();
                                                return `${day}.${month}.${year}`;
                                            }
                                            return ''; // Если дата некорректная, возвращаем пустую строку
                                        };

                                        return (
                                            <tr key={project.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <td className="px-3 py-2">{project.id}</td>
                                                <td className="px-3 py-2">
                                                    <img src={project.image_path} style={{ width: 60 }} alt={project.name} />
                                                </td>
                                                <th className="px-3 py-2 text-gray-100 text-nowrap hover:underline">
                                                    <Link href={route('project.show', project.id)}>
                                                        {project.name}
                                                    </Link>
                                                </th>
                                                <td className="px-3 py-2">
                                                    <span className={
                                                        "px-2 py-1 rounded text-white " +
                                                        PROJECT_STATUS_CLASS_MAP[project.status]
                                                    }>
                                                        {PROJECT_STATUS_TEXT_MAP[project.status]}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-2">{formatDate(project.created_at)}</td>
                                                <td className="px-3 py-2">{formatDate(project.due_date)}</td>
                                                <td className="px-3 py-2">{project.createdBy.name}</td>

                                                <td className="px-3 py-2 text-nowrap">
                                                    {auth.user.role === 'admin' && (
                                                        <>
                                                            <Link
                                                                href={route('project.edit', project.id)}
                                                                className="mx-1 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                            >
                                                                Редактировать
                                                            </Link>
                                                            <button
                                                                onClick={(e) => deleteProject(project)}
                                                                className="mx-1 font-medium text-red-600 dark:text-red-500 hover:underline"
                                                            >
                                                                Удалить
                                                            </button>
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            </div>
                            <Pagination links={projects.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
