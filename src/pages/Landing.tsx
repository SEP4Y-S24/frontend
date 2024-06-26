import { useNavigate } from 'react-router';
import Button from "../components/Elements/Button";




export const Landing = () => {
    const navigate = useNavigate();
    const handleStart = () => {
        navigate('/auth/login');
    };

    return (
        <>
            <div className="bg-white h-[100vh] flex items-center">
                <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        <span className="block">Welcome to Smart Clock app</span>
                    </h2>
                    <p>The best smart clock ever made</p>
                    <div className="mt-8 flex justify-center">
                        <div className="inline-flex rounded-md shadow">
                            <Button text={"Start with smart clock"} styleType={"info"} onClick={handleStart}/>
                        </div>
                        <div className="ml-3 inline-flex">
                            <a
                                href="https://github.com/alan2207/bulletproof-react"
                                target="_blank"
                                rel="noreferrer"
                            >
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
