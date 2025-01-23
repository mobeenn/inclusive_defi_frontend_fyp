import SignUpForm from "@/components/Auth/signup-form";

export default function Signup() {
   return (
      <>
         <h1 className="text-3xl font-poppins text-white leading-[43px] tracking-wide font-semibold text-center uppercase">
            Register Now
         </h1>
         <h3 className="text-[13px] leading-[21px] tracking-tight font-poppins text-white font-normal text-center text-balance">
            Turn your vision into reality!
            <br /> Sign up with Inclusive DeFi to unleash your potential by
            joining our vibrant community of creators and backers. Lets innovate
            together!
         </h3>
         <SignUpForm />
      </>
   );
}
