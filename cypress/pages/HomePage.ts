export default class HomePage {
//selectors

    navbar = {
        logo: () => cy.get('[data-cy="logo"]'),
        langSelect: () => cy.get('[data-cy="lang-select"]'),
        loginBtn: () => cy.get('[data-cy="login"]'),
        signUpBtn: () => cy.get('[data-cy="sign-up"]'),
    }
    mainElements = {
        totalUsersBar: () => cy.get('[data-cy="total-users"]'),
        publicPostsArr: () => cy.get('[data-cy="publicPosts"]'),
    }

//methods
    open = (): void => {
        cy.visit('/')
    }

    //incorrect

    verifyMemoizedPosts() {
        this.mainElements.publicPostsArr().children().then(($posts) => {
            const memoizedProps: HTMLElement[] = $posts.toArray() as HTMLElement[];
            // Check if postsArray is an array and log its length
            console.log(Array.isArray(memoizedProps)); // Should return true
            console.log(memoizedProps.length); // Log the number of posts

            // Iterate over the posts using forEach
            memoizedProps.forEach((post) => {
                console.log(post); // Log each individual post element

                // Check for the presence of posts
                this.mainElements.publicPostsArr()
                    .children() // replace with the actual selector for posts
                    .should('exist')
                    .and('have.length.greaterThan', 0); // Ensure there is at least one post

            });
        })
    }
}



//RECIPES

// describe('Inctagram Home Page', () => {
//     it('should verify that posts exist', () => {
//         // Visit the Inctagram home page
//         cy.visit('https://samuraichiki.org/en');
//
//         // Check for the presence of posts
//         // Adjust the selector based on the actual HTML structure of the posts
//         cy.get('.post-selector') // replace with the actual selector for the posts
//             .should('exist')
//             .and('have.length.greaterThan', 0); // Ensure there is at least one post
//     });
// });
// verifyMemoizedPosts(): void {
//     this.mainElements.publicPostsArr().children().then(($posts) => {
//         // Iterate over the posts using Cypress's each method
//         cy.wrap($posts).each((post, index) => {
//             const postElement = post as HTMLElement; // Cast to HTMLElement for type safety

            // // Access properties for testing
            // const postContent = postElement.innerHTML; // Get the inner HTML of the post
            // const postText = postElement.textContent || ''; // Get the text content of the post
            // const postId = postElement.getAttribute('data-id'); // Example of getting a custom attribute
    //
    //         // Log the properties for debugging
    //         cy.log(`Post ${index + 1}:`, {
    //             content: postContent,
    //             text: postText,
    //             id: postId,
    //         });
    //
    //         // Example assertions using Cypress commands
    //         expect(postContent).to.not.be.empty; // Ensure the post has content
    //         expect(postText).to.not.be.empty; // Ensure the post has text
    //
    //         // You can add more assertions as needed
    //         if (postId) {
    //             expect(postId).to.match(/^\d+$/); // Example: Ensure postId is a number
    //         }
    //     });
    // });
// }
