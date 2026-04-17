
const user = [];
describe('Test du formulaire avec Fixtures', () => {

    beforeEach(() => {
        cy.fixture('user').as('userData');
        cy.fixture('book').as('bookData');

        /*Cypress.dom.wrap(cy.userData).each((users)=>{
            user.push(users);
        });*/
        
        
    });

    const login = (user)=>{
        
        cy.visit('http://127.0.0.1:8000/login');
        cy.get('#email').type(user.email);
        cy.get('#password').type(user.birthDate);
        cy.get('button[type="submit"]').click();
        cy.url().should('be.equal','http://127.0.0.1:8000/profil');
    }

    const addBook = (book)=>{
        cy.visit('http://127.0.0.1:8000/book/add');
        cy.get('#title').type(book.titre);
        cy.get('#author').type(book.auteur);
        cy.get('#description').type(book.description);
        cy.get('#publish_at').type(book.datePublication);
        cy.get('#cover').selectFile(book.couverture);
        cy.get('#categories').select(Math.floor(Math.random(6*10)));
        cy.get('button[type="submit"]').click();
    }

    const giveUserInfo = (user)=>{
        cy.get('#firstname').type(user.firstname);
        cy.get('#lastname').type(user.lastname);
        cy.get('#email').type(user.email);
        cy.get('#password').type(user.birthDate);
        cy.get('#confirm-password').type(user.birthDate);
        cy.get('button[type="submit"]').click();
    }

    it('doit remplir le formulaire avec un utilisateur valide depuis la fixture', function () {
        cy.visit('http://127.0.0.1:8000/register');
        const user = cy.userData.validUser;
        const user1 = cy.userData.validUser1;

        cy.get('#firstname').type(user.firstname);
        cy.get('#lastname').type(user.lastname);
        cy.get('#email').type(user.email);
        cy.get('#password').type(user.birthDate);
        cy.get('#confirm-password').type(user.birthDate);
        cy.get('button[type="submit"]').click();

        // Vérification du feedback DaisyUI
    });

    it('Obtiens un message d\'erreur quand tous les champs ne sont pas remplis', function () {
        cy.visit('http://127.0.0.1:8000/register');
        const user = cy.userData.validUser;
        const user1 = cy.userData.validUser1;
        cy.get('button[type="submit"]').click();
        cy.get('small').eq(0).should("have.text", "Le prenom est obligatoire");
        cy.get('small').eq(1).should("have.text", "Le nom est obligatoire");
        cy.get('small').eq(2).should("have.text", "L'email est obligatoire");
        cy.get('small').eq(3).should("have.text", "Le mot de passe est obligatoire");
        cy.get('small').eq(4).should("have.text", "La confirmation est obligatoire");
    });
    it('L\'utilisateur-ice est capable de se connecter', function () {
        const user = cy.userData.validUser;
        const user1 = cy.userData.validUser1;
        login(user);
    });

    it('L\'utilisateur-ice est capable d\'ajouter un livre', function () {
        const user = cy.userData.validUser;
        const user1 = cy.userData.validUser1;
        login(user);

        addBook(book);
        
    });
    it('L\'utilisateur-ice est capable de se connecter et de changer ses informations', function () {
        const user = cy.userData.validUser;
        const user1 = cy.userData.validUser1;
        login(user);

        giveUserInfo(user1);
    });

    it("l'utilisateur peut se déconnecter de son compte",()=>{
        const user = cy.userData.validUser;
        const user1 = cy.userData.validUser1;
        login(user);
        cy.get("a:has(href=/logout)").click();
        cy.visit('http://127.0.0.1:8000/profil');
        cy.url().should('be.equal','http://127.0.0.1:8000/login');
    })

});