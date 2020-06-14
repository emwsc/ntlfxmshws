export interface AuthFormHtmlElement extends HTMLFormElement {
    elements: AuthFormElements;  
}

export interface AuthFormElements extends HTMLCollection {
    loginEl: HTMLInputElement;
    pwdEl: HTMLInputElement;
}