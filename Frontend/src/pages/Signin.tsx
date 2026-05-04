import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CrossIcon } from "../icons/CrossIcon";

import { BACKEND_URL } from "../config";

export function Signin(){
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/dashboard");
        }
    }, [navigate]);

    async function signin(){
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
            username,
            password
        });

        const jwt = response.data.token;
        localStorage.setItem("token", jwt);
        localStorage.setItem("username", response.data.username || username || "User");
        navigate("/dashboard");
    }

    return (
        <div className="min-h-screen w-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white flex items-center justify-center relative overflow-hidden px-4 sm:px-6">
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                .glass-effect {
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.12);
                }
                .btn-glow {
                    transition: all 0.25s ease;
                }
                .btn-glow:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 20px 50px rgba(16, 185, 129, 0.25);
                }
            `}</style>

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-green-500 to-cyan-500 rounded-full opacity-15 blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-purple-500 to-sky-500 rounded-full opacity-15 blur-3xl"></div>
            </div>

            <div className="relative z-10 glass-effect rounded-[2rem] p-6 sm:p-10 w-full max-w-md shadow-2xl border border-white/10">

                <div
                    onClick={() => navigate("/")}
                    className="absolute top-4 right-4 p-2 rounded-full cursor-pointer text-slate-400 hover:text-white hover:bg-slate-800/70 transition"
                >
                    <CrossIcon />
                </div>

                <div className="mb-8 text-center">
                    <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80 mb-4">Welcome back</p>
                    <h1 className="text-3xl font-bold text-white">Sign in to BrainLink</h1>
                    <p className="mt-2 text-slate-400">Access your secure shareable link wallet.</p>
                </div>

                <div className="flex flex-col gap-4 w-full">
                    <Input ref={usernameRef} placeholder="Username" />
                    <Input ref={passwordRef} type="password" placeholder="Password" />
                </div>

                <div className="mt-6 flex justify-center w-full">
                    <Button onClick={signin} loading={false} variant="primary" text="Sign in" fullWidth={true} />
                </div>

            </div>
        </div>
    );
}