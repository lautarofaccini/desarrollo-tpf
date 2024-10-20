import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement login/register logic here
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="bg-surface p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-text">
          {isLogin ? "Login" : "Register"}
        </h2>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
          />
          <Button type="submit" variant="primary" size="lg" className="w-full">
            {isLogin ? "Login" : "Register"}
          </Button>
        </form>
        <p className="mt-4 text-center text-text-secondary">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary hover:underline focus:outline-none"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>    
    </div>
  );
};

export default LoginRegister;
