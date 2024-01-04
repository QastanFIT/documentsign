interface DocumentObject {
    documentid:             number;
    title:                  string;
    clientemail:            string;
    description:            string;
    document:               string;
    filename:               string;
    validuntil:             Date;
    blocked:                boolean;
    customreference:        string;
    datecreated:            Date;
    nationid:               number;
    confirmationcode:       string;
    confirmationvaliduntil: string;
    accountid:              number;
    status:                 number;
    documenttoken:          string;
    useremail:              string;
    signboxid:              number;
    loginid:                number;
    deleted:                boolean;
    language:               number;

    mail2faenabled:         boolean;
    signatureenabled:       boolean;
    eidenabled:             boolean;
}