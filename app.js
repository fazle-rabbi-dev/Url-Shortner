/*
[*] Author: Fazle Rabbi
[*] Date: 7 November,2022
[*] Hey geek, You don't become a coder by changing credits.
[*] WARNING: This script is only for educational purpose, If you do any crime using this script then i will not responsible. Keep in mind!
*/
const axios = require('axios');
const prompt = require('prompt-sync')();
// This api_key key invalid!
const api_key = 'dc5bdf2a95225d77f72a0543a4702d79'
const URL = `https://cutt.ly/api/api.php?`;

// Colors:
const colors = {
   white: '\033[0m',
   red: '\033[91m',
   green: '\033[92m',
   yellow: '\033[93m',
   blue: '\033[94m',
   cyan: '\033[96m',
};
const {white,red,green,yellow,cyan} = colors;


// Banner:
function banner(){
   console.log(`
${cyan}

╭╮╱╭╮╱╭╮╱╱╭━━━┳╮╱╱╱╱╱╱╭╮
┃┃╱┃┃╱┃┃╱╱┃╭━╮┃┃╱╱╱╱╱╭╯╰╮
┃┃╱┃┣━┫┃╱╱┃╰━━┫╰━┳━━┳┻╮╭╋━╮╭━━┳━╮
┃┃╱┃┃╭┫┣━━╋━━╮┃╭╮┃╭╮┃╭┫┃┃╭╮┫┃━┫╭╯
┃╰━╯┃┃┃╰┳━┫╰━╯┃┃┃┃╰╯┃┃┃╰┫┃┃┃┃━┫┃
╰━━━┻╯╰━╯╱╰━━━┻╯╰┻━━┻╯╰━┻╯╰┻━━┻╯
  ${white}`);
}

let my_url = null;
let custom_name = null;

function shortUrl(api){
   my_url = prompt(green+"[*] Enter a valid url:"+white) 
   if(!my_url){
      // console.log(red+"[*] Invalid Url!"+white);
      // shortUrl()
      return;
   }
   let should_custom_name = prompt(cyan+"[*] Do you want to custom alias y/n:") 
   if(should_custom_name == 'y'){
      custom_name = prompt("[*] Enter your custom alias:") 
      // console.log(custom_name);
      axios.get(URL+`key=${api}`+`&short=${my_url}&name=${custom_name}`)
      .then(res=>{
         const {fullLink,shortLink,title,date} = res.data.url;
         if(!fullLink){
            console.log(red+'[*] The custom alias already taken by other');
            shortUrl();
            return;
         }
console.log(`
${green}[*]${white} Full Url:${yellow}${fullLink}
${green}[*]${white} Short Url:${yellow}${shortLink}
${green}[*]${white} Date:${yellow}${date}
${green}[*]${white} Title:${yellow}${title}
`);
      })
      .catch(err=>{
         console.log(red+'[*] Oops! Something went wrong!');
      });
   }else{
      axios.get(URL+`key=${api}`+`&short=${my_url}`)
      .then(res=>{
         // console.log(res.data);
         const {fullLink,shortLink,title,date} = res.data.url;
console.log(`
${green}[*]${white} Full Url:${yellow}${fullLink}
${green}[*]${white} Short Url:${yellow}${shortLink}
${green}[*]${white} Date:${yellow}${date}
${green}[*]${white} Title:${yellow}${title}
`);
      })
      .catch(err=>{
         // console.log(err);
         console.log(red+'[*] Oops! Something went wrong!');
      });
   }
}

banner();
const api = prompt(green+"[*] Enter your cutt.ly api_key:"+white)
if(api && api.length == api_key.length){
   shortUrl(api);
}
// else if(!api){
//    return console.log(red+'Quiting...');
// }
else{
   console.log(red+'Api key must required!');
   console.log('Quiting...'+white);
}
