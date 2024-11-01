import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import TextAreaInput from "@/Components/TextAreaInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link  } from "@inertiajs/react";
import SelectInput from "@/Components/SelectInput";

export default function Create({ auth, project }) {
    const {data, setData, post, errors, reset} = useForm({
        image: "",
        name: project.name || "",
        status: project.status || "",
        description: project.description || "",
        due_date: project.due_date || "",
        _method:'PUT'
    })

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("project.update", project.id));
    }

    return (
        <AuthenticatedLayout
        user={auth.user}
        header={
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Редактировать проект "{project.name}"</h2>

            </div>
        }
        >
             <Head title="Проекты" />

<div className="py-12">
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                <form onSubmit={onSubmit}
                 className="p-4 bg-white shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                    {project.image_path && <div className="mb-4">
                        <img src={project.image_path} className="w-64" />
                        </div>}
                    <div>
                        <InputLabel
                        htmlFor="project_image_path"
                        value="Фото Проекта"
                        />
                        <TextInput
                        id="project_image_path"
                         type="file"
                          name="image"
                        className="block w-full mt-1"
                        onChange={ (e) => setData('image', e.target.files[0])}
                         />
                         <InputError message={errors.image} className="mt-2" />
                    </div>
                    <div className="mt-4">
                        <InputLabel htmlFor="project_name" value="Название проекта ✩"/>
                        <TextInput
                        id="project_name"
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
                        htmlFor="project_description"
                        value="Описание проекта"
                        />
                        <TextAreaInput
                        id="project_description"
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
                        htmlFor="project_due_date"
                        value="Окончание"
                        />

                        <TextInput
                        id="project_due_date"
                        type="date"
                        name="due_date"
                        value={data.due_date}
                        className="block w-full mt-1"
                        onChange={(e) => setData("due_date", e.target.value)}
                        />
                        <InputError message={errors.due_date} className="mt-2" />
                    </div>
                    <div className="mt-4">
                        <InputLabel htmlFor="project_status"
                        value="Статус Проекта"
                        />
                        <SelectInput
                        name="status"
                        id="project_status"
                        className="block w-full mt-1"
                        onChange={(e) => setData("status", e.target.value)}
                        >
                            <option value="">Выберите статус</option>
                            <option value="pending">Рассматривается</option>
                            <option value="in_progress">В процессе</option>
                            <option value="completed">Завершенные</option>
                        </SelectInput>

                        <InputError message={errors.project_status}
                        className="mt-2" />
                    </div>
                    <div className="mt-4 text-right">
                        <Link href={route("project.index")} className="px-3 py-1 mr-2 text-gray-800 transition-all bg-gray-100 rounded shadow hover:bg-gray-200">
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
