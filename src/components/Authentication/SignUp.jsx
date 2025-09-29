import React from "react";
import { signUpSchema } from "../../utils/validationSchema";
import toast, {Toaster} from "react-hot-toast";

const SignUp = () => {
    const [formData, setFormData] = React.useState({name: '', email: '', password: ''});

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            signUpSchema.parse(formData);
            console.log("Form data is valid:", formData);
            setFormData({name: '', email: '', password: ''});
        } catch (error) {
            const err = JSON.parse(error);
            toast.error(err[0].message);
            return;
        }
    }

    return (
        <div>
            <Toaster 
                position="bottom-right"
                toastOptions={{
                    duration: 4000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                }}
            />

            <div className="border-gray-50 rounded-xl w-full py-3 mb-4 sm:mb-5 flex items-center justify-center gap-2 sm:gap-3 cursor-pointer bg-white">
                <img width="24" height="24" src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s96-fcrop64=1,00000000ffffffff-rw" alt="g" className="sm:w-[30px] sm:h-[30px]" />
                <span className="text-sm sm:text-base">Sign Up with Google</span>
            </div>
            <div className="text-center text-sm sm:text-base text-gray-600 mb-4 sm:mb-0">or</div>
            <form onSubmit={handleSubmit} className="border-gray-50 rounded-xl w-full py-3 px-3 sm:px-2 mt-4 sm:mt-5 flex flex-col items-baseline gap-3 bg-white">
                <>
                    <div className="text-sm sm:text-base">
                            <label htmlFor="name">Name</label>
                            <span className="text-red-600"> *</span>
                    </div>
                    <input type="text" required name="name" id="name" value={formData.name} onChange={handleChange} className="border-gray-50 p-2 w-full sm:w-19/20 mx-0 sm:mx-2 rounded-lg bg-gray-100 text-sm sm:text-base" placeholder="Enter Name" />
                </>
                <>
                    <div className="text-sm sm:text-base">
                            <label htmlFor="email">Email</label>
                            <span className="text-red-600"> *</span>
                    </div>
                    <input type="email" required name="email" id="email" value={formData.email} onChange={handleChange} className="border-gray-50 p-2 w-full sm:w-19/20 mx-0 sm:mx-2 rounded-lg bg-gray-100 text-sm sm:text-base" placeholder="Enter Email" />
                </>
                <>
                    <div className="text-sm sm:text-base">
                            <label htmlFor="password">Password</label>
                            <span className="text-red-600"> *</span>
                    </div>
                    <input type="password" required name="password" id="password" value={formData.password} onChange={handleChange} className="border-gray-50 p-2 w-full sm:w-19/20 mx-0 sm:mx-2 rounded-lg bg-gray-100 text-sm sm:text-base" placeholder="Enter Password" />
                </>
                <button type="submit" className="mt-5 border rounded-xl w-full sm:w-19/20 py-3 bg-black text-white cursor-pointer text-sm sm:text-base font-medium hover:bg-gray-800 transition-colors">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp;