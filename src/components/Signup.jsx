import React from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
import useForm from 'react-hook-form'
import login from '../store/authSlice'
import { useDispatch } from 'react-redux'

function Signup() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const create = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if(userData){
                const userData = authService.getCurrentUser()
                if(userData) dispatch(login(userData))
                navigate('/')
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className='flex items-center justify-center'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>

            <div className='mb-2 flex justify-center'>
                <span className='inline-block w-full max-w-[100px]'>
                    <Logo width="100%"/>
                </span>
            </div>

            <h2 className='text-center text-2xl font-bold leading-tight'>Sign up to create account</h2>
            <p className='mt-2 text-center text-base text-black/60'>
                Already have an account&nbsp;
                <Link to={login} className='font-medium text-primary transition-all duration-200 hover:underline'>
                    Sign In
                </Link>
            </p>
            { error && <p className='text-red-600 mt-8 text-centre'>{error}</p>}

            <form onSubmit={handleSubmit(create)} className='mt-8'>

                <div className='space-y-5'>
                    <Input
                    label="Full Name"
                    type="text"
                    placeholder="Enter your full name"
                    {...register("name", {
                        required: true
                    })}
                    />

                    <Input
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", {
                        required: true,
                        validate: {
                            matchPattern: (value) => 
                            /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/i.test(value) || "Email address is required"
                        }
                    })}
                    />

                    <Input
                    label="Password: "
                    placeholder="Enter your password"
                    type="password"
                    {...register("password", {
                        required: true
                    })}
                    />

                    <Button type='submit' className='w-full'>Create Account</Button>
                </div>

            </form>
            
        </div>
    </div>
  )
}

export default Signup
