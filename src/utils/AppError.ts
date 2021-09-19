export class AppError extends Error {
  constructor(name: string, public payload?: unknown) {
    super(name);
  }
}
