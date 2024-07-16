export type SingupFormDataDTO = {
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
}

export type SingupCredentialDTO = Omit<SingupFormDataDTO, "confirmPassword">;

export function formDataToCredentialMapper(from: SingupFormDataDTO): SingupCredentialDTO {
    const { confirmPassword, ...rest } = from;

    return rest;
}