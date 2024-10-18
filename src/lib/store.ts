import { User } from "firebase/auth";
import { atomWithStorage } from "jotai/utils";

export const sessionAtom = atomWithStorage<User | null>("user", null);
