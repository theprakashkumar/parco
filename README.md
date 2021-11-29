Bug(s):

-   On every route home icon in active in navbar.

-   When the setting page loads for the first time, it makes request to Cloudnary without an image.

-   After refreshing the Explore page then click on the profile to go the user page we get error.

Improvement(s);

-   Rename all "image" to "photo".

-   Refactor other component which uses `useImage` so that we don't need to have conditional in the the hook.

-   Add a custom hook to handle all the inputs.
