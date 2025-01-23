export function isLoggedIn() {
   if (typeof window === "undefined") return;
   return !!localStorage.getItem("token");
}

export const logout = () => {
   if (typeof window === "undefined") return;
   localStorage?.removeItem("token");
   localStorage?.removeItem("user");
   // window.location.reload();
   window.location.href = "/signin";
};

export const getToken = () => {
   if (typeof window === "undefined") return;
   return localStorage?.getItem("token");
};

export const getUser = () => {
   if (typeof window === "undefined") return;
   return JSON.parse(localStorage?.getItem("user"));
};

export function isUserVerified(user) {
   if (!user) return false;
   return (
      user?.verification?.verifiedEmail === true &&
      user?.isActive === "active" &&
      user?.kycStatus === "approved"
   );
}
