import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState, useEffect, useRef } from "react"
import { useForm, Controller } from "react-hook-form";
import { XMarkIcon } from '@heroicons/react/24/outline'

const Signup = ({ className }) => {
    const [isOpen, setIsOpen] = useState(false)

    const defaultSignupValue = {
        isSupplier: false,
        firstName: "",
        lastName: "",
        companyName: "",
        email: "",
        phone: "",
        password: "",
        passwordConfirm: ""
    }

    const signUpElements = [
        {
            name: "isSupplier",
            rules: {},
            type: "toggle",
            label: {
                "false": "Sign up as a customer",
                "true": "Sign up as a supplier"
            }
        },
        {
            name: "firstName",
            rules: {
                required: { value: true, message: "First name is empty" },
                pattern: { value: /^[A-Za-z][A-Za-z0-9 ]+$/, message: "First name must be at least 2 characters and not start with number or special characters" }
            },
            type: "text",
            placeholder: "First Name"
        },
        {
            name: "lastName",
            rules: {
                required: { value: true, message: "Last name is empty" },
                pattern: { value: /^[A-Za-z][A-Za-z0-9 ]+$/, message: "Last name must be at least 2 characters and not start with number or special characters" }
            },
            type: "text",
            placeholder: "Last Name"
        },
        {
            name: "companyName",
            rules: {},
            type: "text",
            placeholder: "Company Name"
        },
        {
            name: "email",
            rules: {
                required: { value: true, message: "Email is empty" },
                pattern: { value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]+)*$/, message: "Email is invalid" }
            },
            type: "text",
            placeholder: "Email"
        },
        {
            name: "phone",
            rules: {
                required: { value: true, message: "Phone is empty" },
                pattern: { value: /^\+[0-9]{1,3}\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/, message: "Invalid phone number. For example: +1(234)456-7777" }
            },
            type: "text",
            placeholder: "Phone number: +1(234)456-7777"
        },
        {
            name: "password",
            rules: {
                required: { value: true, message: "Password is empty" },
                pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{12,}$/, message: "Password must be at least 12 mix-characters of uppercase letter, number and special character" }
            },
            type: "password",
            placeholder: "Password"
        },
        {
            name: "passwordConfirm",
            rules: {
                required: { value: true, message: "Confirm Password is empty" },
                pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{12,}$/, message: "Confirm Password must be at least 12 mix-characters of uppercase letter, number and special character" },
                validate: value => {
                    return value === passwordRef?.current || "The passwords do not match"
                }
            },
            type: "password",
            placeholder: "Password Confirm"
        },
    ]

    const { handleSubmit, reset, setValue, control, formState: { errors }, watch } = useForm({ mode: "all", defaultValues: defaultSignupValue });
    const [data, setData] = useState(defaultSignupValue);

    const passwordRef = useRef({})
    passwordRef.current = watch("password", "")

    const isSupplierRef = useRef({})
    isSupplierRef.current = watch("isSupplier", false)

    const closeModal = () => {
        setIsOpen(false)
    }

    const openModal = (e) => {
        setIsOpen(true)
    }

    useEffect(() => {
        return () => {
            reset()
        }
    }, [isOpen, reset])

    const onSubmit = (data) => {
        console.log(data)
    }

    const renderSimpleInput = (data, index) => <Controller
        key={`${data.name}-${index}`}
        name={data.name}
        control={control}
        rules={data.rules}
        render={({ field }) => (
            <div className="bg-white px-4 mb-6">
                <input
                    type={data.type}
                    {...field}
                    className={`${field.name === "companyName" && isSupplierRef.current === false && "hidden"} mb-1 w-full p-3 border-gray-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm`}
                    placeholder={data.placeholder} />
                <small className="text-red-500 d-flex flex-column">{errors[data.name]?.message || ''}</small>
            </div>
        )}
    />

    const renderToggle = (data, index) =>
        <Controller
            key={`${data.name}-${index}`}
            name={data.name}
            control={control}
            rules={data.rules}
            render={({ field }) => (
                <div className="bg-white px-4 mb-6">
                    <label className="inline-flex relative items-center cursor-pointer">
                        <input type="checkbox" {...field} checked={field.value} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-300 dark:peer-focus:ring-slate-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-slate-600"></div>
                        <span className="ml-3 text-sm font-medium text-gray-700">{data.label[field.value.toString()]}</span>
                    </label>
                </div>
            )} />

    return (
        <>
            <button
                type="button"
                onClick={openModal}
                className={className}>
                Sign up
            </button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"

                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900 mb-5">
                                        Sign up
                                        <XMarkIcon className="absolute top-3 right-3 h-6 w-6" aria-hidden="true" onClick={() => closeModal()}/>
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <form onSubmit={handleSubmit((data) => onSubmit(data))} className="form">
                                            {signUpElements.map((ele, index) => {
                                                if (ele.type === "toggle") return renderToggle(ele, index)
                                                return renderSimpleInput(ele, index)
                                            })}
                                            <div className="mt-4">
                                                <button
                                                    type="submit"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2">
                                                    Register
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default Signup;
