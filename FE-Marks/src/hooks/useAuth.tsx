import { useMemo } from "react";
import { useAppSelector } from "../redux/hook";
import { selectCurrentUser } from "../redux/slices/auth";

export const useAuth = () => {
  const user = useAppSelector(selectCurrentUser);

  return useMemo(() => ({ user }), [user]);
};
