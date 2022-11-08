import React from 'react'

const Footer = () => {
    return (
        <div className="fixed bottom-0 w-full ">
            <footer className="border-t-2 border-gray-100 mx-auto max-w-7xl px-4 sm:px-6 p-4 bg-white text-center md:flex md:items-center md:justify-between md:p-6">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <span>Moon</span>. All Rights Reserved.
                </span>
                <ul className="w-fit mx-auto md:mr-0 flex flex-wrap items-center mt-3 text-sm text-gray-500 sm:mt-0">
                    <li>
                        <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
                    </li>
                    <li>
                        <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline">Contact</a>
                    </li>
                </ul>
            </footer>
        </div>
    )
}

export default Footer;
