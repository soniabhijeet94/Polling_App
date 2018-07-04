***************************************** POLLING APP *************************************************

#AUTHOR: Abhijeet Soni (soniabhijeet94@yahoo.com)

#DESCRIPTION: It's a simple responsive Polling App based on NodeJS + ExpressJS frameworks using ES6. The 
input table takes three values for every tuple, namely:-
 -ID: It should be of 4 digits.
 -VALUE: It should be of 6 digits.
 -Poll (Opinion): Either choose FOR or AGAINST as per the opinion.

 Any number of rows can be added/deleted (at least one row should be present). Other functionalities 
 includes RESET button, which will show the output table, segregated based on the POLLs, & CANCEL button, 
 which would erase all the data of input table & make it the default one.

 Finally, after pressing the SUBMIT button, it groups the tuples based on their POLL. FOR records would 
 go under FOR table, AGAINST in AGAINST table & the ones having the same IDs but different POLLs would
 go under CLOSED table.

#REQUIREMENTS: Please make sure to install NodeJS on system prior to launch.
 -Then, go to parent directory, open CMD & send 'npm install'. This would actually install all the 
 required dependencies of the app, which are mentioned in the package.json file. Only two dependencies 
 are here, namely: 'express' & 'path'. Once done, app is ready to be LAUNCHED.

#LAUNCHING: This app is based on NodeJS, which is using Express as a backend server. After going into 
the parent directory, open CMD & send 'node app.js'. It would push the required html, css & js files to 
client. The web page would be hosted on 'localhost:3000'.
