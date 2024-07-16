

export type NavLinkType = {
    to: string,
    text: string,
    isButton?: boolean,
}

export const normalNavLinks: NavLinkType[] = [
    {
        to: "/login",
        text: "Login",
        isButton: true,
    },
    {
        to: "/signup",
        text: "Signup",
        isButton: true,
    },
]

export const protectedNavLinks: NavLinkType[] = [
    {
        to: "/login",
        text: "Login"
    },
    {
        to: "/signup",
        text: "Signup"
    },
]