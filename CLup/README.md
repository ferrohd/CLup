# Installation Guide


## NodeJS Installation

Download and Install NodeJS runtime from here: [NodeJS Download](https://nodejs.org/en/)


>**IMPORTANT**
>
>During the installation make sure to have both "npm package manager" and "Add to PATH" features selected.
>
>![Installer screenshot](assets/installer_screen.png)


## Install Dependencies
1. Clone the Repo
2. Move inside CLup folder
3. Open a Shell/Command Promt there
4. Run `npm install`

If any error occurs make sure to have Administration/root Privileges on the Shell.

## Run the Server
1. Move inside the CLup folder
2. Open a Shell/Command Promt there
3. Run `npmm run start`
   
## Smartphone Setup
>**IMPORTANT**
> 
> This application requires camera access to work properly (The Store Manager has to scans tickets). Due to security costraints all navigation browsers (Chrome, Firefox, Safari) don't allow the web page to access the device features (like the camera) when the connection is not secure (HTTP instead of HTTPS).
>
>The only solution is avaiable on Chrome and consists of adding the webserver's IP to the trusted lists.

1. Open Chrome on the smartphone
2. Go to: `chrome://flags` ![Installer screenshot](assets/chrome_screen_1.png)
3. Search for: `Insecure origins treated as secure`
4. Insert in the text box `http://IP OF THE MACHINE YOURE RUNNING NODE:3000` ![Installer screenshot](assets/chrome_disable.jpg)
5. Click on the button `Disabled` and Enable it ![Installer screenshot](assets/chrome_enable.jpg)
6. Reload Chrome as suggested. ![Installer screenshot](assets/reload_chrome.jpg)


## Enjoy CLupper
Now you can go to `http://IP OF THE MACHINE YOURE RUNNING NODE:3000` and use CLup!