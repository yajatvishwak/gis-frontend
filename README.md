# Gift Inventory system - Frontend 🎉

Written in vue and with lot of love and shawarmas.

Gift Inventory System or GIS in short is the system that governs the inventory system of mementos in New Horizon College of Engineering, India.

<br />

### _Hold up, that's a textbook description. Tell me like I am five_

Everytime a Chief Guest visits NHCE, they are given a gift as a token of remembarance, respect and honour. GIS is a system that helps keep record of all gifts and their respective assignment (as in which gift is assigned to a certain guest, for which occassion etc)

## Architecture - How is the project structured

click here to learn about the project flow

## 1. How to install the frontend web app?

After cloning, in the same folder,

`npm install`
<br />
_or you could use Elon musk's favourite package_ installer
<br />
`yarn`
<br />
That should install all the dependencies and now you can proceed to setup

## 2. Setup - DO NOT SKIP THIS

Create a new file called `.env.development` in the root of your project (ie. navigate to that folder where you can see package.json file, and make it there)
<br />
<br />
Copy these contents onto the file
<br />

`VUE_APP_BASE_URL="http://localhost:3000/api" VUE_APP_IMG_LOCATION="http://localhost:3000/api/admin/getfiles/images" VUE_APP_IMG_LOCATION_CLIENT="http://localhost:3000/api/admin/getfiles/images" VUE_APP_BILL_LOCATION="http://localhost:3000/api/admin/getfiles/bills" VUE_APP_PERM_LOCATION="http://localhost:3000/api/admin/getfiles/permission_letters" VUE_APP_PERM_LOCATION_CLIENT="http://localhost:3000/api/client/getfiles/permission_letters" VUE_APP_REPORT="http://localhost:3000/api/admin/getfiles/reports"`

## Starting the server

`npm run serve`
<br>

This will start the development server

Now head on over to your favourite web browser and visit this url `http://localhost:8080/#/`

If you get rick rolled, you nailed every step and you are good to go. 🍾🍾

## File Structure

Click here to find out

## Contributing to this project
