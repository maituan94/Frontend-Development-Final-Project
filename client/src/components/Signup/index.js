import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState, useEffect, useRef } from "react"
import { useForm, Controller } from "react-hook-form";


const Signup = ({ className }) => {
    const [isOpen, setIsOpen] = useState(false)

    const defaultSignupValue = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        passwordConfirm: ""
    }

    const signUpElements = [
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
    const [data, setData] = useState(null);
    const passwordRef = useRef({});
    passwordRef.current = watch("password", "");

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    useEffect(() => {
        return () => {
            reset()
        }
    }, [isOpen, reset])


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
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Signup
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <form onSubmit={handleSubmit((data) => setData(data))} className="form">
                                            {signUpElements.map((ele, index) =>
                                                <Controller
                                                    key={`${ele.name}-${index}`}
                                                    name={ele.name}
                                                    control={control}
                                                    rules={ele.rules}
                                                    render={({ field }) => (
                                                        <div className="bg-white px-4 mb-6">
                                                            <input
                                                                type={ele.type}
                                                                {...field}
                                                                className="mb-1 w-full p-3 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                                placeholder={ele.placeholder} />
                                                            <small className="text-red-500 d-flex flex-column">{errors[ele.name]?.message || ''}</small>
                                                        </div>
                                                    )}
                                                />
                                            )}
                                            <div className="mt-4">
                                                <button
                                                    type="submit"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                                                    Submit
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
