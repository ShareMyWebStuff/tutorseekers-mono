
async function auth(){
    const response =await fetch('http://127.0.0.1:3000/request',{method:'post'});
  
    const data = await response.json();
    console.log(data);
    navigate(data.url);
  
  }


<button className="btn-auth"  type="button" onClick={()=> auth()}>
            <img className="btn-auth-img" src={googleButton} alt='google sign in'/>
            </button>
    </>