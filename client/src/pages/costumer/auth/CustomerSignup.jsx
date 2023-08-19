import { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { customerSignup } from "../../../store/auth/customerAuthSlice";
import axios from "axios";
import Web3Context from "../../../contexts";

// image
import { NavLink } from "react-router-dom";

export const CustomerSignup = () => {
  const { checkIfWalletIsConnected } = useContext(Web3Context);
  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, errorSignUp } = useSelector((store) => store.customer);

  const handleSubmit = async (e) => {
    e.preventDefault();
    checkIfWalletIsConnected().then((res) => {
      axios("http://localhost:5000/signup", {
        method: "POST",
        data: {
          email: email,
          userType: "User",
          walletAddress: res,
          name:Name
        },
      }).then((res) => {
        if (res.data) {
          window.location.href = `/`;
        } else {
          alert("Something went wrong");
          window.location.href = `/#/customer/signup`;
        }
      });
    });

    dispatch(customerSignup({ Name, email, password }));
  };

  return (
    <main className="flex min-h-screen w-full items-center bg-bgcolor2">
      <div className="container mx-auto px-6 py-6 lg:px-16">
        <div className="mt-16 flex flex-col-reverse items-center justify-center gap-5 md:flex-row">
          <form
            className="flex w-full flex-col items-center gap-5 md:mr-20 md:w-1/3"
            onSubmit={handleSubmit}
          >
            <h3 className="mb-3 font-urbanist text-xl font-bold text-primary md:text-3xl">
              Please fill in the fields below
            </h3>

            <input
              type="text"
              name="Name"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full border border-gray-300 px-5 py-3 shadow-md focus:outline-none md:px-6 md:py-4 md:text-lg"
            />

            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="E-mail"
              className="w-full border border-gray-300 px-5 py-3 shadow-md focus:outline-none md:px-6 md:py-4 md:text-lg"
            />

            <button
              disabled={loading}
              className="w-full rounded-md bg-[#c6f6f8] px-5 py-2 font-urbanist font-extrabold text-secondary shadow-md ring-2 ring-[#abecee] transition duration-300 ease-in hover:bg-[#abecee] hover:text-primary md:px-6 md:py-3"
            >
              SIGNUP
            </button>

            <div className="flex items-center justify-center space-x-2 font-urbanist text-base font-semibold text-gray-600">
              <h4>Already have an account?</h4>

              <NavLink
                to="/customer/login"
                className="underline transition duration-300 ease-in hover:text-primary"
              >
                Login
              </NavLink>
            </div>

            {errorSignUp && <div className="error">{errorSignUp}</div>}
          </form>

          <img
            className="h-64 w-64 object-cover md:h-[490px] md:w-[384px] md:border-l md:border-gray-300 md:pl-20"
            src="https://res.cloudinary.com/sambitsankalp/image/upload/v1692129808/grid/login_kszezx.jpg"
            alt="/"
          />
        </div>
      </div>
    </main>
  );
};
