import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import TableHeading from "@/Components/TableHeading";

export default function Index({ auth, users, queryParams = null, success }) {
    queryParams = queryParams || {}
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value
        } else {
            delete queryParams[name]
        }

        router.get(route('user.index'), queryParams)
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
            router.get(route('user.index'), queryParams)
        };

        const deleteUser = (user) => {
            if(!window.confirm('Вы уверены что хотите удалить Пользователя?'))
                {
                return;
            }
            router.delete(route('user.destroy', user.id));
        }


        if (auth.user.role !== 'admin') {
          return (
              <AuthenticatedLayout user={auth.user}>
                  <Head title="Доступ запрещен" />
                  <div className="py-12">
                      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                          <div className="p-6 bg-red-100 border border-red-400 text-red-700 rounded dark:bg-red-800 dark:text-red-200">
                              <h2 className="text-lg font-semibold">Ошибка доступа</h2>
                              <p>Пожалуйста, обратитесь к руководителю, если вам необходим доступ.</p>
                          </div>
                      </div>
                  </div>
              </AuthenticatedLayout>
          );
      }

    return (
        <AuthenticatedLayout user={auth.user}
        header={
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Пользователь</h2>
            <Link href={route("user.create")} className="px-3 py-1 text-white transition-all rounded shadow bg bg-emerald-500 hover:bg-emerald-600">
            Создать нового пользователя
            </Link>
            </div>
        }>
            <Head title="Пользователь" />

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
                                        <TableHeading name="name" sort_field={queryParams.sort_field}
                                        sort_direction={queryParams.sort_direction}
                                        sortChanged={sortChanged}
                                        >Имя</TableHeading>
                                        <TableHeading name="email" sort_field={queryParams.sort_field}
                                        sort_direction={queryParams.sort_direction}
                                        sortChanged={sortChanged}
                                        >Email</TableHeading>
                                        <TableHeading name="created_at" sort_field={queryParams.sort_field}
                                        sort_direction={queryParams.sort_direction}
                                        sortChanged={sortChanged}
                                        >Создан</TableHeading>
                                        <th className="px-3 py-3 text-right">Действия</th>
                                    </tr>
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3">
                                            <TextInput
                                            className="w-full"
                                            defaultValue={queryParams.name}
                                            placeholder="Имя Пользователя"
                                            onBlur={e => searchFieldChanged('name', e.target.value)}
                                            onKeyPress={e => onKeyPress('name', e)}
                                            />
                                        </th>
                                        <th className="px-3 py-3">
                                        <TextInput
                                            className="w-full"
                                            defaultValue={queryParams.email}
                                            placeholder="Email Пользователя"
                                            onBlur={e => searchFieldChanged('email', e.target.value)}
                                            onKeyPress={e => onKeyPress('email', e)}
                                            />
                                        </th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {users.data.map(user => (
                                        <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="px-3 py-2">{user.id}</td>
                                            <th className="px-3 py-2 text-gray-100 text-nowrap">
                                                {user.name}
                                            </th>
                                            <td className="px-3 py-2">
                                               {user.email}
                                            </td>
                                            <td className="px-3 py-2">{user.created_at}</td>
                                            <td className="px-3 py-2 text-nowrap">
                                                <Link href={route('user.edit', user.id)} className="mx-1 font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                    Редактировать
                                                </Link>
                                                <button
                                                onClick={e => deleteUser(user)}
                                                 href={route("user.destroy", user.id)}
                                                 className="mx-1 font-medium text-red-600 dark:text-red-500 hover:underline">
                                                    Удалить
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            </div>
                            <Pagination links={users.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
