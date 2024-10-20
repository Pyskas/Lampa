import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link  } from "@inertiajs/react";

export default function Create({auth}) {
    const {data, setData, post, errors, reset} = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    const onSubmit = (e) => {
        e.preventDefault();
        
        post(route('user.store'));
    }
    
    return (
        <AuthenticatedLayout
        user={auth.user} 
        header={
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Создать нового пользователя</h2>
            
            </div>
        }
        >
             <Head title="Пользователи" />

<div className="py-12">
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                <form onSubmit={onSubmit}
                 className="p-4 bg-white shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                    <div className="mt-4">
                        <InputLabel htmlFor="user_name" value="Имя Пользователя"/>
                        <TextInput
                        id="user_name"
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
                    <InputLabel htmlFor="user_email" value="Email"/>
                        <TextInput
                        id="user_email"
                        type="text"
                        name="email"
                        value={data.email}
                        className="block w-full mt-1"
                        onChange={(e) => setData("email", e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>
                    <div className="mt-4">
                    <InputLabel htmlFor="user_password" value="Пароль"/>
                        <TextInput
                        id="user_password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="block w-full mt-1"
                        onChange={(e) => setData("password", e.target.value)}
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>
                    <div className="mt-4">
                    <InputLabel htmlFor="user_password_confirmation" value="Подтверждение пароля"/>
                        <TextInput
                        id="user_password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="block w-full mt-1"
                        onChange={(e) => setData("password_confirmation", e.target.value)}
                        />

                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>
                    <div className="mt-4 text-right">
                        <Link href={route("user.index")} className="px-3 py-1 mr-2 text-gray-800 transition-all bg-gray-100 rounded shadow hover:bg-gray-200">
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