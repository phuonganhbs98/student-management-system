export default function AuthHeader(){
    const user = JSON.parse(localStorage.getItem('user'));

    if(user && user.accessToken){
        console.log("Access Token: " + user.accessToken);
        return {'x-access-token': user.accessToken};
    }else{
        return {};
    }
}