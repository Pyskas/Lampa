import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { 
    TASK_STATUS_CLASS_MAP, 
    TASK_STATUS_TEXT_MAP,
} from "@/constants.jsx";
import { Head, Link, router } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";

export default function Index({ auth, tasks, queryParams = null }) {
    queryParams = queryParams || {}
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value
        } else {
            delete queryParams[name]
        }

        router.get(route('task.index'), queryParams)
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
            router.get(route('task.index'), queryParams)
        };
    
    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Правки</h2>}>
            <Head title="Задачи" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
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
                                        >Дедлайн</TableHeading>
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
                                    {tasks.data.map(task => (
                                        <tr key={task.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="px-3 py-2">{task.id}</td>
                                            <td className="px-3 py-2">
                                                <img src={task.image_path} style={{ width: 60 }} alt={task.name} />
                                            </td>
                                            <td className="px-3 py-2">{task.name}</td>
                                            <td className="px-3 py-2">
                                                <span className={
                                                    "px-2 py-1 rounded text-white " +
                                                    TASK_STATUS_CLASS_MAP[task.status]
                                                }>
                                                    {TASK_STATUS_TEXT_MAP[task.status]}
                                                </span>
                                            </td>
                                            <td className="px-3 py-2">{task.created_at}</td>
                                            <td className="px-3 py-2">{task.due_date}</td>
                                            <td className="px-3 py-2">{task.createdBy.name}</td>
                                            <td className="px-3 py-2 text-right">
                                                <Link href={route('task.edit', task.id)} className="mx-1 font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                    Редактировать
                                                </Link>
                                                <Link href={route('task.destroy', task.id)} className="mx-1 font-medium text-red-600 dark:text-red-500 hover:underline">
                                                    Удалить
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            </div>
                            <Pagination links={tasks.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}