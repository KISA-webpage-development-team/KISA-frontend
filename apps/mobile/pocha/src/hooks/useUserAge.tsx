import useSWR from "swr";
import { fetcherWithToken } from "@/lib/swr/fetchers";
import { UserSession } from "@/lib/next-auth/types";

// secret list of allowed underage users
const UNDERAGE_WHITE_LIST = ["jiohin@umich.edu", "dongeunk@umich.edu"];

const calculateAge = (birthday: string): number => {
  const birthDate = new Date(birthday);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

/**
 * @desc Hook to fetch and calculate user's age using SWR
 */
const useUserAge = (session: UserSession | null) => {
  const { data, error, isLoading } = useSWR(
    session ? [`/users/${session.user.email}/`, session.token] : null,
    fetcherWithToken,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      revalidateOnMount: true,
      dedupingInterval: 60 * 10000 * 1, // 1 min
    }
  );

  // Explicit loading state
  if (isLoading) {
    return { underAge: null, status: "loading", fullname: "" };
  }

  // Error handling
  if (error) {
    console.error("Error fetching user's age:", error);
    return { underAge: null, status: "error", fullname: "" };
  }

  // Success: Calculate age and determine underage
  if (data) {
    const { bornDate, bornMonth, bornYear, fullname } = data;
    const formattedBirthday = `${bornYear}-${bornMonth
      .toString()
      .padStart(2, "0")}-${bornDate.toString().padStart(2, "0")}`;
    const age = calculateAge(formattedBirthday);
    const underAge = UNDERAGE_WHITE_LIST.includes(session?.user?.email)
      ? false
      : age < 21;

    return { underAge, status: "success", fullname };
  }

  // Fallback (edge case)
  return { underAge: null, status: "loading", fullname: "" };
};

export default useUserAge;
