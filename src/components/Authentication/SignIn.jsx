import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInSchema } from "../../utils/validationSchema";
import toast, { Toaster } from "react-hot-toast";
import { clearError, loginUser } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const [formData, setFormData] = React.useState({email: '', password: ''});
    const dispatch = useDispatch();
    const {isLoading} = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            signInSchema.parse(formData);
        } catch(error){
            const err = JSON.parse(error);
            toast.error(err[0].message);
            return;
        }

        dispatch(clearError());

        try{
            const result = await dispatch(loginUser(formData));
            if(loginUser.fulfilled.match(result)){
                navigate('/dashboard');
            } else if(loginUser.rejected.match(result)){
                toast.error(result.payload || "Login Failed");
            }
        } catch (error){
            toast.error(error || "Login Error");
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
                <span className="text-sm sm:text-base">Sign In with Google</span>
            </div>
            <div className="text-center text-sm sm:text-base text-gray-600 mb-4 sm:mb-0">or</div>
            <form onSubmit={handleSubmit} className="border-gray-50 rounded-xl w-full py-3 px-3 sm:px-2 mt-4 sm:mt-5 flex flex-col items-baseline gap-3 bg-white">
                <>
                    <div className="text-sm sm:text-base">
                        <label htmlFor="email">Email</label>
                        <span className="text-red-600"> *</span>
                    </div>
                    <input 
                        type="email" 
                        required 
                        name="email" 
                        id="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        disabled={isLoading}
                        className="border-gray-50 p-2 w-full sm:w-19/20 mx-0 sm:mx-2 rounded-lg bg-gray-100 text-sm sm:text-base disabled:opacity-50" 
                        placeholder="Enter Email" 
                    />
                </>
                <>
                    <div className="text-sm sm:text-base">
                        <label htmlFor="password">Password</label>
                        <span className="text-red-600"> *</span>
                    </div>
                    <input 
                        type="password" 
                        required 
                        name="password" 
                        id="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        disabled={isLoading}
                        className="border-gray-50 p-2 w-full sm:w-19/20 mx-0 sm:mx-2 rounded-lg bg-gray-100 text-sm sm:text-base disabled:opacity-50" 
                        placeholder="Enter Password" 
                    />
                </>
                
                <div className="w-full sm:w-19/20 mx-0 sm:mx-2 text-right mb-3">
                    <button type="button" className="text-sm sm:text-base text-blue-600 hover:text-blue-800 transition-colors">
                        Forgot Password?
                    </button>
                </div>
                
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="mt-5 border rounded-xl w-full sm:w-19/20 py-3 bg-black text-white cursor-pointer text-sm sm:text-base font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Signing In...
                        </span>
                    ) : (
                        "Sign In"
                    )}
                </button>
            </form>
        </div>
    )
}

export default SignIn;