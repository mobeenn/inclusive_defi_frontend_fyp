import SignInForm from "@/components/Auth/signin-form";

const SignIn = () => {
   return (
      <>
         <h1 className="text-3xl font-poppins text-white leading-[43px] tracking-wide font-semibold text-center">
            WELCOME BACK TO INCLUSIVE DeFi WHERE DREAMS TAKE FLIGHT!
         </h1>
         <h3 className="text-[13px] leading-[21px] tracking-tight font-poppins text-white font-normal text-center text-balance">
            Unlock Your Projects Potential and Chart Their Course!
         </h3>
         <SignInForm />
      </>
   );
};

export default SignIn;
