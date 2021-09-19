import { User } from "@/interfaces/user";
import { AppError } from "@/utils/AppError";

export interface UsersModuleState {
  /**
   * A list of Github users
   */
  users: User[];
  /**
   * Selected user
   */
  user: User | null;
  /**
   * An error generated during an HTTP request
   */
  error: AppError | null;
}

export interface GetUsersOptions {
  sort: string;
  order: string;
  name: string;
}
