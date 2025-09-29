const SignIn = () => {
    return (
        <div>
            <div className="border-gray-50 rounded-xl w-full py-3 mb-4 sm:mb-5 flex items-center justify-center gap-2 sm:gap-3 cursor-pointer bg-white">
                <img width="24" height="24" src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s96-fcrop64=1,00000000ffffffff-rw" alt="g" className="sm:w-[30px] sm:h-[30px]" />
                <span className="text-sm sm:text-base">Sign In with Google</span>
            </div>
            <div className="text-center text-sm sm:text-base text-gray-600 mb-4 sm:mb-0">or</div>
            <div className="border-gray-50 rounded-xl w-full py-3 px-3 sm:px-2 mt-4 sm:mt-5 flex flex-col items-baseline gap-3 bg-white">
                <>
                    <div className="text-sm sm:text-base">
                            <label htmlFor="email">Email</label>
                            <span className="text-red-600"> *</span>
                    </div>
                    <input type="email" required name="email" id="email" className="border-gray-50 p-2 w-full sm:w-19/20 mx-0 sm:mx-2 rounded-lg bg-gray-100 text-sm sm:text-base" placeholder="Enter Email" />
                </>
                <>
                    <div className="text-sm sm:text-base">
                            <label htmlFor="password">Password</label>
                            <span className="text-red-600"> *</span>
                    </div>
                    <input type="password" required name="password" id="password" className="border-gray-50 p-2 w-full sm:w-19/20 mx-0 sm:mx-2 rounded-lg bg-gray-100 text-sm sm:text-base" placeholder="Enter Password" />
                </>
                <div className="w-full sm:w-19/20 flex flex-col items-baseline-last">
                    <button className="cursor-pointer text-sm sm:text-base text-blue-600 hover:text-blue-800">Forgot?</button>
                </div>
            <button className="border rounded-xl w-full sm:w-19/20 py-3 bg-black text-white cursor-pointer text-sm sm:text-base font-medium hover:bg-gray-800 transition-colors">Sign In</button>
            </div>
        </div>
    )
}

export default SignIn;